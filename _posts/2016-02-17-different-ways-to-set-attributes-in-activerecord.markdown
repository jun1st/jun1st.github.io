---
layout: single
title:  Rails4 ActiveRecord 不同的赋值方法
date:   2016-02-17 12:10:08 +0800
keywords: Rails4, activerecord, attributes, 赋值
description: Rails4 ActiveRecord 不同的赋值方法，Different Ways to Set Attributes in ActiveRecord
categories: rails
comments: true
draft: false
---


Rails 提供了多种设置Model属性的方法，方法之间又各有异同，有的会出发回调，有的不会，有的会对所属对象其它属性也产生影响。 因此理解方法之间的区别就显得很重要。

### Cheat Sheet

最方便的先来，cheetsheet表，方便查询：

<table class="table-compact table table-striped">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Uses Default Accessor</th>
                    <th>Saved to Database</th>
                    <th>Validations</th>
                    <th>Callbacks</th>
                    <th>Touches <code>updated_at</code></th>
                    <th>Readonly check</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/attribute%3D" style="text-decoration: none">attribute=</a></td>
                    <td>Yes</td>
                    <td>No</td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/write_attribute" style="text-decoration: none">write_attribute</a></td>
                    <td>No</td>
                    <td>No</td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/Persistence/update_attribute" style="text-decoration: none">update_attribute</a></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/AttributeAssignment/attributes%3D" style="text-decoration: none">attributes=</a></td>
                    <td>Yes</td>
                    <td>No</td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                    <td><span style="color: #c0c0c0;">n/a</span></td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/Persistence/update" style="text-decoration: none">update</a></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/Persistence/update_column" style="text-decoration: none">update_column</a></td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/Persistence/update_columns" style="text-decoration: none">update_columns</a></td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/ActiveRecord/Relation/update" style="text-decoration: none">User::update</a></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><a href="http://apidock.com/rails/v4.0.2/ActiveRecord/Relation/update_all" style="text-decoration: none">User::update_all</a></td>
                    <td>No</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>




### user.name =

这是最常用的赋值方法，这个也是Rails默认生成的赋值方法。赋值后，对应的属性会被标记为dirty, 脏数据，但是并没有更新到数据里去。


调用`save`会把数据更新到数据库。调用`reload`会丢弃脏数据。


### user.write_attribute(:name, 'feng')

这是上面那个赋值方法会调用的方法， 这个方法也不会更新数据库。


### user.update_attribute(:name, 'feng')

这个方法会直接更新数据到数据库，而且会忽略到所有的验证，直接更新数据库。

* 所有更新会直接到数据库
* 所有的验证会被跳过


### user.attributes = { name: 'feng' }

这个赋值方法会根据右边传入的哈希，对相应的属性进行赋值。其它的属性不会有变动。

`user.assign_attributes { name: 'feng' }`


### user.update(name: 'feng')

在Rails 3中，这个方法叫`update_attributes`， 这个方法会更新对象，进行验证，然后更新到数据库.这方法会把所属对象中别的脏数据也更新到数据库。

### user.update_columns(name: 'feng')

这个方法会生成 SQL Update，直接更新到数据库，跳过所有的数据验证和回调。

### user.update_column(:name, 'feng')

跟上面的方法类似

### User.update(1, name: 'feng')

__这是一个类方法__

这个方法的第一个参数是 `id`, 后面是更新的属性hash。 第一个参数，可以是一个数组， 一组 `id`。

### User.update_all(name: 'feng')

批量更新，__be careful！__


