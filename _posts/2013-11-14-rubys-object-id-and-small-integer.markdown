---
layout: single
title: "Ruby的object_id和小整数"
description: "ruby的object_id和fixnum之间的关系的特殊性，解释了为什么Fixnum的值和它的object_id之间的关系是id = value * 2 + 1"
keywords: "ruby, object_id, Fixnum"
date: 2013-11-14 18:23
comments: true
categories: ruby
---

在做Koan的[Learn Ruby](!http://rubykoans.com)的时候，碰到一个挺有意思的练习，

```ruby
def test_small_integers_have_fixed_ids
  assert_equal 1, 0.object_id
  assert_equal 3, 1.object_id
  assert_equal 5, 2.object_id
  assert_equal 201, 100.object_id

  # THINK ABOUT IT:
  # What pattern do the object IDs for small integers follow?
end
```

根据这增长的逻辑，可以猜测出来这个<code>object_id = value * 2 + 1</code>, 但是猜测是不可靠的，还是了解其为什么是这样的才行。

显示在stackoverflow上看到这个[这篇文章](http://stackoverflow.com/questions/3430280/ruby-how-does-object-id-assignment-work),

>in MRI the object_id of an object is the same as the VALUE that represents the object on the C level. For most kinds of objects this VALUE is a pointer to a location in memory where the actual object data is stored. Obviously this will be different during multiple runs because it only depends on where the system decided to allocate the memory, not on any property of the object itself.


>However for performance reasons true, false, nil and Fixnums are handled specially. For these objects there isn't actually a struct with the object's data in memory. All of the object's data is encoded in the VALUE itself. As you already figured out the values for false, true, nil and any Fixnum i, are 0, 2, 4 and i*2+1 respectively.

>The reason that this works is that on any systems that MRI runs on, 0, 2, 4 and i*2+1 are never valid addresses for an object on the heap, so there's no overlap with pointers to object data.

这个可以算是“然”，继续搜索“所以然”


然后就搜索到了这篇文章，[The Ruby VALUE](http://www.oreillynet.com/ruby/blog/2006/01/the_ruby_value_1.html). VALUE 就相当于C当中的指针，他的值等于对象在内存中的地址，但是对于<code>true, false, nil 和 Fixnum</code>, 出于性能的考虑用的是不同的算法。

内存地址是以4 bytes为单位的（64位机器上8 bytes ）,因此，如果当前地址是0x0000F000, 那下一个地址就是0x0000F004, 二进制表示低八位就是00000000和00000100,最低的两位永远会是__0__

Ruby利用了这个特性，它保留了最低的1位，然后用剩下的31位(63位)存储Fixnum, 其中一位作为符号位，在我的机器上

```ruby
irb(main):001:0> (2 ** 62).class
=> Bignum
irb(main):002:0> (2 ** 62 - 1).class
=> Fixnum
```

这下可以解释为什么<code>object_id = value * 2 + 1</code>了。 以5为例，5的object_id是11， 它的二进制表示是<code>0x0101</code>(仅表示最低的四个bits)， 由于ruby保留了最低的一位，因此它对应的VALUE值是<code>0x01011</code>(省略了前面的一堆0)， 0x01011就是11。

知道它是为什么，感觉特别好。
