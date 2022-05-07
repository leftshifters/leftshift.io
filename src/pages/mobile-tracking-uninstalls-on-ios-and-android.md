---
title: Tracking uninstalls on iOS and Android
description: Gandharva from Leftshift talks about how to track uninstalls on iOS and Android
intro: One day, a user uninstalls your app. You don't know why she did it, you don't have any way to get back to her and ask for a feedback.
author: Gandharva Kumar
date: 31 July 2015
tags: ["mobile", "tracking", "uninstalls", "ios", "android"]
layout: ../layout/BlogPostLayout.astro
---

You launch an app, invest a lot of resources, spend like crazy on marketing, add all types of analytics to track users' every click and analyze it. One day, a user uninstalls your app. You don't know why he did it, you don't have any way to get back to him and ask for a feedback.

There is a way on both platforms (iOS and Android) which can be used to see who is uninstalling your app. Use of _push notification_. Yes, use of push notification at an _optimum frequency_ can help you _track uninstalls_. Once you know who has uninstalled, you can make use of user date store in your server to get in touch with the user.

#### Android

Send a push notification to all users at a frequency (say, daily). Send a special parameter in the body to determine that the push notification is only for tracking uninstalls. You shouldn't show anything on the device for such kind of notification, just process it silently.

Suppose, you send a push notification with following payload

    {
    	"registration_ids": [
    		"cXA8WRhGWt8:APA91bE3Vgr3x8egGAcriY56Dgdq8CTY- ALukO0UWQwh1k5bUkrG1RbUrjMyFfUrMzah-F3DZaFjHYTogga9D_ w3mse6U_Nx7tgWJ_9tdLcumIe0fARAKsiBvxLlBZjBnwujulIYd3zh",
    		"fFN9eAHFqdQ:APA91bGHS6jswwObM1GTpoKzbreMIwnuv z65pzU1ff1d76BQUkvUXuT9k5NSygwoCt-U1cOdalF7VhMi DrndidjrxV25VM8ZglEsoio-mMFYRBHMUGCf61kjCdloFnxygCG7RkXRPA5M"
    	],
    	"data": {
    		"type": "track-uninstall"
    	}
    }

The second id is of a device from which app has been removed. Let's check the response we get from GCM.

    {
    	"multicast_id": 5559150596267635443,
    	"success": 1,
    	"failure": 1,
    	"canonical_ids": 0,
    	"results": [
    		{
    			"message_id": "0:1438339632512460 %2930a2c7f9fd7ecd"
    		},
    		{
    			"error": "NotRegistered"
    		}
    	]
    }

As you can clearly see, for the second id, it says that the device is not registered. You can find the user corresponding to the id from your database and try to get in touch with her/ him.

The next step would be to get a callback from the push notification service, find the user this id maps to and lets appsflyer and Mixpanel, GA or whatwever system you use.

#### iOS

Alright, so Android was easy, what about iOS.

On iOS, you use the exact same trick, only it's called sending 'silent push notifications'. If you've been pushing things down to your users for a long time, you would know that Apple's push notification service includes a _[feedback service][1]_ which gives information about failed remote notifications. A list of device tokens will come as a response to the request made to this service. The device tokens are added to this list when the app is no longer available on the corresponding device. You can use this list to get in touch with users.

The feedback service has been around for a while, but the separate call always seemed painful. Luckily, Apple is making some (much needed) big changes to Push Notifications. The changes will roll out later this year with iOS9 of course. When this rolls out, there will not be any need to make a separate call to the Feedback Service. Apple's server will respond to request for sending Push Notification itself. If an app is uninstalled from a device or user has disabled Push Notification on it, all you have to do is handle an error code.

    Error code 410.

If you would like to geek out more, you can find more details about it in this WWDC video- _[What's New in Notifications][2]_. You should watch the whole thing, but if not, you can skip to 16:45 to watch the changes in APNS.

That's all folks.

[1]: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html#//apple_ref/doc/uid/TP40008194-CH101-SW3
[2]: https://developer.apple.com/videos/wwdc/2015/?id=720
