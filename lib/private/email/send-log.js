module.exports = {
  friendlyName: 'Log an email',

  description: 'Log an email message instead of sending it',

  inputs: Object.assign({}, require('../PARAMETERS')),

  exits: {
    success: {
      description: 'Email registered in console',
    },
  },

  fn: function ({ fromName, from, to, toName, subject, html }) {
    from = fromName ? `${fromName} <${from}>` : from;
    to = toName ? `${toName} <${to}>` : to;

    sails.log(
      `Skipped sending email, either because the "To" email address ended in "@example.com"\n
        or because the current 'sails.config.environment' is set to "test".\n
        \n
        But anyway, here is what WOULD have been sent:\n
        -=-=-=-=-=-=-=-=-=-=-=-=-= Email log =-=-=-=-=-=-=-=-=-=-=-=-=-\n
        From: ${from}
        To: ${to}\n
        Subject: ${subject}\n
        \n
        Body:\n
        ${html}
        \n
        -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`
    );
  },
};
