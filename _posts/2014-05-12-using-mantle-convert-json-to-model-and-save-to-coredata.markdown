---
layout: single
title:  用Mantle转JSON数据到ManagedObject
date: 2014-05-12 22:40:24 +0800
comments: true
categories: iOS
---

Mantle, 来自github的一个十分便利的model层框架，它能把数据从JSON转成Objective-c对象，也可能把一个MTLModel对象转成JSON数据。

Mantle的[官方说明](https://github.com/Mantle/Mantle)中,   在基本的情况下，只需要实现一个mapping方法，就能轻松的实现数据的转换

```objective-c
 + (NSDictionary *)JSONKeyPathsByPropertyKey {
     return @{
         @"URL": @"url",
         @"HTMLURL": @"html_url",
         @"reporterLogin": @"user.login",
         @"assignee": @"assignee",
         @"updatedAt": @"updated_at"
     };
 }

//转换为NSURL类型
 + (NSValueTransformer *)URLJSONTransformer {
     return [NSValueTransformer valueTransformerForName:MTLURLValueTransformerName];
 }

 + (NSValueTransformer *)HTMLURLJSONTransformer {
     return [NSValueTransformer  valueTransformerForName:MTLURLValueTransformerName];
 }

```

然后用<code>+[MTLJSONAdapter modelOfClass:fromJSONDictionary:error:]</code>就能解析JSON数据，得到Objective-C对象了。

不过这不是写这篇文章的目的，这篇文章的重点是如何再把这个对象存到Core Data中。

对于持久化，Mantle的官方文档紧紧提到：

>Mantle doesn't automatically persist your objects for you. However, MTLModel does conform to <NSCoding>, so model objects can be archived to disk using NSKeyedArchiver.
If you need something more powerful, or want to avoid keeping your whole model in memory at once, Core Data may be a better choice.

只说了要想实现Core Data比NSCoding更好用，没说怎么用；但是其实Mantle已经支持把从JSON反序列化得到的对象存到Core Data里了。

实现<code>+ (NSDictionary *)managedObjectKeysByPropertyKey
</code>和<code>+ (NSString *)managedObjectEntityName
</code>方法，前者负责从对象到数据库字段的mapping，后者说明Core Data中Entity对象的名字

```objective-c
 + (NSDictionary *)managedObjectKeysByPropertyKey {
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

    [dictionary setObject:@"name" forKey:@"name"];
    [dictionary setObject:@"address" forKey:@"address"];
    [dictionary setObject:@"days" forKey:@"daysOfWeek"];

    [dictionary setObject:@"startDate" forKey:@"startDate"];
    [dictionary setObject:@"endDate" forKey:@"endDate"];
    [dictionary setObject:@"location" forKey:@"location"];

    // ignore these two properties
    [dictionary setObject:[NSNull null] forKey:@"hoursOfOperation"];
    [dictionary setObject:[NSNull null] forKey:@"datesOfOperation"];

    return dictionary;
}
 + (NSString *)managedObjectEntityName {
    return @“NNStore”;
}

```
然后再先从JSON转到Model对象，再存到core data中

```objective-c
NSArray *markets = [json valueForKeyPath:@“stores”];
[markets enumerateObjectsUsingBlock:^(NSDictionary *obj, NSUInteger idx, BOOL *stop) {
    MFMarketModel *market = [MTLJSONAdapter modelOfClass:[MFMarketModel class]
                                      fromJSONDictionary:obj
                                                   error:NULL];
    NSManagedObject *managedMarket = [MTLManagedObjectAdapter managedObjectFromModel:market
                                                                insertingIntoContext:self.managedObjectContext
                                                                               error:NULL];
}];

[self.managedObjectContext save:nil];
```

Mantle还支持unique检查，实现<code>+ (NSSet *)propertyKeysForManagedObjectUniquing</code>就可以做到唯一性检查，非常简单。

如果你还没有用过，那就赶紧试试吧。


