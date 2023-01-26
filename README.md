# yomtor

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/yomtor.svg)](https://www.npmjs.com/package/yomtor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
yarn add yomtor
```

## Usage

```tsx
import React, { Component } from 'react'

import {
    AligmentProperties,
    Canvas,
    Properties,
    RectProperties,
    Yomtor,
    Zoom,
    Color,
    YomtorRectangle,
    FabricContext
} from 'yomtor'

class Example extends Component {
  render() (
      <Yomtor settings={settings}>
        <Properties>
            <AligmentProperties></AligmentProperties>
            <RectProperties></RectProperties>
        </Properties>

        <Toolbar>
            <ButtonTest></ButtonTest>
        </Toolbar>
        <Canvas>
            <Zoom></Zoom>
        </Canvas>
      </Yomtor>
  )
}
```

## Development

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the example/ create-react-app that's linked to the local version of your module.

```js
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in src/ or to the example app's example/src, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

## License

MIT © [Yomyer](https://github.com/Yomyer)


## Develop:
### Compiling

If you don't have a supported OS or processor architecture, or you use `--build-from-source`, the module will be compiled on your system. This requires several dependencies, including Cairo and Pango.

For detailed installation information, see the [wiki](https://github.com/Automattic/node-canvas/wiki/_pages). One-line installation instructions for common OSes are below. Note that libgif/giflib, librsvg and libjpeg are optional and only required if you need GIF, SVG and JPEG support, respectively. Cairo v1.10.0 or later is required.

OS | Command
----- | -----
OS X | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo pango png jpeg giflib`
Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki)

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072).
If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

**Note** If you are still experiencing issues with the installation, try doing it with Node 14, sometimes Node 16 fails because of the Cairo and Pango packages.

```bash
nvm install 14
nvm use 14
yarn install
```