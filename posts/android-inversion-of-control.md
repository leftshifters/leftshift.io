During development cycles, software tests are often repeated with each incremental build to insure quality. For Android, it needs to be tested on each major resolution and each major version (of Android). Three years ago, we started with small apps which had simple requirements, but things changed majorly last year. The apps we made recently were complex and had ever changing requirements. Some of them are - *[NH7 InTown][1]*, *[BookMyShow][2]* and *[StepJockey][3]*.

We have a small QA team who went through each releases of these apps to find bugs, crashes and experience issues on various Android devices. It's a repetitive, time consuming task and hence very costly too. So, we decided to introduce automated unit and functional testing.

We evaluated testing framework for Android, set up continuous integration server, started writing tests. But, the results were not very favorable. It was really difficult to test components (activities, services, fragments) that were dependent on external or the OS' services. We then came across a concept- *Inversion of Control*.

It did, gradually, made our life easy. But understanding it was not a cakewalk. Each sources explained it differently, someone even said that IoC is *Dependency Injection* (DI). Anyways, slowly and gradually, with a lot of reading and a lot of discussion we understood the concept and various popular patterns that uses it. I will be sharing our understanding of these concepts and how we started writing testable codes. It will be covered in a series of blogs.

#### Inversion of Control (IoC)
Inversion of Control is a programming technique, which unlike traditional programming where the flow of the business logic is determined by objects that are statically assigned to one another; inverts it to create a flow which will be a determined by behavior of dynamically assigned object.

There are various patterns using which this can be implemented; like- service locator, factory pattern, parameterized constructor and dependency injection.

We chose *dependency injection* and the motivation behind it was hugely influenced by the motivation behind using *[Guice][4]*. Let's go through each of them though.

**Service Locator** uses client server pattern to satisfy dependency. Dependencies are analyzed and satisfied at run-time. This actually make it more of an anti-pattern. It's better be avoided. It hides it's internal dependencies from user, acting more like a black box. Due to this, whenever it's dependencies are not satisfied, it throws a run-time errors. This makes it difficult to manage.

**Factory pattern** uses static methods to get and set mock implementations for interfaces. It decouples the client and the implementing class, but when it comes to testing, there's problem. It requires an elaborate setup and teardown. In cases when a teardown fails, it can affect consecutive test cases.

You can also decouple a client from a dependent class using **parameterized constructor**. It's actually a variant of dependency injection. To use it, every client needs to pass concrete implementation to the dependent class, causing a lot of duplication and unmanageable code.

There is an another variant of **Dependency Injection** which uses object graph to create graph of all dependent object and their dependencies. When such a dependent object is instantiated; all it's dependencies are satisfied by the framework with help of the graph.

While we were exploring options we came across *[Roboguice][5]* and *[Dagger][6]*. Dagger seemed more elegant than Roboguice. For using *Roboguice* you need your activity to extend an activity provided by *Roboguice*. Though it works automagically after that, this was a major turn off for us, specially when we saw how *Dagger* works.

#### Dagger
*Dagger* is a fast dependency injector for Android and java. It's developed and open sourced by *[Square, Inc][7]*. Now, even *Google* is actively contributing to it.

*Dagger* is build from bottom up for mobile platform. It statically analyses all dependencies and injections. Since it's done at compile time, any failing dependency is detected at very early stage. It has negligible memory impact as it doesn't use reflection or annotation processing at runtime, unlike *Guice*.

So, how it works? The basic structure looks something like -

* ObjectGraph: A central dependency manager and injector. Developer needs to create the graph manually to specify all the dependencies in a application. Graph can be specified at *Application* level, or at smaller levels like - *Activities*, *Services*, *Fragments*, *View*.
* @Module + @Provides: These mechanisms are used for providing dependencies.
* @Inject: It is used for requesting dependencies.
* There are some more conventions and magic.

In the next part, we will see these in detail with help of an example application.

[1]:http://leftshift.io/nh7-intown-mobile-apps
[2]:http://leftshift.io/bookmyshow-mobile-apps
[3]:http://leftshift.io/stepjockey-android-app
[4]:https://code.google.com/p/google-guice/wiki/Motivation?tm=6
[5]:http://github.com/roboguice/roboguice
[6]:http://square.github.io/dagger/
[7]:https://squareup.com/