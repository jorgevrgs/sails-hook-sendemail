module.exports = {
  friendlyName: 'Get Helper',

  description: 'Get the helper to validate email address',

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

    notFound: {
      description: 'Helper not found',
    },
  },

  fn: function ({ helperName }, exits) {
    try {
      const helperArray = helperName.split('.');
      let helperHandler = sails.helpers;

      for (let h in helperArray) {
        helperHandler = helperHandler[_.camelCase(helperArray[h])];
      }

      if (_.isFunction(helperHandler)) {
        return exits.success(helperHandler);
      }
    } catch (unusedError) {
      return exits.notFound();
    }
  },
};
