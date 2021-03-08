module.exports = {
  friendlyName: 'Get Helper',

  description: 'Get the helper to validate email address',

  sync: true,

  inputs: {
    helperName: {
      type: 'string',
      required: true,
      example: 'email.isValidEmailAddress',
    },
  },

  exits: {
    success: {
      description: 'Helper function returned',
    },
  },

  fn: function ({ helperName }) {
    try {
      const helperArray = helperName.split('.');
      let helperHandler = sails.helpers;

      for (let h in helperArray) {
        helperHandler = helperHandler[_.camelCase(helperArray[h])];
      }

      if (_.isFunction(helperHandler)) {
        return helperHandler;
      }
    } catch (unusedError) {
      return false;
    }
  },
};
