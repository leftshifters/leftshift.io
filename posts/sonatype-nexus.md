I was struggling with [Sonatype Nexus][nexus] since a week. There was three failed attempt to deploy it. Here's how I finally got it to work

- Step #1 Installed [HomeBrew for Linux][brew].
- Step #2 Installed Sonatype Nexus using `brew install nexus`
- Step #3 It was ready to go.

#####Changes in Android's gradle file

The top-level build file is configured, by default, as-

    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        repositories {
            mavenCentral()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:0.12.+'

            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            mavenCentral()
        }
    }

In more recent version of Android Studio, it will be as-

    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        repositories {
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:0.12.+'

            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            jcenter()
        }
    }

Android Studio has now shifted to [Bintray's jCenter][jcenter] from [Maven Central][mavencentral]. Anyways, irrespective of this, if you want to proxy Maven Central and have a local repository manager, you just need to replace the configuration as-

    // Top-level build file where you can add configuration options common to all sub-projects/modules.

    buildscript {
        repositories {
            maven {
                url 'https://<deployment-address>/content/repositories/central/'
            }
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:0.12.+'

            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
        }
    }

    allprojects {
        repositories {
            maven {
                url 'https://<deployment-address>/content/repositories/central/'
            }
        }
    }

Obviously, the url will depend on your server's IP address and configurations.

[brew]: http://brew.sh/linuxbrew/
[nexus]: http://www.sonatype.org/nexus/
[jcenter]: https://bintray.com/bintray/jcenter
[mavencentral]: http://search.maven.org/
