// Grab the Sails singleton.
// (It'll be exposed as a global momentarily, assuming this app hasn't
// customized away that behavior.)
const sails = require('sails');
const _ = require('@sailshq/lodash');
const request = require('supertest');
const { assert } = require('chai');

// Before running any tests...
before(function (done) {
  this.timeout = 10000;

  try {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        "Test runner is refusing to proceed (for safety's sake, since NODE_ENV=production)"
      );
    } //•

    // Note that we mix in env vars, CLI opts, and the .sailsrc file using
    // the `.getRc()` method, if possible.  But also note that we mix in
    // a few additional overrides to remove clutter from test output, ensure
    // we are working with a clean database, etc.
    let configOverrides = sails.getRc === undefined ? {} : sails.getRc();

    configOverrides = Object.assign({}, configOverrides, {
      appPath: './test/app',
      log: Object.assign({}, configOverrides.log, {
        level: 'info',
      }),
      globals: false,
      hooks: Object.assign({}, configOverrides.hooks, {
        'sails-hook-sendemail': require('../'),
        i18n: false,
        pubsub: false,
        session: false,
        orm: false,
      }),
    });

    // Lift app
    sails.lift(configOverrides, (err) => {
      if (err) {
        return done(err);
      }

      try {
        // Expose a few other globals, for convenience.
        if (global.sails) {
          throw new Error(
            'Test runner cannot expose `sails` -- that global already exists!'
          );
        }

        global.sails = sails;

        if (global._) {
          throw new Error(
            'Test runner cannot expose `_` -- that global already exists!'
          );
        }

        global._ = _;

        if (global.assert) {
          throw new Error(
            'Test runner cannot expose `assert` -- that global already exists!'
          );
        }

        global.assert = assert;

        global.app = request(sails.hooks.http.app);

        return done();
      } catch (err) {
        return done(err);
      }
    }); //_∏_
  } catch (err) {
    return done(err);
  }
});

// Inject global `after` for our Mocha tests.
after((done) => {
  try {
    sails.lower(done);
  } catch (err) {
    return done(err);
  }
});
