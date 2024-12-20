# Yamg scaffolding

- Create a new Nx workspace with ZoneLess Angular v19 application
```sh
npx create-nx-workspace@latest        
cd yamg
nx add @nx/angular
nx g @nx/angular:application --directory=apps/yamg --name=yamg --e2eTestRunner=none --minimal=true --prefix=yamg --setParserOptionsProject=true --skipTests=true --ssr=true --style=scss --unitTestRunner=none --no-interactive
```

- Add Tauri
```sh
  tauri init
  tauri dev
  export ANDROID_HOME=~/opt/Android/Sdk/
  export NDK_HOME=~/opt/Android/Sdk/ndk/28.0.12674087/
  tauri android init  
  tauri android dev  --open
``` 


https://dev.to/davidihl/how-to-create-a-responsive-sidebar-and-mini-navigation-with-material-angular-o5l

https://developer.okta.com/blog/2020/01/21/angular-material-login

