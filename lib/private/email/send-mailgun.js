module.exports = {
  friendlyName: 'Send with Mailgun',

  description: 'Send html email message with Mailgun',

  inputs: Object.assign({}, require('../PARAMETERS')),

  exits: {
    success: {
      description: 'Email sent successfully with Mailgun',
    },

    error: {
      description:
        'There is missing `sails.config.email.settings` configuration',
    },
  },

  fn: function ({ fromName, from, to, toName, subject, html }, exits) {
    if (
      _.isEmpty(sails.config.email.settings) ||
      !sails.config.email.settings.secret ||
      !sails.config.email.settings.domain ||
      !sails.config.email.settings.host
    ) {
      return exits.error();
    }

    const messageData = {
      htmlMessage: html,
      to,
      toName,
      bcc,
      subject,
      from,
      fromName,
      ...sails.config.email.settings,
    };

    return exits.success(sails.helpers.mailgun.sendHtmlEmail.with(messageData));
  },
};
