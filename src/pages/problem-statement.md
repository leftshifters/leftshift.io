---
title: Problem Statement for Interviews
description: Here is the problem statement that we send out to people who apply for engineering profiles at Leftshift
intro: Here is the problem statement that we send out to people who apply for engineering profiles at Leftshift
author: All of us at Leftshift
date: 03 January 2011
tags: ["join", "problem"]
---

We love to challenge our candidates, so we ask that you complete this assignment as part of your application. You can take _as much time_ as you like to complete the assignment. Please get back to us whenever you're done.

The focus of the solution is on the _quality of your code_, rather than the time required to complete it.

Should you have any further questions, please do not hesitate to contact us.

### Instructions

_If you are applying for iOS_

- We would suggest that you that you build a native app using [Swift](https://swift.org).
- Objective-C would do too, but we would prefer Swift.
- We prefer code that is modular and testable. And this sometimes requires you to go beyond MVC and dive into [MVVM](https://www.objc.io/issues/13-architecture/mvvm/), [MVP](https://medium.com/ios-os-x-development/ios-architecture-patterns-ecba4c38de52#.4ma913306) and others.

_If you are applying for Android_

- We would suggest that you build a native app with Java.
- We prefer that you use [MVP](https://github.com/googlesamples/android-architecture) or even [MVVM](https://github.com/ivacf/archi).
- It would also be great if you could use Android [data binding APIs](https://developer.android.com/topic/libraries/data-binding/index.html)

_If you are applying for Node.js_

- We would suggest that you write in [ES6](http://es6-features.org)/[ES7](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_Next_support_in_Mozilla) in latest version of [nodejs (6.x.x+)](https://nodejs.org/en/download/current/).
- Follow a [JavaScript style guide](https://www.google.co.in/search?client=safari&rls=en&q=ios+mvvm&ie=UTF-8&oe=UTF-8&gfe_rd=cr&ei=lFNtV9imMIzC8gfV4KyoAQ#q=javascript+style+guide).
- Make sure your code is reusable, testable and efficient.

_If you are applying for [React](https://facebook.github.io/react/)_

- We would suggest that your write in [ES6](http://es6-features.org)/[ES7](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_Next_support_in_Mozilla) & use a transpiler like [Babel](https://babeljs.io) along with a module bundler like [Webpack](https://webpack.github.io), [Rollup](https://github.com/rollup/rollup), [Browserify](http://browserify.org) etc.
- We would prefer that you use [Flux](https://facebook.github.io/flux/) or [Redux](https://github.com/reactjs/redux) as your store.

_Super bonus_

- For adding test coverage to anything that you submit.

### The Problem

You need to build out a small application to fetch the weather forecast of multiple cities

Step 1 : Get an API Key

- Head over to [OpenWeatherMap](http://openweathermap.org) and register for an account
- Once you are in, go to your personal page and get the API key

Step 2

- The app should accept multiple city names from the user
- Based on the city names entered, the app should show the the weather forecast for the 14 days for each city

Step 3

- Find the current city using GPS
- Display the weather forecast for the current city for 14 days

Step 4

- When you're ready, push the latest source code to [Github](github.com) (or any other free git repo) and send us a link

### More Information

You can use the following API calls to fetch the weather forecast of a given city

- Sample 1. [http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&cnt=14&APPID=xxxxx](http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&cnt=14&APPID=xxxxx)
- Sample 2. [http://api.openweathermap.org/data/2.5/forecast/daily?q=Moscow&cnt=14&APPID=xxxxx](http://api.openweathermap.org/data/2.5/forecast/daily?q=Moscow&cnt=14&APPID=xxxxx)

More details for the API can be found [here](http://openweathermap.org/API#forecast)
