---
layout: single
title: Ruby新手常犯的错误
date: 2015-10-05 21:00:00 +0800
keywords: ruby, string, interpolation, 插值
description: 不用字符串插值, true and false, And Not Or, Duck Type
categories: ruby
comments: true
draft: false
---

###不用字符串插值

拼字符串

```
puts "error description" + e.cause.to_s + "happend on: " + Time.now.to_s
```

不用字符串插值

```
puts "error description #{e.cause} happened on: #{Time.now}"
```

后者不仅更加易读，而且可以避免因为忘记调用`to_s`而导致的`TypeError`


### true and false

在Ruby中，只有`false` 和 `nil`在条件语句中被判定为`false`.

```
if an_instance != nil && an_instance.method? == true
	#do something
end
```

应该被改写为

```
if an_instance && an_instance.method?
	#do something
end
```


### And Not Or

Ruby中引入的`not, and, or` 看上去跟逻辑操作符 `!, &&, ||` 一样， 当时其实后者的优先级更高

```
puts "hello" && "world"     => world
puts "hello" and "world"    => hello
```

有时候这个问题带来的bug会比较烦人

```
arr = [1,2,3]
!arr[0].is_a?(String) && arr.length > 3
 => false
not arr[0].is_a?(String) && arr.length > 3
 => true
```

因为`not`的优先级比较低


### Duck Type

对于从类似Java， C#这类静态编译语言过来的开发者来说，他们写的ruby代码可能是这样的

```
def method(arg)
	if arg.is_a? MyClass
		if arg.respond_to? :my_method
			arg.my_mthod
		else
			#blablabla
		end
	end
end
```

这个代码太啰嗦了，

```
def m(arg)
	arg.me_method
rescue => e
	#handle exception
end
```

### 过滤筛选List

例如： 把一个List中所有的偶数选出来并乘以3， 并且结果小于20的

Ruby新手可能会这么写，

```
arr =[1,2,3,4,5,6,7,8,9,10]

new_arr = []
arr.each do |x|
  if x % 2 == 0
    new_arr << x * 3 if x * 3 < 20
  end
end
```

但是其实可以这么写

```
arr.select {|x| x % 2 == 0 }.map{|x| x * 3}.reject(|x| x >= 20 }
```

Ruby的block用起来有点像函数式编程，一个函数的执行结果是下一个函数的输入。





