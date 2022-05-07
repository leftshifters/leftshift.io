---
title: Multipeer Connectivity, iBeacons and other interesting features of iOS7
description: Harshad from Leftshift talks about Multipeer Connectivity in iOS7
intro: With Multipeer Connectivity, nearby applications can discover, connect and exchange data between them without being connected to an external network/WAN. Moreover it works seamlessly over WiFi or Bluetooth on any iOS device with Bluetooth LE capabilities.
author: Harshad Dange
date: 28 March 2014
tags: [ "ios", "multipeer-connectivity", "bluetooth", "ble", "ibeacons", "background-app-refresh", "ios7", "silent-push-notifications"]
---

With iOS 7, Apple introduced two new powerful frameworks -- _[Multipeer Connectivity](https://developer.apple.com/library/ios/documentation/MultipeerConnectivity/Reference/MultipeerConnectivityFramework/Introduction/Introduction.html)_ and _[iBeacons](http://en.wikipedia.org/wiki/IBeacon)_. Using these two technologies, it is possible to create applications that stay detached from the cloud, but still communicate with each other. With Multipeer Connectivity, nearby applications can discover, connect and exchange data between them _without being connected to an external network/WAN_. Moreover it works seamlessly over WiFi or Bluetooth on any iOS device with Bluetooth LE capabilities.

![Multipeer Connectivity at a glance](/images/blog/multipeerconnectivity-768x615.jpg)

Developers have already started leveraging this new feature in their apps. One of the apps that recently made the news is [FireChat](https://itunes.apple.com/us/app/firechat/id719829352?mt=8&ign-mpt=uo%3D8), which allows you to chat with nearby people using Multipeer Connectivity. The other obvious application of Multipeer Connectivity is in file transfer applications. The most popular among them is Apple's Airdrop. Yes, you no longer have to email yourself files just to view them on a different device!

### How to Multipeer Connectivity?

From a developer's point of view, the API is quite straight forward and high level. Its easy to integrate peer-to-peer networking in your application without any prior knowledge/experience about peer-to-peer networks or their protocols. It also has configurable security and reliability levels. The API nicely abstracts the process of discovering and connecting to devices. In practice, a developer doesn't even need to know if connections are made over WiFi or Bluetooth. Moreover, the Multipeer Connectivity framework is thread safe and applications can create and maintain connections even when in the background.

But there still is one tough nut to crack -- applications cannot relaunch themselves after they have been quit. So a chat/file transfer application would require all participating users to first launch the app to be able to communicate with each other. Yes, you could send a push notification when you want to send a file to someone nearby, but that introduces the cloud in the loop and just defeats the purpose of Multipeer Connectivity. And adding an unneeded location background mode to your application solely to keep it from getting killed by the OS is just unethical.

### Enter iBeacons!

With iBeacons, we can solve this issue elegantly. Beacons are devices that continuously advertise themselves using Bluetooth LE. Any iOS device/Mac with BLE hardware can be turned into a beacon using the Core Bluetooth framework. The Core Location framework has new APIs to detect and range these beacons. This is similar to geographical region monitoring previously added to the Core Location framework, except it uses Bluetooth instead of GPS/WiFi. Applications get notified whenever they enter or exit a beacon region. If the application has been quit or suspended, _it is relaunched and notified on entering a beacon region_. With iBeacons, _an application has the power to launch applications on nearby devices and communicate with them._

![Beacons wake up apps!](/images/blog/waking-apps-with-ibeacons-768x615.jpg)

So when the user of our file transfer application opens the app to send a file, it starts advertising a beacon region. This simulates a beacon entry event for all nearby apps monitoring this beacon. These apps are then launched by iOS and can form a peer-to-peer network in the background. They can freely exchange data among themselves without any user interaction. Where user interaction is required, local notifications will do the job!

### Going beyond chat and file transfer

File transfer and chat are the most obvious uses cases of Multipeer Connectivity. But it has many more interesting applications. With iOS 7 Apple also introduced _Background App Refresh_ -- a feature that lets applications periodically check for and download new content when in the background. Feed readers/news applications are already using this to keep themselves updated whenever they get a chance. iOS, however, does not guarantee any specific period/slot for background app refresh. This can be made better with yet another feature introduced in iOS 7 -- _Silent Push Notifications_, which allows applications to be remotely notified when new content is available. When an application receives a silent push notification, it can fetch the new content _in background_ and update its user interface, ready for the user!

The Multipeer Connectivity/iBeacon combo can also be used for this. Whenever an application fetches the latest news, it can relay this to other applications on nearby devices. This could be further improvised as a _cross-device resource cache_, where resources downloaded by one application are shared with applications on nearby devices. Before an application makes a server request for some resource, it can first check if there are any devices nearby that have what its looking for. If they do, it can completely avoid the server call and fetch the content from one of them. This could also work for promotional content -- when an application receives some promotional content, it can wake up nearby applications and inform them about it, which in-turn inform their users with a local notification.

Multiplayer gaming and augmented reality applications can also benefit from this. A fitness/running application, for example, can allow its users to compete against each other in real time using beacons and Multipeer Connectivity. Games have been using the peer-to-peer APIs of Game Kit for a while now to create multiplayer gaming sessions with nearby gamers. Multipeer Connectivity, in fact, is based on these APIs previously added to Game Kit.

These are just some of the applications we can think of about these powerful new features of iOS 7. At _Leftshift_, we find a use for these in almost every new application that we work on. But the fact that this combo _requires app users to be physically in the vicinity of each other_ limits their use. We also found the APIs a bit unreliable, with random connection drops and glitches. But we can certainly expect them to be more robust and reliable in the coming iOS versions. The other thing that surprised us was the lack of support for Multipeer Connectivity on Mac OS X, considering the fact that OS X already has Airdrop for a few years now (first introduced with OS X Lion). We do expect Apple to bring this framework to OS X, which would just make things more interesting.

### Further reading

Apple's [WWDC session](https://developer.apple.com/videos/wwdc/2013/) on Multipeer Connectivity is a great guide to get you started with the technology. Apple has also provided [sample code](https://developer.apple.com/library/ios/samplecode/MultipeerGroupChat/Introduction/Intro.html) of a chat application.

For iBeacons, Radius Networks has an excellent [blog post](http://developer.radiusnetworks.com/2013/11/13/ibeacon-monitoring-in-the-background-and-foreground.html) and accompanying sample code, which investigates how iBeacons work in the background and foreground.

And if you IRC, you can always ping me in #iphonedev/#macdev on [freenode](http://freenode.net). I'm the pretty_function that idles over there.
