![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

# quasar-template-meteor
Quasar Starter Kit for Meteor

(Updated 1st January 2019).

Quasar 0.17.18

#### Meteor 1.8.0.2

This is a resource which will show how to install Quasar inside the Meteor framework, with Vue2 also installed.
First of all, this was forked from **https://github.com/Akryum/meteor-vue2-example-routing**
and then we added Quasar to that. So thankyou to Akryum for making Meteor work with Vue.

Unfortunately, there is a small problem with the meteor package called akryum:vue-router2.
Meteor 1.8 does not play nice with versions above akryum:vue-router2@0.2.0. 
So do not update to 0.2.2 for the moment.

#### We no longer have to transpile Quasar !
With the arrival of **Meteor 1.7**, we just have to put a link to /node-modules/quasar-framework in the /imports folder
and then add some code on the server-side to indicate that we want to ignore legacy browsers
- please see setMinimumBrowserVersions() in /imports/startup/server/index.js

In this way Quasar compiles normally and we no longer get 'unexpected token: export' messages....

See this link for explanations of the changes that enabled this in Meteor 1.7:
https://github.com/meteor/meteor/blob/devel/History.md#v1421

Quasar have split the es6 .js file into two:
- one for 'ios' 
- and one for 'mat' (material design - Android)

This means that if you want to compile for 'ios' instead of 'mat' you will need to change your **import** from:
 '/node_modules/quasar-framework/dist/quasar.mat.common.js'
 to '/node_modules/quasar-framework/dist/quasar.ios.common.js'
 

#### Installation

**clone this repository:**

```
git clone https://github.com/quasarframework/quasar-template-meteor.git
```

**cd into the 'template' folder:**
```
cd quasar-template-meteor/template
```

**Install from npm**

```
meteor npm install
```

**Create a link to quasar-framework in the /imports directory**

```
ln -s ../node_modules/quasar-framework imports

```
(If you are doing this on *Windows* the link command is:
```
mklink /D "imports\quasar-framework" "..\node_modules\quasar-framework\"
```
 - thanks to Noboxulus for working this out)

**Create a link to the quasar-extras .woff files in the /public directory**
This makes the material-icons stuff appear

```
ln -s ../node_modules/quasar-extras/material-icons/web-font public

```
(If you are doing this on *Windows* the link command is:
```
mklink /D "public\web-font" "..\node_modules\quasar-extras\material-icons\web-font"
```
 - thanks to Noboxulus)


**run meteor (still inside the template folder)**

```
meteor
```

It should eventually say:
App running at: http://localhost:3000/

Point your desktop browser to that address.

Then if you open Chrome or Firefox dev tools and click on the mobile phone icon you should see this:
![you should see this](mobile.png)

Please refer to guide.meteor.com/mobile.html for how to launch mobile apps on IOS and Android.

This project uses the Akryum projects to get Meteor working with vuejs and quasar-framework.
The most useful page to consult is:
https://github.com/meteor-vue/vue-meteor-tracker

This is the main page for all the Meteor/Vuejs projects:
https://github.com/meteor-vue/vue-meteor



#### Note:
The 'template' folder is necessary for the *quasar cli* command to function.
All meteor commands however should only be run once you are inside the 'template' folder.
This extra 'template' folder is there because quasar-framework requires it. Quasar-framework uses Webpack for its builds, but Meteor does not.
This means that it is unlikely that you will be able to use *quasar cli*, for example, because it all leads up to a quasar build using webpack.

To use Meteor, just cd into the 'template' folder and run all your usual meteor commands from there.

**Problems:**

Quasar es6 code from v0.15 was split into two: one for ios and one for material design.
There may be a way to switch automatically to the correct .js file according to the platform ...


