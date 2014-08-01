/* global audioSupportLevel, casper, fs */

'use strict';

casper.test.begin('audioSupportLevel()', 8, test => {
  casper.start(fs.workingDirectory + '/tmp/test.html', () => {
    test.assertEvalEquals(
      () => typeof audioSupportLevel,
      'function',
      'should be a function.'
    );

    test.assertEvalEquals(
      () => audioSupportLevel('wav'),
      1,
      'should return a number.'
    );

    test.assertEvalEquals(
      () => audioSupportLevel('ogg', 'vorbis'),
      2,
      'should accept the second argument.'
    );

    test.assertEvalEquals(
      () => audioSupportLevel({subtype: 'ogg', codecs: 'vorbis'}),
      2,
      'should accept an object.'
    );

    test.assertRaises(
      () => audioSupportLevel(true),
      null,
      'should throw an error when the first argument is not a string or object.'
    );

    test.assertRaises(
      () => audioSupportLevel({codecs: 'vorbis'}),
      null,
      'should throw an error when the argument is an object but doesn\'t have subtype property.'
    );

    test.assertRaises(
      () => audioSupportLevel({subtype: true, codecs: 'vorbis'}),
      null,
      'should throw an error when the argument is an object but subtype property is not a string.'
    );

    test.assertRaises(
      () => audioSupportLevel('ogg', 123),
      null,
      'should throw an error when the second argument is not a string.'
    );

  }).run(() => test.done());
});
