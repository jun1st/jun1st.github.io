---
layout: single
title: "Notice For Ajax Request In Rails"
date: 2013-09-05 11:00
comments: true
categories: rails
---

当一个Rails的Form以Remote的方式提交时，自带的Flash Notice通知方式就不在有效了。现在的Web开发越来越重视客户端，Ajax请求越来越多，因此需要有一个统一的方式来显示异步操作的通知。

__把通知消息用JSON返回?__

可以，但是不可行；有的更新操作不需要返回任何数据。在正常返回json数据的时候，如何把这个通知消息插入到结果中，怎么插入等等，变数太多，不同意。

__利用ResponseHeader__

利用Rails的<code>after_filter</code>把通知消息放到ResponseHeader中.

```ruby Insert Notice Message to Response Header
after_filter :flash_to_headers

def flash_to_headers
	return unless request.xhr?
    if !flash[:notice].blank? or !flash[:error].blank?
      response.headers['X-Flash-Message'] = flash[:notice] || flash[:error]
    end
    response.headers['X-Flash-Type'] = flash[:type] unless flash[:type].blank?
    # repeat for other flash types...

    flash.discard  # don't want the flash to appear when you reload page
end
```

设置Flash-Type和Message

```ruby
flash[:type] = 'success'
flash[:notice] = '密码修改成功'
```

设置全局AjaxComplete响应

```javascript
$( document ).ajaxComplete(function( event, xhr, settings ) {
	if (xhr.status < 200 || xhr.status >= 300) return;
	var message = xhr.getResponseHeader("X-Flash-Message")
	if($('div#flash') != null && message ){
		var type = xhr.getResponseHeader("X-Flash-Type")
		$('div#flash').addClass("alert-" + type).html(message).show().fadeOut(3000, function()
		{
			$('div#flash').removeClass('alert-' + type)
		})
	}
});
```

这样在异步请求下通知的显示方式就又统一了。 可以把<code>after_filter</code>加入到<code>application_controller</code>中，然后只需要在<code>response_to</code>中设置消息的内容和类型。

