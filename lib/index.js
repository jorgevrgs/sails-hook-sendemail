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
         * Function to validate email address. Define a custom function
         * in /config/email.
         *
         * Sometimes only log info to the console about the email that WOULD have been sent.
         * Specifically, if the "To" email address is anything "@ example.com".
         *
         * > This is used below when determining whether to actually send the email,
         * > for convenience during development, but also for safety.  (For example,
         * > a special-cased version of "user@ example.com" is used by Trend Micro Mars
         * > scanner to "check apks for malware".)
         *
         * @example isValidEmail: 'check-email-address'
         * Use a helper to invoke as sails.helpers.checkEmailAddress(emailAddress)
         * By default 'email.isValidEmailAddress' call sails.helpers.email.isValidEmailAddress()
         *
         * @returns boolean true is email address is valid
         */
        validateEmailHelper: 'email.isValidEmailAddress',

        // @TODO: include the option to use an external helper
        // adapter: 'external',
        // externalSendEmailHelper: 'send-email', // sails.helpers.sendEmail()

        // Originally in sails.config.custom but moved for convenience
        fromEmailAddress: 'noreply@example.com',
        fromName: 'The NEW_APP_NAME Team',

        /**
         * @var adapter To define the service to use
         * @example: 'mailgun'
         * @example: 'sendgrid'
         * @example: 'smtp'
         * @example: 'log'
         */
        adapter: 'log',

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
         *
         * SMTP
         * @see https://www.npmjs.com/package/html-to-text
         * @example {
         *  tags: {
         *    'a': { options: { baseUrl: 'https://example.com' } },
         *    'figure': { format: 'block' }
         *  }
         * }
         */
        settings: {},

        /**
         * @var transport To use with `nodemailer` constructor
         *
         * @example {
         *   host: "smtp.ethereal.email",
         *   port: 587,
         *   secure: false, // true for 465, false for other ports
         *   auth: {
         *     user: testAccount.user, // generated ethereal user
         *     pass: testAccount.pass, // generated ethereal password
         *   },
         * }
         */
        transport: {},
      },
    },

    configure() {
      if (
        _.includes(['production', 'staging'], sails.environment) &&
        sails.config.email.adapter === 'log'
      ) {
        sails.log.warn(
          "You won't process emails because your adapter is set to log"
        );
      }

      if (
        _.includes(['production', 'staging'], sails.environment) &&
        (sails.config.email.fromName === 'The NEW_APP_NAME Team' ||
          sails.config.email.fromEmailAddress === 'noreply@example.com')
      ) {
        sails.log.warn(
          'Configure `fromName` and `fromEmailAddress` in sails.config.emails to use in production'
        );
      }
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

      if (!_.isString(sails.config.email.validateEmailHelper)) {
        return done(
          new Error(
            `Canno use "sails.config.email.isValidEmail" with value different of string.\n
            Define the value as "email.is-valid-email-address" to use "sails.helpers.email.isValidEmailAddress".`
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
