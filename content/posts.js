const posts = [
  {
    title: "Tracking uninstalls on iOS and Android",
    description:
      "Gandharva from Leftshift talks about how to track uninstalls on iOS and Android",
    intro:
      "One day, a user uninstalls your app. You don't know why she did it, you don't have any way to get back to her and ask for a feedback.",
    author: "Gandharva Kumar",
    date: "31 July 2015",
    slug: "mobile-tracking-uninstalls-on-ios-and-android",
    render: "post",
    file: "mobile-tracking-uninstalls-on-ios-and-android.md",
    tags: ["mobile", "tracking", "uninstalls", "ios", "android"],
    prepend: "",
    append: "",
  },
  {
    title: "64 Bit me today - Strange issues in 64 bit binaries",
    description:
      "Harshad from Leftshift talks about how migrating to 64 bit turned out to be not so simple",
    intro:
      'I always wondered why developers took so much time to put "64 bit support" in their release notes. Here\'s what I found out!',
    author: "Harshad Dange",
    date: "15 May 2015",
    slug: "ios-64-bit-me-today",
    render: "post",
    file: "64-bit-me-today.md",
    tags: ["ios", "64bit", "bugs"],
    prepend: "",
    append: "",
  },
  {
    title:
      "Getting Apps Done - Workshop on App Development at Tech Talk @ Tokopedia",
    description: "Sudhanshu from Leftshift talks about how to make apps",
    intro:
      "Here is the presentation I gave at Tech Talk @ Tokopedia in Jakarta.",
    author: "Sudhanshu Raheja",
    date: "07 Apr 2015",
    slug: "getting-apps-done",
    render: "post",
    file: "tech-talk-tokopedia.md",
    tags: [
      "apps",
      "wireframes",
      "product",
      "pm",
      "design",
      "animations",
      "development",
      "testing",
    ],
    prepend:
      '<br><script async class="speakerdeck-embed" data-id="f4436c27d3904991b99b27b0c80f8f24" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>',
    append: "",
  },
  {
    title: "How I deployed Sonatype Nexus in 5 minutes?",
    description:
      "Gandharva from Leftshift talks about how to deploy Sonatype Nexus",
    intro:
      "I was struggling with Sonatype Nexus for a week. After three failed attempts, here is how I managed to get it to work",
    author: "Gandharva Kumar",
    date: "29 December 2014",
    slug: "how-i-deployed-sonatype-nexus-in-5-minutes",
    render: "post",
    file: "sonatype-nexus.md",
    tags: ["sonatype-nexus", "install", "android"],
    prepend: "",
    append: "",
  },
  {
    title: "Upgrading Nginx to the latest version on Ubuntu servers",
    description:
      "Sudhanshu from Leftshift talks about how to get the latest version of Nginx running on your servers",
    intro:
      "If you're running nginx on an Ubuntu box, you would soon find out that the default version of Ubuntu packed with the OS is really old. 12.04 LTS ships with Nginx version 1.1.19, while the latest stable release is 1.4.7",
    author: "Sudhanshu Raheja",
    date: "14 April 2014",
    slug: "upgrading-nginx-to-the-latest-version-on-ubuntu-servers",
    render: "post",
    file: "nginx-upgrade.md",
    tags: ["nginx", "upgrade", "server"],
    prepend: "",
    append: "",
  },
  {
    title: "4 Javascript Optimisations you should know",
    description:
      "Pranay from Leftshift talks about how to optimize your javascript",
    intro:
      "There are some advantages that can only be achieved in JavaScript, implementing them in other languages can be really painful. This blog post will talk about some of the tricks that you can use in JavaScript that will help you optimize your code and make it even faster",
    author: "Pranay Dubey",
    date: "4 April 2014",
    slug: "4-javascript-optimisations-you-should-know",
    render: "post",
    file: "javascript-optimisations.md",
    tags: ["javascript", "optimisation"],
    prepend: "",
    append: "",
  },
  {
    title: "Free Download : Sketch files for Macaw",
    description:
      "The Leftshift team is giving away the Sketch files for Macaw. If you are new to Sketch, you should try this out",
    intro:
      "It has been a while since we moved to using Sketch app, and ever since we started, we wanted to share some of the design that we have been doing with it.",
    author: "Nishant Shirbhate",
    date: "31 March 2014",
    slug: "downloads-sketch-files-for-macaw",
    render: "post",
    file: "macaw.md",
    tags: ["design", "downloads", "sketch-app"],
    prepend: "",
    append: "",
  },
  {
    title:
      "Multipeer Connectivity, iBeacons and other interesting features of iOS7",
    description:
      "Harshad from Leftshift talks about Multipeer Connectivity in iOS7",
    intro:
      "With Multipeer Connectivity, nearby applications can discover, connect and exchange data between them without being connected to an external network/WAN. Moreover it works seamlessly over WiFi or Bluetooth on any iOS device with Bluetooth LE capabilities.",
    author: "Harshad Dange",
    date: "28 March 2014",
    slug: "multipeer-connectivity-ibeacons-other-interesting-features-ios7",
    render: "post",
    file: "multipeer-connectivity.md",
    tags: [
      "ios",
      "multipeer-connectivity",
      "bluetooth",
      "ble",
      "ibeacons",
      "background-app-refresh",
      "ios7",
      "silent-push-notifications",
    ],
    prepend: "",
    append: "",
  },
  {
    title:
      "Android: Inversion of Control, Dependency Injection, Dagger - Part 1",
    description:
      "Gandharva from Leftshift talks about using Inversion of Control, Dependency Injection and Dagger in Android",
    intro:
      "We evaluated testing framework for Android, set up continuous integration server, started writing tests. But, the results were not very favorable. We then came across a concept - Inversion of Control.",
    author: "Gandharva Kumar",
    date: "24 March 2014",
    slug: "android-inversion-of-control-dependency-injection-dagger-part-1",
    render: "post",
    file: "android-inversion-of-control.md",
    tags: ["android", "inversion-of-control", "dependency-injection", "dagger"],
    prepend: "",
    append: "",
  },
  {
    title: "How to test on Android with a limited budget - Part 1",
    description:
      "Sudhanshu from Leftshift talks about how to buy 10 phones which will cover 90% of the different screen resolutions that you need to target",
    intro:
      "There are 1000s of Android phones out there, and it's not possible to get each one of them to test out your new application. But what is possible, is to figure out which phones will help you cover 90% of the market.",
    author: "Sudhanshu Raheja",
    date: "20 March 2014",
    slug: "how-to-test-android-with-limited-budget-part-1",
    render: "post",
    file: "android-resolutions.md",
    tags: ["android", "resolution"],
    prepend: "",
    append: "",
  },
  {
    title: "Making Apps - Workshop on App Development and Marketing",
    description: "Sudhanshu from Leftshift talks about how to make apps",
    intro:
      "Here are my slides from the workshop I did at the App Development and Marketing Master Class at The Coalition on 15th March 2014. The presentation aims to help you figure out how to decide what to build, finalize a feature set, hire design and development teams and take your app to the store.",
    author: "Sudhanshu Raheja",
    date: "15 March 2014",
    slug: "making-apps-presentation-at-the-coalition",
    render: "post",
    file: "making-apps-presentation.md",
    tags: ["apps", "workshop", "ios", "android", "ideation", "thecoalition"],
    prepend:
      '<br><script async class="speakerdeck-embed" data-id="186a09f08e2d013171865e6b7054d712" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>',
    append: "",
  },
  {
    title: "6 ways to make your lists scroll faster than the wind",
    description:
      "Abhishek from Leftshift talks about some general rules to help improve the list scrolling performance on Android devices.",
    intro:
      "There are good times and there are bad times. Making an app is always fun. What's not fun, is getting a brand new MotoX and watching your app run slower on it that the sad old samsung testing phone in office. It literally had me in tears the first time I saw it. And even though it was late in the evening, I decided to find out what I can do to fix it.",
    author: "Abhishek Birdawade",
    date: "12 March 2014",
    slug: "6-ways-to-make-your-lists-scroll-faster-than-the-wind",
    render: "post",
    file: "android-list-scroll.md",
    tags: ["android", "scrolling", "performance"],
    prepend: "",
    append: "",
  },
  {
    title: "8 Tips for Angular.js Beginners",
    description:
      "Sudhanshu from Leftshift gives some tips for developers just starting out with Angular.js.",
    intro:
      "We started working with Angular.js recently and after spending a few days on it, I realised that there a big need for beginner tutorials on it. I’ve tried to document some of the things you might need on day 1.",
    author: "Sudhanshu Raheja",
    date: "08 September 2012",
    slug: "8-tips-for-angular-js-beginners",
    render: "post",
    file: "tips-for-angular-js-beginners.md",
    tags: ["angularjs", "tips", "development"],
    prepend: "",
    append: "",
  },
  {
    title: "Problem Statement for Interviews",
    description:
      "Here is the problem statement that we send out to people who apply for engineering profiles at Leftshift",
    intro:
      "Here is the problem statement that we send out to people who apply for engineering profiles at Leftshift",
    author: "All of us at Leftshift",
    date: "03 January 2011",
    slug: "problem-statement",
    render: "post",
    file: "problem-statement.md",
    tags: ["join", "problem"],
    prepend: "",
    append: "",
  },
  {
    title: "Employee Handbook",
    description:
      "This is a ready reckoner for our rules, policies and some of the things that might need to know if you are working at Leftshift.",
    intro:
      "This is a ready reckoner for our rules, policies and some of the things that might need to know if you are working at Leftshift.",
    author: "All of us at Leftshift",
    date: "02 January 2011",
    slug: "employee-handbook",
    render: "post",
    file: "handbook.md",
    tags: ["handbook", "rules", "company-policy"],
    prepend: "",
    append: "",
  },
  {
    title: "Careers at Leftshift",
    description:
      "We at Leftshift are always on the lookout for amazing team to join our team. You can find out more details about our process on this page.",
    intro: "So you think you would like to join us?",
    author: "All of us at Leftshift",
    date: "01 January 2011",
    slug: "careers",
    render: "post",
    file: "careers.md",
    tags: ["careers", "jobs"],
    prepend: "",
    append: "",
  },
];

exports.get = () => {
  return posts;
};
