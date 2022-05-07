---
title: Upgrading Nginx to the latest version on Ubuntu servers
description: Sudhanshu from Leftshift talks about how to get the latest version of Nginx running on your servers
intro: If you're running nginx on an Ubuntu box, you would soon find out that the default version of Ubuntu packed with the OS is really old. 12.04 LTS ships with Nginx version 1.1.19, while the latest stable release is 1.4.7
author: Sudhanshu Raheja
date: 14 April 2014
tags: ["nginx", "upgrade", "server"]
layout: ../layout/BlogPostLayout.astro
---

It has been years since we touched Apache. For the last few years, each and every one of our servers has had Nginx running on it. The last of our server which still runs apache is the one which runs our old website vxtindia.com.

If you're running nginx on an Ubuntu box, you would soon find out that the default version of Ubuntu packed with the OS is really really old. For example, the most popular version in use right now is 12.04 LTS Precise Pangolin, and it ships with Nginx version 1.1.19. Just to put that in perspective, the latest stable release as of today (14 April 2014) is 1.4.7 and the Preview release is at 1.5.13.

Here are some major issues which have been discovered in 1.1.19 after it's release

[CVE-2014-0133](http://mailman.nginx.org/pipermail/nginx-announce/2014/000135.html)
[CVE-2013-0337](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=701112)
[CVE-2013-2070](http://mailman.nginx.org/pipermail/nginx-announce/2013/000114.html)
[CVE-2013-4547](http://mailman.nginx.org/pipermail/nginx-announce/2013/000125.html)

All this means is that you need to be running the latest version of Nginx to avoid the security problems. This post is about how to do that.

The first thing is to find out which version are you on. Here's how you do it

    nginx -v

It should show you something like

    nginx version: nginx/1.1.19

Now that we know that we need to upgrade, the first thing to do is to backup your configuration

    sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.1.1.19.backup

Ok, moving on, first stop the nginx service

    sudo service nginx stop

Install the dependencies

    sudo aptitude install python-software-properties

Add the repository for the stable version of Nginx

    sudo add-apt-repository ppa:nginx/stable

Now the usual stuff, update aptitude and upgrade it

    sudo aptitude update
    sudo aptitude safe-upgrade

When it asks you if you want to keep using the old config or get the new config, please select Y(es) and get the latest config.
Finally, restart nginx

    sudo service nginx restart

If you ask nginx what version its on, here's what it would say

    nginx -v
    nginx version: nginx/1.4.7

That's it. Now you have the latest version of Nginx running on your servers.

P.S. Special thanks to [Detectify](https://detectify.com) for helping us figure out which of our servers were not in good shape, and the security issues that we faced with each version.
