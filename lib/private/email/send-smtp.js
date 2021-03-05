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
    { fromName, from, to, toName, subject, html, txt, bcc, attachments },
    exits
  ) {
    if (_.isEmpty(sails.config.email.transport)) {
      return exits.error();
    }

    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(
      sails.config.email.transport
    );

    // Transform html to text if txt is not defined
    if (txt === '') {
      const { htmlToText } = require('nodemailer-html-to-text');
      const options = sails.config.email.settings;
      transporter.use('compile', htmlToText(options));
    }

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
