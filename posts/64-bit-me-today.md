Apple has been pushing developers to include 64 bit support in their apps ever since they released the iPhone 5s. You currently cannot get your app in the store unless you include the 64 bit slice in the binary. As usual with Apple, this is an easy transition for developers -- just click a checkbox to include 64 bit support! And if you are using the latest Xcode, this is already done for you.

Since this is so simple, I always wondered why developers took so much time to put "64 bit support" in their release notes. For the majority of the apps in the store, 64/32 bit doesn't really make a difference. Apps of course will have the advantage of a superior architecture with higher IPC and wider register width. But this is something that can only be noticed in synthetic benchmarks.

This applies to most apps we make here at Leftshift. We did face 'issues' adding 64 bit support to apps at times -- third party libraries that did not include an ARM 64 slice in the binary (looking at you, Google Analytics). And this:

![Image-1](/images/blog/64-bit-1.png)

But honestly, this never broke any of our apps ever.

## Until today

This app we are currently working on has forms. Yeah, like a million other apps on the store. Every form has fields which the user can edit. And because you can't trust users, you have to validate what they are entering in these fields.

But this form is ... special. The types of fields and the inputs they accept vary wildly and are dynamic in nature (imagine filling out an insurance application). The validation rules for these fields are fetched from a server as they frequently change.

The cleanest way to do this is fetching a regex from the server for every field. But due to some "technical difficulties" we were not able to do this. Instead we made an object that validates text input:

	@interface FieldValidator : NSObject <NSCoding>

	- (BOOL)validateInput:(NSString *)input error:(NSError **)error;
		
	@property NSInteger inputType;	// enum for various input types (numeric, alphanumeric, etc.)
	@property float minimumAmount;	// The float value of the input must be more than this
	@property float maximumAmount;	// The float value of the input must be less than this
	@property NSRange lengthRange;	// For validating the length (number of characters)
	
	@end

Note the use of `NSRange` for validating the length of the input. `NSRange` is a Foundation struct with two fields:

	typedef struct _NSRange {
	    NSUInteger location;
	    NSUInteger length;
	} NSRange;


I cleverly used it in this app to validate the length of the input as such:

	- (BOOL)validateInput:(NSString *)input error:(NSError **)error {
		BOOL valid = NO;
		NSInteger length = [input length];
		if (length > self.lengthRange.location && length < self.lengthRange.length) {
			valid = YES;
		}
		...
		return valid;
	}

Now you might be thinking of this as the programming equivalent of [hammering a nail with an old shoe](http://weblogs.asp.net/alex_papadimoulis/408925). And you are right. But I had my _reasons_.

Some of these field validators are stored persistently using `NSCoding` and are bundled with the app for offline use. And NSRange has convenient functions to convert it to an object that can be archived with `NSCoding` and back:   
`NSString *NSStringFromRange(NSRange range);`  
and `NSRange NSRangeFromString(NSString *aString);`

In other words, _laziness_. And the excuse for that -- _deadlines_.

Now, there can be fields that do not really need to be validated for their length. Like names and addresses. A simple nil check suffices for these fields. For such fields the `location` field of the range is set to `NSNotFound`, a compile time constant:

	- (BOOL)validateInput:(NSString *)input error:(NSError **)error {
		BOOL valid = NO;
		if (self.lengthRange.location != NSNotFound) {
			// Do the validation
			...
		} else {
			// No length validation required
			valid = (input != nil);
		}
		...
		return valid;
	}

This all seemed to work wonderfully for me.

## And I would have gotten away with it, too, if it weren't for you meddling testers!

I received reports from testers that they occasionally get validation errors even if they have correctly filled out a field.

![Image-2](/images/blog/64-bit-2.png)

But wait a minute, names never have length validation!

I was never able to reproduce this in my testing. I initially attributed this error to a bug in the way the user input is saved. The are so many places inside forms where bugs can reside, especially on phone sized screens. Fields get scrolled out of the screen, reused, freed prematurely, etc. But none of this seemed to be happening.

After numerous attempts of fixing this bug, I finally was able to reproduce it -- _on an iPhone 6_. Further testing revealed that this seemed to happen only for the first launch of the app and only on the iPhone 5s, 6 and 6 plus.

The culprit was this check which was failing:

		if (self.lengthRange.location != NSNotFound) {
			// Do the validation
			...
		} else {
			valid = (input != nil);
		}


## But why?

If you dig a little, you can see how `NSNotFound` is defined:

	enum {NSNotFound = NSIntegerMax};

`NSIntegerMax` itself is defined as:

	#define NSIntegerMax    LONG_MAX

On 64 bit systems, its value is `9223372036854775807` and it is `2147483647` on the 32 bit systems (you can log this on iPhone 5 and 6 simulators to confirm).

If you remember, we are shipping pre-archived field validation rules with the app. These validation rules were archived on a 32 bit system (iPhone 5 simulator) and added to the app. So ranges which had `NSNotFound` in them were saved as `{2147483647, <length>}`. On 64 bit systems, our check failed as it reached this line:

	if (self.lengthRange.location != NSNotFound) {
	// This translates to if (2147483647 != 9223372036854775807) {
	// Which is always true

This only happened on the first launch where the app used the bundled validation rules. These were re-fetched from the server and archived again, resulting in the _native_ value of `NSNotFound` to be saved. Hence this could never be reproduced on subsequent launches of the app.

## Conclusion

This was a fun bug to squash. Frankly, I never imagined that text validation would behave differently on different architectures. I feel like I have now unlocked an achievement -- _Write an app which behaves differently on 32/64 bit systems_!
