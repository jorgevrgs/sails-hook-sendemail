/**
 * Dependencies
 */
const _ = require('@sailshq/lodash');
const DRY_PACKS_BY_SLUG = require('../accessible/dry');

/**
 * sails-hook-sendemail
 *
 * @see https://github.com/sailshq/sails-hook-organics
 */

/**
 * sails.helpers.email[action]
 *
 * @param  {SailsApp} sails
 * @return {Dictionary} [hook definition]
 */
module.exports = function (sails) {
  return {
    /**
     * defaults
     *
     * The implicit configuration defaults merged into `sails.config` by this hook.
     *
     * @type {Dictionary}
     */
    defaults: {
      email: {
        /**
         * @var adapter To define the service to use
         * @example: 'mailgun'
         * @example: 'sendgrid'
         * @example: 'smtp'
         * @example: 'console'
         */
        adapter: 'console',

        /**
         * @var settings To use with API services
         *
         * Sendgrid
         * @example {
         *  secret: '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'
         * }
         *
         * Mailgun
         * @example {
         *  secret: 'key-3432afa32e9401482aba183c13f3',
         *  domain: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
         *  host: 'api.mailgun.net'
         * }
         */
        settings: {},

        /**
         * @var transport To use with nodemailer constructor
         */
        transport: {},
        // transport: {
        //   host: "smtp.ethereal.email",
        //   port: 587,
        //   secure: false, // true for 465, false for other ports
        //   auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass, // generated ethereal password
        //   },
        // },
      },
    },

    initialize: function (done) {
      if (!sails.hooks.helpers) {
        return done(
          new Error(
            'Cannot load sails-hook-sendemail without enabling the "helpers" hook!'
          )
        );
      }

      if (
        sails.config.adapter === 'smtp' &&
        _.isEmpty('sails.config.transport')
      ) {
        return done(
          new Error(
            'Cannot use `sails.config.email.adapter="smtp"` without `sails.config.email.transport`'
          )
        );
      }

      if (
        _.includes(['sendgrid', 'mailgun'], sails.config.email.adapter) &&
        _.isEmpty('sails.config.email.settings')
      ) {
        return done(
          new Error(
            'Cannot use `sails.config.email.adapter` without `sails.config.email.settings`'
          )
        );
      }

      sails.after('hook:helpers:loaded', function () {
        try {
          _.each(DRY_PACKS_BY_SLUG, (dryPack, slug) => {
            if (!sails.helpers[slug]) {
              sails.hooks.helpers.furnishPack(slug, dryPack);
              return;
            } else {
              _.each(dryPack.defs, (def, identity) => {
                sails.hooks.helpers.furnishHelper(slug + '.' + identity, def);
              }); //∞
            } //ﬁ
          }); //∞
          /////////////////////////////////////////////////////////
        } catch (error) {
          return done(error);
        }

        return done();
      });
    },
  };
};