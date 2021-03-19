---
title: 'Common Getter Setter Mistakes In Java'
date: '2021-03-19'
spoiler:  Java 中写 Getter/Setter 容易犯的几个错误
---

##  Getter/Setter  

在 Java 中，Getter/Setter 是最常用的两个用来获取和更新一个 Class 内部状态的方法。 有了 Getter/Setter 就可以在一定程度上限制调用方。 比如：

```java
public void setNumber(int num) {
    if (num < 10 || num > 100) {
        throw new IllegalArgumentException();
    }
    this.number = num;
}
```

但是，如果无脑写了 Getter/Setter 就会带来很多隐藏问题。


## 给 Public 的变量写 Getter/Setter

比如：

```java

public String firstName;

public void setFirstname(String fname) {
    this.firstName = fname;
}

public String getFirstName() {
    return this.firstName;
}

```
这两个方法毫无意义

## 在 Setter 中直接传递引用

如果在 Setter 中传递一个引用类型，那会带来隐藏的副作用。

 ```java
 private int[] scores;

 public void setScore(int[] src) {
     this.scores = src;
 }
 ```

 这里的问题是，无论 scores 还是外部传递进来的 src 被修改了，都会影响双方。 因为引用指向的是同一份数据。