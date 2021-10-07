---
title: 'Quick Introduction to Spring Cloud Config'
date: '2021-08-02'
spoiler: A quick introduction to Spring Cloud Config, server and client. And how to trigger refresh from change
---

Spring Cloud Config 提供了完整的服务器端和客户端的支持。 通过 Config Server， 就有了一个 Centralize 的地方来管理配置文件。 因为都是 Spring 体系的，因此 Spring Application 能很好的融合在一起。 接下来分别介绍 Server 和 Client。

## Config Server

Spring Cloud Config Server 默认使用 Git 作为存储。  首先需要配置 git 地址

```
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/jun1st/configs
          default-label: main
```

添加 @EnableConfigServer， 把一个 Spring Application 作为 Config Server。

```java
@EnableConfigServer
@SpringBootApplication
public class ConfigServerDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServerDemoApplication.class, args);
	}

}
```

同时要提供一个 PropertySource 文件，比如 `fool-development.properties`

```
"string key": "value"
```

然后启动 Config Server 应用，

```
curl localhost:8080/fool/development

{
    name: "fool",
    profiles: [
        "development"
    ],
    label: null,
    version: "29f5d864fa4407dea3f2788c299f0f8c36c774a5",
    state: null,
    propertySources: [
        {
            name: "https://github.com/jun1st/configs/fool-development.properties",
            source: {
                "string: "key": "value""
            }
        }
    ]
}


```

当使用 Git 作为存储时， Config Server 在启动的时候会 Clone 一份 repository 到本地， 并且使用应用的 Environment 来遍历 PropertySource 文件。

```
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties
```

所以，现在如果访问 `http://localhost:8080/fool-development.properties`, 直接返回 properties 文件，

```
"string: key": "value"
```

这里的 profile 就是 spring.profiles.active 这里的 profile， label 是 git 的分支名字，默认是 master


demo 地址： [https://github.com/jun1st/config-server-demo](https://github.com/jun1st/config-server-demo)

## Config Client

配置文件是个应用程序来用的， 不是当作 Api 来使用了，所以再来建一个 Client 应用来访问 Server Config。

配置好 `application.yml`

```
server:
  port: 9090

spring:
  config:
    import: "optional:configserver:"
  cloud:
    config:
      uri: http://localhost:8080
  application:
    name: smart
```

应用启动的时候，会到看 console 输出这么一行：

```
Located environment: name=smart, profiles=[default], label=null, version=2ed1021521dc646922ad8254edbc9bc6d351c4d9, state=null
```

因为在 config server 上没有找到对应的配置。
