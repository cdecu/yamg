# Yet Another Memory Game


## Build with [Ionic](http://ionicframework.com/docs/)
```bash
$ sudo npm install -g ionic cordova
$ git clone
$ cd yamg
$ npm install 
$ ionic serve
```
Then build wanted platform

```bash
$ ionic cordova build android --release
$ 
```

## Build to learn ionic, angular, rxjs, ...
+ Test flex layout
+ Test ng animations
#### Must read
+ http://jvandemo.com/how-to-build-minesweeper-using-angular-2-and-immutable-js/
+ https://github.com/shlomiassaf/ng2-chess
+ http://www.angularjs4u.com/angularjs2/angular-2-games/

```bash
$ rm -rf node_modules/ platforms/ www/ package-lock.json yamg.apk
$ export PATH=$PATH:~/opt/Gradle/bin/
$ ionic cordova platform add android
$ ionic cordova build android --release
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore yamg-android-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk yamg
$ zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk  yamg.apk
```


## Build 4 my kids
>

## Ref

+ https://mjn.host.cs.st-andrews.ac.uk/egyptian/unicode/signunicode.xml
+ https://mjn.host.cs.st-andrews.ac.uk/egyptian/fonts/newgardiner.html

