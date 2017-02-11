---
layout: single
title:  Core Data中如何取得聚合值
date: 2014-05-29 23:27:46 +0800
comments: true
categories: iOS
---

Core Data是现在iOS中主流的数据存储选择。虽然Core Data的学习对于Mac/iOS开发新手来说，算是学习曲线比较陡的，但是一旦熬过了，使用还是很便利的。

各种介绍文章都会介绍如何设置NSPredicate, 如何设置NSSortDescriptor, 返回NSManagedObject对象。那么如何获得某个属性的最小值，最大值？

对于刚学习Core Data的人想到的第一方法很可能就是设置fetchLimit为1， 然后根据要获取的那个属性进行排序。这也是一种方法，也能完成任务；但是如果要获取这个属性的Sum值呢？

### NSExpression

Core Data中有NSExpression来完成Aggregate操作。

首选需要设置你的目标属性, 比如salary

<code>NSExpression *keyPathExpression = [NSExpression expressionForKeyPath:@"salary”];</code>

然后设置想要的聚合操作
```objective-c
NSExpression *maxSalaryExpression = [NSExpression expressionForFunction:@"max:"
                                                  arguments:@[keyPathExpression]];
```

再设置NSExpressionDescription
```objective-c
NSExpressionDescription *expressionDescription = [[NSExpressionDescription alloc] init];
[expressionDescription setName:@"maxSalary"];
[expressionDescription setExpression:maxSalaryExpression];
[expressionDescription setExpressionResultType:NSDecimalAttributeType];
```
Objective-c就是以他的verbose闻名的。

```objective-c
[request setResultType:NSDictionaryResultType];
[request setPropertiesToFetch:[NSArray arrayWithObject:expressionDescription]];
```
设置request的返回类型是一个Dictionary，这个Dictionary的key就是这个expressionDescription的name， value就是expression的执行结果。

最后再调用executeFetchRequest

```objective-c
NSArray *results = [objectContext executeFetchRequest:request error:&error];
if (!results || [results count] == 0) {
    return NSIntegerMax;
}

NSNumber *maxSalary = (NSNumber *)[[results lastObject] valueForKey:@"maxSalary"];
```

对于如何执行Sum操作，基本一样。

So，试试NSExpression，别再使用<code>fetchLimit=1</code> 了。
