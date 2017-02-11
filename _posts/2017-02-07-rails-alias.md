---
layout: single
title: Ruby on Rails 中的 alias, alias_method 和 alias_attribute
author: fengd
summary: 如何正确使用各种Rails中的alias
tags: ruby rails alias
date: 2017-02-06T16:45:24+08:00
header:
  image: /assets/images/default-header.jpg
---

### alias 和 alias_method

先来看看怎么用的

```ruby
alias new_name old_name
alias :new_name :old_name
```

```ruby
alias_method :new_name, :old_name
```

alias 是 ruby 中的关键字，后面跟的可以是 symbol 或者 bareword, 而 alias_method 是一个方法，后面是两个参数，所以中间需要由逗号分隔。 除了使用上的不同，还有什么区别呢？ alias 是个关键字，作用域是词法级别的(lexical scoped)。 举个例子：

```ruby
  class User
    def full_name
      puts "Johnnie Walker"
    end

    def self.add_rename
      alias :name :full_name
    end
  end

  class Developer < User
    def full_name
      puts "Geeky geek"
    end
    add_rename
  end

  Developer.new.name #=> 'Johnnie Walker'
```

而 alias_method 是个方法，`self` 是运行时决定的。

```ruby
  def self.add_rename
    alias_method :name, :full_name
  end

  Developer.new.name #=> 'Gekky geek'
```

### alias_attribute

假设你有一个 Post 类， 然后想给 `title` 起个别名，叫做 `subject`

```ruby
  class Post < ActiveRecord::Base
    alias_method :subject, :title
  end
```

但是，这是会报错的，

```ruby
  Post.new # => NameError: undefined method `title` for class `Post`
```

换做使用 `alias` 也一样会报错

原因是，rails 中 model 的这些访问器(accessor)是通过 `method_missing` 机制动态创建的，所以这些方法在代码解析是不存在。 因此 rails 提供了一个 `alias_attribute` 方法。

```ruby
  class Post < ActiveRecord::Base
    alias_attribute :subject, :title
  end
```

alias_attribute 的不同之处在于，它还同时提供一个 setter 方法。 也就是说可以通过 `subject = 'new value'` 赋值，而且改变的事 `title` 同一个值.




