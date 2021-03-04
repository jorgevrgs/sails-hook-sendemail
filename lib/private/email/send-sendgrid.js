module.exports = {
  friendlyName: 'Send with Sendgrid',

  description: 'Send html email message with Sendgrid',

  inputs: Object.assign({}, require('../PARAMETERS')),

  exits: {
    success: {
      description: 'Email sent successfully with Sendgrid',
    },

    error: {
      description:
        'There is missing `sails.config.email.settings.secret` configuration',
    },
  },

  fn: function (
    { fromName, from, to, toName, subject, html, bcc, attachments },
    exits
  ) {
    if (
      _.isEmpty(sails.config.email.settings) ||
      !sails.config.email.settings.secret
    ) {
      return exits.error();
    }

    const messageData = _.extend(
      {
        htmlMessage: html,
        to,
        toName,
        bcc,
        subject,
        from,
        fromName,
        attachments,
      },
      sails.config.email.settings
    );

    return exits.success(
      sails.helpers.sendgrid.sendHtmlEmail.with(messageData)
    );
  },
};
