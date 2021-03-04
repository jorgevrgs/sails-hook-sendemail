module.exports = {
  friendlyName: 'Send with SMTP',

  description: 'Send html email message with SMTP',

  inputs: Object.assign({}, require('../PARAMETERS')),

  exits: {
    success: {
      description: 'Email sent successfully with SMTP',
    },

    error: {
      description:
        'There is missing `sails.config.email.transport` configuration',
    },
  },

  fn: function (
    { fromName, from, to, toName, subject, html, bcc, attachments },
    exits
  ) {
    if (_.isEmpty(sails.config.email.transport)) {
      return exits.error();
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(
      sails.config.email.transport
    );

    const messageData = {
      from: fromName ? `${fromName} <${from}>` : from,
      to: toName ? `${toName} <${to}>` : to,
      bcc,
      subject,
      html,
      attachments,
    };

    return exits.success(transporter.sendMail(messageData));
  },
};
