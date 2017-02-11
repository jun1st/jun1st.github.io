---
layout: single
title: Turbolinks-iOS 上路实用手册
tags: iOS
author: fengd
summary: 如何使用 Turbolinks-iOS, 结合 Turbolinks，实现一个 Hybrid iOS App。
tags: [iOS turbolinks]
date: 2016-11-16T16:45:24+08:00
---

### 前提

要用 turbolinks-iOS 来写一个 Hybrid 的 App 的前提是你的网站使用了 [turbolinks](https://github.com/turbolinks/turbolinks)， 如何使用 turbolinks, 请看[这里](https://github.com/turbolinks/turbolinks)

### 安装

通过 Cocoapods 或者 Carthage 安装，都是直接引用了 github 上的地址。

```ruby
github "turbolinks/turbolinks-ios" "3.0"
```

或者

```ruby
pod 'Turbolinks', :git => 'https://github.com/turbolinks/turbolinks-ios.git', branch: 'swift-3.0'
```

turbolinks-iOS 是使用纯 swift 写的，支持 iOS 8.0 以上的版本。如果项目已经使用了 swift 3.0， 需要使用 3.0 的分支。虽然官方官方说 3.0的分支他们没有在生产环境下用过，但是我们用下来没有什么问题。

### 使用

首先建议把 turbolinks-iOS 的代码都下载下来，先跑一下他的demo，demo 虽然很简单，但是基本上把能碰到的情况都写上去了，比如网页请求失败，遇到需要登录的情况等。

#### 创建Session

使用 turbolinks-iOS，最重要的一个概念就是 session， session 控制着网页的前进和返回，也是网页和原生代码之间交互的通道。创建 session, 设置 delegate， 同时设置好 processPool。 如果你有多个 session, 并且想要在多个 session 之间共享 cookies，那就需要创建一个共享的 pool，比如通过 singleton 的方式。

```swift
fileprivate lazy var webViewConfiguration: WKWebViewConfiguration = {
    let configuration = WKWebViewConfiguration()
    configuration.userContentController.add(self, name: "turbolinksDemo")
    configuration.processPool = self.webViewProcessPool
    configuration.applicationNameForUserAgent = "TurbolinksDemo"
    return configuration
}()

fileprivate lazy var session: Session = {
    let session = Session(webViewConfiguration: self.webViewConfiguration)
    session.delegate = self
    return session
}()
```

#### 实现 Delegate

iOS 里适合做前进后退这件事最合适的就是 UINavigationController 了，因此通常会在 navigationController 中新建 session 实例，并把自身作为这个 session 的 delegate。作为 session 的 delegate，必须实现两个方法。


1. `func session(_ session: Session, didProposeVisitToURL URL: URL, withAction action: Action)`, 网页上任何的访问新网页的事件，都会回调这个方法。

```swift
  func session(_ session: Session, didProposeVisitToURL URL: URL, withAction action: Action) {
    let visitable = JDXLVisitableViewController(url: URL)

    if action == .Advance {
      pushViewController(visitable, animated: true)
    } else if action == .Replace {
      if viewControllers.count == 1 {
        var controllers = viewControllers
        controllers[0] = visitable
        setViewControllers(controllers, animated: false)
      } else {
        popViewController(animated: false)
        pushViewController(visitable, animated: false)
      }
    }

    // DO NOT FORGET TO CALL visit
    session.visit(visitable)
  }
```

代码很直观，每次访问一个新的URL时，都根据 action 值来判断是 push 进一个新的 viewcontroller, 还是替换当前的 viewcontroller。 替换也就是 pop 出当前的 controller，push 进新的。

在处理完 viewcontroller 之间的关系之后，还要调用 session.visit(visitable)，通知背后的 WKWebView 访问新的地址。


2. `func session(_ session: Session, didFailRequestForVisitable visitable: Visitable, withError error: NSError)`
这是当请求失败时，处理回调的函数。 比如服务器端返回 401， 可以弹出登陆界面。 网络不好，或者404时，可以显示自定义的错误页面。

```swift
func session(_ session: Session, didFailRequestForVisitable visitable: Visitable, withError error: NSError) {
    NSLog("ERROR: %@", error)

    guard let visitableViewController = visitable as? JDXLVisitableViewController, let errorCode = ErrorCode(rawValue: error.code) else { return }

    switch errorCode {
    case .httpFailure:
      let statusCode = error.userInfo["statusCode"] as! Int
      switch statusCode {
      case 400:
        ....
        //do something
      case 401:
          presentAuthenticationViewController(visitable: visitableViewController)
      case 404:
          visitableViewController.presentError(error: .HTTPNotFoundError)
      default:
          visitableViewController.presentError(error: TurbolinkError(HTTPStatusCode: statusCode))
      }
    case .networkFailure:
      visitableViewController.presentError(error: .NetworkError)
    }
}
```

#### 处理 Form 提交

Turbolinks 默认不接受标准的 HTML Form提交， [原因如下](https://github.com/turbolinks/turbolinks-ios#handling-form-submission):

> By default, Turbolinks for iOS prevents standard HTML form submissions. This is because a form submission often results in redirection to a different URL, which means the Visitable view controller’s URL would change in place.
Instead, we recommend submitting forms with JavaScript using XMLHttpRequest, and using the response to tell Turbolinks where to navigate afterwards. See Redirecting After a Form Submission in the Turbolinks documentation for more details.

官网的这句话就是我 pull request 的，^_^， 就不翻译了。 改用 Ajax 的方式提交 Form,  在返回的结果中， 调用 `Turbolinks.visit(some_url)` 来指向新的页面。

### Turbolinks 和 Turbolinks-iOS 是如何通信的

Turbolinks-iOS 使用的 WKWebView 如何捕获网页上的页面访问事件，比如点击一个 a 标签 ? 通过 WKUserScript。

当 webview 加载的页面 'document ready' 时， Turbolinks-iOS 通过 WKUserScript 加载一个定制的 JS 文件.

```swift
let bundle = Bundle(for: type(of: self))
let source = try! String(contentsOf: bundle.url(forResource: "WebView", withExtension: "js")!, encoding: String.Encoding.utf8)
let userScript = WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
configuration.userContentController.addUserScript(userScript)
configuration.userContentController.add(self, name: "turbolinks")
```

这个JS文件做了什么？ 他把自己作为一个 adapter 绑定到 Turbolinks 上了。

```javascript
function WebView(controller, messageHandler) {
  this.controller = controller
  this.messageHandler = messageHandler
  controller.adapter = this
}

//init
this.webView = new WebView(Turbolinks.controller, webkit.messageHandlers.turbolinks)
```

因为网页是基于Turbolinks，因此网页上有任何"风吹草动"都会通过 controller，传到这个 adapter 上来。比如，访问一个新的地址是:

```coffee
visit: (location, options = {}) ->
  location = Turbolinks.Location.wrap(location)
  if @applicationAllowsVisitingLocation(location)
    if @locationIsVisitable(location)
      action = options.action ? "advance"
      @adapter.visitProposedToLocationWithAction(location, action)
    else
      window.location = location
```

而 adapter 在通过 webkit.messageHandlers 把消息传递给 iOS，比如: <code>visitRequestStarted</code>

```javascript
visitProposedToLocationWithAction: function(location, action) {
  this.postMessage("visitProposed", { location: location.absoluteURL, action: action })
},

postMessage: function(name, data) {
  this.messageHandler.postMessage({ name: name, data: data || {} })
},
```

这个 messageHandler 就是 初始化传进来的 <code>webkit.messageHandlers.turbolinks</code>


iOS 原生代码，再通过 WKScriptMessageHandler 捕获这些事件后,通过 VisitDelegate 和 SessionDelegate，

```swift
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    guard let message = ScriptMessage.parse(message) else { return }
    switch message.name {
    //....some codes....
    case .VisitProposed:
        delegate?.webView(self, didProposeVisitToLocation: message.location!, withAction: message.action!)
    //....some other codes...
    case .ErrorRaised:
        let error = message.data["error"] as? String
        NSLog("JavaScript error: %@", error ?? "<unknown error>")
    }
}
```

session 就是这里的这个delegate，并且在这个delegate的实现方法中

```swift
func webView(_ webView: WebView, didProposeVisitToLocation location: URL, withAction action: Action) {
  delegate?.session(self, didProposeVisitToURL: location, withAction: action)
}
```

这就回到了最初实现的 SessionDelegate 了，就是我们的 UINavigationController

### 视频介绍

这是在2016年的 Rails Conference 上，Turbolinks 和 Turbolinks-iOS 主要贡献者 [Sam Stephenson](https://github.com/sstephenson) 做的一个演讲，值得一看，[Youtube 地址](https://www.youtube.com/watch?v=SWEts0rlezA)。
