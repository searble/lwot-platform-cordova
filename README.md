# LWOT Platform - Ionic

## Install

### Install Dependencies

```bash
npm install -g cordova
```

### Install Platform

```bash
lwot install https://github.com/searble/lwot-platform-cordova.git
```

### How to Use

```bash
lwot build cordova

# plugin add & remove
lwot cordova plugin add cordova-plugin-console cordova-plugin-device
lwot cordova plugin rm cordova-plugin-console cordova-plugin-device

# create icon: this will resize 'controller/icon.png' as each dimension size
lwot cordova icon

# run as ...
lwot cordova run android
lwot cordova run ios

# deploy as ... (now preparing)
lwot cordova deploy android
lwot cordova deploy ios
``` 