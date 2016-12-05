'use strict';

module.exports = (()=> {
    let spawn = require("child_process").spawn;
    // if windows
    if (process.platform == 'win32')
        spawn = require('cross-spawn');

    const sharp = require("sharp");
    const fs = require('fs');
    const fsext = require('fs-extra');
    const path = require('path');
    const open = require("open");

    const PLUGIN_ROOT = path.resolve(__dirname);
    const RUN_PATH = path.resolve(PLUGIN_ROOT, 'app');
    const CONFIG_PATH = path.resolve(PLUGIN_ROOT, 'app', 'controller', 'config.json');

    let config = {};
    try {
        config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    } catch (e) {
    }

    let terminal = (cmd, args, opts)=> new Promise((callback)=> {
        const term = spawn(cmd, args, opts);
        term.stdout.pipe(process.stdout);
        term.stderr.pipe(process.stderr);
        process.stdin.pipe(term.stdin);
        term.on('close', () => {
            process.stdin.end();
            callback();
        });
    });

    let plugin = {};

    plugin.install = ()=> new Promise((resolve)=> {
        terminal('cordova', ['create', 'temp'], {cwd: PLUGIN_ROOT}).then(()=> {
            fsext.copySync(path.join(PLUGIN_ROOT, 'temp', 'config.xml'), path.resolve(RUN_PATH, 'controller', 'config.xml'));
            if (!fs.existsSync(path.resolve('controller', 'cordova', 'config.xml')))
                fsext.copySync(path.join(PLUGIN_ROOT, 'temp', 'config.xml'), path.resolve('controller', 'cordova', 'config.xml'));
            fsext.copySync(path.join(PLUGIN_ROOT, 'temp', 'hooks'), path.resolve(RUN_PATH, 'hooks'));
            fsext.copySync(path.join(PLUGIN_ROOT, 'temp', 'platforms'), path.resolve(RUN_PATH, 'platforms'));
            fsext.copySync(path.join(PLUGIN_ROOT, 'temp', 'plugins'), path.resolve(RUN_PATH, 'plugins'));
            fsext.removeSync(path.join(PLUGIN_ROOT, 'temp'));
            resolve();
        });
    });

    plugin.icon = ()=> new Promise((resolve)=> {
        const RES_PATH = path.resolve(RUN_PATH, 'res');
        const ICON_FILE = path.resolve('controller', 'cordova', 'icon.png');
        const ANDROID = path.resolve(RES_PATH, 'android');
        const IOS = path.resolve(RES_PATH, 'ios');

        if (fs.existsSync(path.resolve('controller', 'cordova', 'config.xml')) === false) {
            console.log(`'config.xml' file not exists in controller`);
            return resolve();
        }

        if (fs.existsSync(ICON_FILE) === false) {
            console.log(`'icon.png' file not exists in controller`);
            return resolve();
        }

        if (fs.existsSync(RES_PATH) === false) fs.mkdirSync(RES_PATH);
        if (fs.existsSync(ANDROID) === false) fs.mkdirSync(ANDROID);
        if (fs.existsSync(IOS) === false) fs.mkdirSync(IOS);

        const inputBuffer = fs.readFileSync(ICON_FILE);
        let iconCreator = ()=> new Promise((callback)=> {
            sharp(inputBuffer).resize(36, 36).toBuffer().then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'ldpi.png'), data);
                console.log(`create android icon 'ldpi.png' (36x36)`);
                return sharp(inputBuffer).resize(48, 48).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'mdpi.png'), data);
                console.log(`create android icon 'mdpi.png' (48x48)`);
                return sharp(inputBuffer).resize(72, 72).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'hdpi.png'), data);
                console.log(`create android icon 'hdpi.png' (72x72)`);
                return sharp(inputBuffer).resize(96, 96).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'xhdpi.png'), data);
                console.log(`create android icon 'xhdpi.png' (96x96)`);
                return sharp(inputBuffer).resize(144, 144).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'xxhdpi.png'), data);
                console.log(`create android icon 'xxhdpi.png' (144x144)`);
                return sharp(inputBuffer).resize(192, 192).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(ANDROID, 'xxxhdpi.png'), data);
                console.log(`create android icon 'xxxhdpi.png' (192x192)`);
                return sharp(inputBuffer).resize(180, 180).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-60@3x.png'), data);
                console.log(`create iOS icon 'icon-60@3x.png' (180x180)`);
                return sharp(inputBuffer).resize(60, 60).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-60.png'), data);
                console.log(`create iOS icon 'icon-60.png' (60x60)`);
                return sharp(inputBuffer).resize(120, 120).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-60@2x.png'), data);
                console.log(`create iOS icon 'icon-60@2x.png' (120x120)`);
                return sharp(inputBuffer).resize(76, 76).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-76.png'), data);
                console.log(`create iOS icon 'icon-76.png' (76x76)`);
                return sharp(inputBuffer).resize(152, 152).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-76@2x.png'), data);
                console.log(`create iOS icon 'icon-76@2x.png' (152x152)`);
                return sharp(inputBuffer).resize(40, 40).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-40.png'), data);
                console.log(`create iOS icon 'icon-40.png' (40x40)`);
                return sharp(inputBuffer).resize(80, 80).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-40@2x.png'), data);
                console.log(`create iOS icon 'icon-40@2x.png' (80x80)`);
                return sharp(inputBuffer).resize(57, 57).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon.png'), data);
                console.log(`create iOS icon 'icon.png' (57x57)`);
                return sharp(inputBuffer).resize(114, 114).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon@2x.png'), data);
                console.log(`create iOS icon 'icon@2x.png' (114x114)`);
                return sharp(inputBuffer).resize(72, 72).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-72.png'), data);
                console.log(`create iOS icon 'icon-72.png' (72x72)`);
                return sharp(inputBuffer).resize(144, 144).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-72@2x.png'), data);
                console.log(`create iOS icon 'icon-72@2x.png' (144x144)`);
                return sharp(inputBuffer).resize(29, 29).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-small.png'), data);
                console.log(`create iOS icon 'icon-small.png' (29x29)`);
                return sharp(inputBuffer).resize(58, 58).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-small@2x.png'), data);
                console.log(`create iOS icon 'icon-small@2x.png' (58x58)`);
                return sharp(inputBuffer).resize(50, 50).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-50.png'), data);
                console.log(`create iOS icon 'icon-50.png' (50x50)`);
                return sharp(inputBuffer).resize(100, 100).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-50@2x.png'), data);
                console.log(`create iOS icon 'icon-50@2x.png' (100x100)`);
                return sharp(inputBuffer).resize(167, 167).toBuffer();
            }).then((data)=> {
                fs.writeFileSync(path.resolve(IOS, 'icon-83.5@2x.png'), data);
                console.log(`create iOS icon 'icon-83.5@2x.png' (167x167)`);
                console.log(`icon created in your platform folder`);
                callback();
            });
        });
        iconCreator().then(resolve);
    });

    plugin.plugin = (args)=> new Promise((resolve)=> {
        if (!fs.existsSync(path.resolve('controller', 'cordova', 'config.xml'))) {
            console.log(`'config.xml' file not exists in your controller`);
            return resolve();
        }

        // copy config.xml
        fsext.copySync(path.resolve('controller', 'cordova', 'config.xml'), path.resolve(RUN_PATH, 'config.xml'));

        args.unshift('plugin');
        args.push('--save');

        terminal('cordova', args, {cwd: RUN_PATH})
            .then(()=> {
                fsext.copySync(path.resolve(RUN_PATH, 'config.xml'), path.resolve('controller', 'cordova', 'config.xml'));
                resolve();
            });
    });

    plugin.run = (args)=> new Promise((resolve)=> {
        let platform = args[0];

        if (platform != 'android' && platform != 'ios') {
            console.log(`not supported platform [${platform}]`);
            return resolve();
        }

        if (!fs.existsSync(path.resolve('controller', 'cordova', 'config.xml'))) {
            console.log(`'config.xml' file not exists in your controller`);
            return resolve();
        }

        // copy config.xml
        fsext.copySync(path.resolve('controller', 'cordova', 'config.xml'), path.resolve(RUN_PATH, 'config.xml'));

        terminal('cordova', ['platform', 'remove', platform], {cwd: RUN_PATH})
            .then(()=> terminal('cordova', ['platform', 'add', platform], {cwd: RUN_PATH}))
            .then(()=> terminal('cordova', ['run', platform], {cwd: RUN_PATH}))
            .then(resolve);
    });

    plugin.deploy = (args)=> new Promise((resolve)=> {
        let platform = args[0];

        if (platform != 'android' && platform != 'ios') {
            console.log(`not supported platform [${platform}]`);
            return resolve();
        }

        if (!fs.existsSync(path.resolve('controller', 'cordova', 'config.xml'))) {
            console.log(`'config.xml' file not exists in your controller`);
            return resolve();
        }

        // copy config.xml
        fsext.copySync(path.resolve('controller', 'cordova', 'config.xml'), path.resolve(RUN_PATH, 'config.xml'));

        terminal('cordova', ['platform', 'remove', platform], {cwd: RUN_PATH})
            .then(()=> terminal('cordova', ['platform', 'add', platform], {cwd: RUN_PATH}))
            .then(()=> terminal('cordova', ['build', platform], {cwd: RUN_PATH}))
            .then(resolve);
    });

    return plugin;
})();