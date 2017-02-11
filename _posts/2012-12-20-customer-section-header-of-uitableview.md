---
layout: single
title: "Customer Section Header of UITableview"
description: "use a custom view as your section header"
categories: ios
tags: [uitableview,section,header,ios]
---

UITableView is one of the most used control is iOS Apps, probably the most one. It's well designed, and easy to use, especially when coded together with NSFetchedResultController. But People always want more, and want to create something different, especially geeks.

### need for a custom header ###
what I want is something more than just a "word". I want something like this:

![header-style](http://images.fengqijun.me/2012-12/section-header.png)

Obviously you cannot get this by tweeking you "header string". But actually It's very easy to achieve.(one reason I think apis of UITableView is well designed)

### custom view as header ###
The elegant delegate methods of UITableView delegate make it work.

	-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section

The method indicates you could return a "View" as a head. How to build the new? Nothing would be easier than build your view in Interface Builder and feed the view data before return it.

So create a custom .xib file, named it "CustomHeader".  One thing important here is to **set the view controller hosts the tableview as the file ower**.

Now retrieve you view inside the method.

	EventSectionHeaderView *headerView =
		[[[NSBundle mainBundle] loadNibNamed:@"CustomHeader"
										owner:self
									  options:nil] lastObject];
	headerView.day.text = [NSString stringWithFormat:@"%d", [components day]];

I create a custom class for the view, and set outlets correspondingly, which facilitate setting the proper value for outlets.

Then just return it. It's good to go
