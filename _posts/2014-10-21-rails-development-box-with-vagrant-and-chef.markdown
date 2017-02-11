---
layout: single
title: Vagrant和Chef建Rails开发环境
date: 2014-10-21 23:59:00 +0800
comments: true
categories: rails
---

Host环境: Yosemite, 使用的虚拟机VirtualBox 3.1.16

###SetUp Vagrant

Vagrant会跑一个完整的虚拟机，所以你的机器最好有1，2G的空闲内存。

安装Vagrant和VirtualBox

* [Install Vagrant](http://www.vagrantup.com/downloads.html)
* [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)

再给Vagrant安装两个插件

* vagrant-vbguest: 把host机器上的VirtualBox Guest Additions自动安装到虚拟机上
* vagrant-librarian-chef: 自动跑Chef

{% highlight bash%}
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-librarian-chef
{% endhighlight %}

###添加镜像

由于国内的网速比较慢，所以还是先把ubuntu镜像单独下载下来，再安装！ [vagrantbox](http://www.vagrantbox.es)下载，假设下载到<code>~/downloads/ubuntu-14.box</code>, 在Terminal里输入
```
vagrant box add ubuntu14 ~/downloads/ubuntu14.box
```

'ubuntu14'是给这个box去的名字，后面的是文件的路径

###初始化开发环境

创建一个项目目录，比如<code>~/documents/workspace/rails-vagrant</code>, 进入目录，使用'ubuntu14'这个box
```
vagrant init ubuntu14
vagrant up
```

等待启动完成后，<code> vagrant ssh </code> 登录虚拟机了！

Vagrant建立的只是一台空白的虚拟机，离开发环境还远着。这时就需要Chef了

###Chef

在目录下建立一个文件<code>Cheffile</code>, 然后编辑

```
site "http://community.opscode.com/api/v1"

cookbook 'apt'
cookbook 'build-essential'
cookbook 'mysql', '5.5.3'
cookbook 'ruby_build'
cookbook 'nodejs', git: 'https://github.com/mdxp/nodejs-cookbook'
cookbook 'rbenv', git: 'https://github.com/fnichol/chef-rbenv'
cookbook 'vim'
cookbook 'postgresql', '~> 3.4.10'
```
在虚拟机里装上编译需要的<code>build-essential，ruby</code>，<code>mysql</code>和<code>postgresql</code>两个数据库(按自己需要可以选装)

###编辑Vagrantfile

虚拟机的配置都在Vagrantfile里，

```
# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu-14"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "./codes", "/vagrant_data", :nfs => true

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
      # Don't boot with headless mode
      vb.gui = false
      # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end


  # Enable provisioning with Puppet stand alone.  Puppet manifests
  # are contained in a directory path relative to this Vagrantfile.
  # You will need to create the manifests directory and a manifest in
  # the file default.pp in the manifests_path directory.
  #
  # config.vm.provision "puppet" do |puppet|
  #   puppet.manifests_path = "manifests"
  #   puppet.manifest_file  = "default.pp"
  # end

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  #
  # Use Chef Solo to provision our virtual machine
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks", "site-cookbooks"]

    chef.add_recipe "apt"
    chef.add_recipe "nodejs"
    chef.add_recipe "ruby_build"
    chef.add_recipe "rbenv::user"
    chef.add_recipe "rbenv::vagrant"
    chef.add_recipe "vim"
    chef.add_recipe "mysql::server"
    chef.add_recipe "mysql::client"
    chef.add_recipe "postgresql::server"
    chef.add_recipe "postgresql::client"
    chef.add_recipe "postgresql::ruby"

    # Install Ruby 2.1.2 and Bundler
    # Set an empty root password for MySQL to make things simple
    chef.json = {
      rbenv: {
        user_installs: [{
          user: 'vagrant',
          rubies: ["2.1.2"],
          global: "2.1.2",
          gems: {
            "2.1.2" => [
              { name: "bundler" }
            ]
          }
        }]
      },
      mysql: {
        server_root_password: ''
      },
      postgresql: {
        password: {
          postgres: ""
        }
      },
      run_list: ["recipe[postgresql::server]"]
    }
  end
end
```
修改了Cheffile和Vagrantfile后，需要执行<code>vagrant provision</code>，修改才会生效。 执行时间可能比较长，等执行完之后，依旧执行<code>vagrant ssh</code>登录虚拟机。

这时的虚拟机才是安装了Ruby的开发环境Ready的机器。

__参考__

*https://gorails.com/guides/using-vagrant-for-rails-development
*http://segmentfault.com/blog/fenbox/1190000000264347
