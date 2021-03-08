module.exports = {
  friendlyName: 'Validate an email address',

  description:
    'Default validation function to dermine is an email address is valid to send a message',

  inputs: {
    emailAddress: {
      type: 'string',
      isEmail: true,
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Email is valid',
    },
  },

  fn: function ({ emailAddress }) {
    return !Boolean(emailAddress.match(/@example\.com$/i));
  },
};
