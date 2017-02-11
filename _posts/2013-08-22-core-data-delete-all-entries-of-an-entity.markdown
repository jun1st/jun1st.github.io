---
layout: single
title: "Core Data:Delete All Entries of An Entity"
description: 如何删除Core Data中整张表的数据，笨办法了
date: 2013-08-22 22:43
comments: true
categories: ios
---
Core Data还是有很多地方不够便利，比如删除有个Entity所有的记录，还是需要一条一条删除

```objective-c
NSFetchRequest * allPhoneNumbers = [[NSFetchRequest alloc] init];
[allPhoneNumbers setEntity:[NSEntityDescription entityForName:@"PhoneNumber" 	inManagedObjectContext:self.objectContext]];
[allPhoneNumbers setIncludesPropertyValues:NO]; //only fetch the managedObjectID

NSError * error = nil;
NSArray * phoneNumbers = [self.objectContext executeFetchRequest:allPhoneNumbers error:&error];

//error handling goes here
for (NSManagedObject * phoneNumber in phoneNumbers) {
    [self.objectContext deleteObject:phoneNumber];
}
NSError *saveError = nil;
[self.objectContext save:&saveError];
```

虽然很简单，但是比较繁琐，sigh！
