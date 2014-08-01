'use strict';

var audio = new Audio();

function audioSupportLevel(subtype, codecs) {
  var opts;
  if (typeof subtype === 'object') {
    opts = subtype;
    
    if (opts.subtype === undefined) {
      throw new TypeError('subtype property is required.');
    }
    if (typeof opts.subtype !== 'string') {
      throw new TypeError('subtype should be a string.');
    }
  } else if (typeof subtype === 'string') {
    opts = {
      subtype: subtype,
      codecs: codecs
    };
  } else {
    throw new TypeError('The first argument should be a string or object.');
  }

  if (opts.codecs && typeof opts.codecs !== 'string') {
    throw new TypeError('codecs should be a string.');
  }

  var mimeType = 'audio/' + opts.subtype;
  if (opts.codecs) {
    mimeType += '; codecs="' + opts.codecs + '"';
  }
  return canPlayTypeToNumber(audio.canPlayType(mimeType));
}
