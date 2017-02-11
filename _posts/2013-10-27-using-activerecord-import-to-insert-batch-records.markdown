---
layout: single
title: 用ActiveRecord.Import插入批量数据
description: 用ActiveRecord.Import这个Gem批量导入数据，并且和使用Save，Create等方式做了性能对比，ActiveRecord.Import 性能优越
date: 2013-10-27 22:42
comments: true
categories: rails
---
Rails的ActiveRecord很方便，但是没有提供批量插入的方法，虽可以把<code>.save</code>和<code>.create</code>放在一个<code>loop</code>里循环调用，但是性能可不怎么样；

__调用Save__

```ruby
n = 5000
res = Benchmark.measure do
        n.times do
          City.create(:name => 'shanghai', :description => 'shanghai is good', :index_url => 'http://www.yahoo.com')
        end
      end

puts res

3.110000   0.400000   3.510000 (5.405846)
```

__调用Create__

```ruby
n = 5000
cities = Array.new
n.times do
  cities << { :name => 'shanghai', :description => 'shanghai is good', :index_url => 'http://www.yahoo.com' }
end

res2 = Benchmark.measure do
        City.create(cities)
       end
puts res2

3.020000   0.400000   3.420000 (5.235601)
```

__用ActiveRecord.import批量导入__

```ruby
n = 5000
new_cities = Array.new
n.times do
  new_cities << City.new(:name => 'shanghai', :description => 'shanghai is good', :index_url => 'http://www.google.com')
end

res3 = Benchmark.measure do
        City.import new_cities
       end

puts res3

0.880000   0.010000   0.890000 (1.171724)
```

__结果比较__

这Performance的差距大得可不是一点点啊，

	3.110000   0.400000   3.510000 (5.405846) #save
	3.020000   0.400000   3.420000 (5.235601) #create
	0.880000   0.010000   0.890000 (1.171724) #import

循环调用Save和Create结果差不多，<code>import</code>的性能可提升了3倍。

[gem activerecord-import](https://github.com/zdennis/activerecord-import)
