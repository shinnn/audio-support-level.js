# audio-support-level.js

[![Bower version](https://badge.fury.io/bo/audio-support-level.svg)](http://badge.fury.io/bo/audio-support-level)
[![NPM version](https://badge.fury.io/js/audio-support-level.svg)](http://badge.fury.io/js/audio-support-level)
[![Build Status](https://travis-ci.org/shinnn/audio-support-level.js.svg?branch=master)](https://travis-ci.org/shinnn/audio-support-level.js)
[![Dependency Status](https://david-dm.org/shinnn/audio-support-level.js.svg)](https://david-dm.org/shinnn/audio-support-level.js)
[![devDependency Status](https://david-dm.org/shinnn/audio-support-level.js/dev-status.svg)](https://david-dm.org/shinnn/audio-support-level.js#info=devDependencies)

A client-side library to check if the given audio format is supported on the browser. It returns the [compatibility](http://wiki.whatwg.org/wiki/Video_type_parameters#Browser_Support) level as a number (0 - 2).

```javascript
// On Google Chrome

audioSupportLevel('aiff'); //=> 0
audioSupportLevel('mp4'); //=> 1
audioSupportLevel('mp4', 'mp4a.40.5'); //=> 2
audioSupportLevel({subtype: 'mp4', codecs: 'mp4a.40.5'}); //=> 2
```

## Installation

### Install with package manager

#### [npm](https://www.npmjs.org/)

```
npm i --save audio-support-level
```

#### [Bower](http://bower.io/)

```
bower i --save audio-support-level
```

#### [Component](https://github.com/component/component)

```
component install shinnn/audio-support-level.js
```

### Install manually

[Download the script file directly](https://raw.githubusercontent.com/shinnn/audio-support-level.js/master/dist/audio-support-level.js "view raw") and install the dependency.

#### Dependency

* [can-play-type-to-number][canplaytypetonumber]

### [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) support

This repository includes [the AMD-friendly build](https://raw.githubusercontent.com/shinnn/audio-support-level.js/master/dist/audio-support-level-amd.js) but the package managers doesn't include it. If you want to use it, download it and [its dependency](https://raw.githubusercontent.com/shinnn/can-play-type-to-number/master/dist/can-play-type-to-number-amd.js) directly.


## API

### audioSupportLevel(*subtype* [, *codecs*])

*subtype*: `String` (e.g. `'ogg'`, `'mp3'`)  
*codecs*: `String` (e.g. `'vorbis'`, `'mp4a.40.5'`)  
Return: `Number` (`0` - `2`)

It evaluates [`.canPlayType()`](http://msdn.microsoft.com/library/ie/ff975191) of an [audio element](http://www.w3.org/wiki/HTML/Elements/audio), passing a MIME Type with the given subtype and codecs. Then it returns a number (`0` - `2`) according to [the API](https://github.com/shinnn/can-play-type-to-number#api) of [can-play-type-to-number][canplaytypetonumber].

```javascript
// On Google Chrome

audioSupportLevel('ogg'); //=> 1
audioSupportLevel('ogg', 'vorbis'); //=> 2
```

### audioSupportLevel(*options*)

*options*: `Object`  
Return: `Number` (`0` - `2`)

Instead of `String`, it can take an `Object` with `subtype` property (required) and `codecs` property (optional).

```javascript
// On Google Chrome

audioSupportLevel({subtype: 'ogg'}); //=> 1
audioSupportLevel({subtype: 'ogg', codecs: 'vorbis'}); //=> 2
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT LIcense](./LICENSE).

[canplaytypetonumber]: https://github.com/shinnn/can-play-type-to-number
