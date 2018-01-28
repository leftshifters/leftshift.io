It's been 2 years since I started working with javascript and in my opinion, it's probably the *best* language to work with! I was a Java developer before and have worked on many other languages like C, C++, C# but what _amuses_ me about JavaScript is its flexibility which is because its _weakly typed_ (i.e you can provide a variable with any value and the type of the value becomes the type of the variable), there are _no classes_ (everything in JavaScript is an object, believe me) and many others intriguing things like these.

With experience I realised that there are some things that can only be achieved in JavaScript and some of them are so tricky that only a JavaScript can really believe that it's possible to do it. This blog post is dedicated to some of the tricks that you can use in JavaScript that will help you optimize your code and make it even faster (irrespective of the JavaScript framework you're using).

### 1. Switch Case

Consider the following switch case

	switch(student.quality) {
		case "Hard Working":
		case "Honest":
		case "Intelligent":
		case "Team player":
			return true;
			break;
		default:
			return false;
	}

This is a typical case when you need to _return_ to provide the same response for a series of switch cases. But this will result in iterating through all the cases until there is a match or return default when none is found. So how can we optimize this?

It turns out that we can use JavaScript's objects for it. Remember that in JavaScript you can try to access a non-existent property of an object and it won't throw you an error (Accessing a property of an undefined value will throw an exception though). It will just return you the value and undefined if the property is non existent.

So for the above switch statement we can create an object called “IdealStudent”

	var IdealStudent = {
		Hard Working: true,
		Honest: true,
		Intelligent: true,
		Team Player: true
	};

Now whenever we need to check the validation of `student.quality` we can simply do:

	return IdealStudent[student.quality];

or even better

	return IdealStudent.hasOwnProperty(student.quality); // to avoid checking for the inherited ones.

This is not only simpler and manageable, it will also reduce the no of iterations which would have been done while using a switch case and thus improving performance.

### 2. For..in loop

You can loop through all the properties of an object using a for..in loop like:

	for (var i in objectName) {
		console.log(i);
	}

but there's a catch! This will also log the inherited properties of that object. This can be avoided by doing the following:

	for (var i in objectName) {
		if (objectName.hasOwnProperty(i) {
			console.log(i);
		}
	}

Does it become irritating every time to check for own properties while looping through the properties of an object?
Don't worry, we have *Object.keys* to the rescue

As per EcmaScript 5 we get the power of using _Object.keys_ which returns only the own properties of the object and cleverly ignores the Non-enumerable and inherited ones.

	var keys = Object.keys(objectName) // will return an array of own properties

	for(var i = 0; i < keys.length; i++){
		console.log( objectName[keys[i]] );
	}

### 3. Optimizing loops

Consider a simple for loop:

	for( i = 0; i < array.length; i++) {
		//do something;
	};

most of us would agree that passing length of the array to a variable would make the loop faster, like this:

	for(var i = 0, len = array.length; i < len; i++) {
		// do something
	}

which is true because we don't have to evaluate the length of the array. But isn't there any other way to make the loop even faster??

It turns out there is!!

Consider the following:

	var i = array.length;

	while (i--) {
		//do something
	}

How can we say this one is faster? Well on a closer look you can see that we no longer have to compare the value of i with “len” variable. And due to javascript's truthy-falsy behaviour ( all null, undefined, negative values tend to false ) our loop stops when i becomes -1 which is exactly where we want our loop to finish. This style of creating loop has been said to be around 50% faster than the traditional approach (on average).

[Here's a reference benchmark that we put up on JsFiddle](http://jsfiddle.net/kNLda/)

### 4. Passing arguments to a function

Consider the following constructor function:

	function Student(name,age,address) {
		this.name = name,
		this.age = age,
		this.address = address
	}

	var student = new Student('John', 46, 'Magarpatta, Pune') // and yes he is 46 :D

Well this is the typical way of creating objects via constructor invocations but it becomes irritating when the number of arguments increase. Also there is a maintenance overhead when it comes to the sequence of arguments.

The best way to use constructor invocation is to pass an object as an argument. In that way we don't need to maintain the sequence of arguments and also our invocation looks much more cleaner.

Example

	var studentObj = {
		name: 'Alex',
		age: 25,
		address: 'Pimpri,Pune'
	};

Now our constructor function:

	function Student(obj){
		this.name = obj.name,
		this.age = obj.age,
		this.address = obj.address || 'Pune' // have some default values as well
	};

	var student = new Student(studentObj);

This will allow the developer to simply pass a predefined object ( whether created locally or received from an ajax request ) and instantiate the constructor.


That's it for now. Are there any more that you can think of?