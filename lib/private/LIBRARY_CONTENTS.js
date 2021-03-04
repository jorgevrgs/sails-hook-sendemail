/**
 * LIBRARY_CONTENTS
 *
 * @type {Dictionary}
 */

module.exports = {
  email: {
    description: 'Send email with different option.',
    methodIdts: [
      'send',
      'send-log',
      'send-mailgun',
      'send-sendgrid',
      'send-smtp',
      // @TODO: include sails.helpers.email.validate()
    ],
  },
};
