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
      'get-helper',
      'get-helper-sync',
      'is-valid-email-address',
    ],
  },
};
