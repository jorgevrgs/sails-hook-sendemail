module.exports = {
  inputs: Object.assign({}, require('../PARAMETERS')),

  exits: {
    success: {
      description: 'Email registered in console',
    },
  },

  fn: function ({ fromName, from, to, toName, subject, html }) {
    sails.log(
      `Skipped sending email, either because the "To" email address ended in "@example.com"\n
        or because the current 'sails.config.environment' is set to "test".\n
        \n
        But anyway, here is what WOULD have been sent:\n
        -=-=-=-=-=-=-=-=-=-=-=-=-= Email log =-=-=-=-=-=-=-=-=-=-=-=-=-\n
        From: ${fromName} <${from}>
        To: ${toName} <${to}>\n
        Subject: ${subject}\n
        \n
        Body:\n
        ${html}
        \n
        -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`
    );
  },
};
