# sails-hook-sendemail

Helper to send emails for Sails v1

## How to use

Use the sails-hook-organics features with some extra features:

```js
await sails.helpers.email.send.with({
  from,
  to,
  subject,
  template: 'email-contact',
});
```

## Configuration

Default configuration settings:

```js
// config/email.js
module.exports.email = {
  adapter: 'log' // 'sendgrid', 'mailgun', 'smtp', 'log'
  validateEmailHelper: 'email.isValidEmailAddress',
  settings: {} // Sendgrid and Mailgun settings, SMTP 'nodemailer-html-to-text' options
  transport: {} // SMTP transport
}
```

## Validate Email Helper

```js
// /config/email.js

module.exports.email = {
  validateEmailHelper: 'my-custom-validation',
};
```

This configuration uses `sails.helpers.myCustomValidation(emailAddres)` helper with the `emailAddress` as input.

Example:

Run:

```
npm install validator
```

If you haven't installed `sails` run:

```
npm install -g sails
```

Then create a helper:

```
sails generate helper my-custom-validation
```

Edit the content to include:

```js
// api/helpers/my-custom-vadilation.js

module.exports = {
  inputs: {
    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true
    }
  }
  fn: function({ emailAddress }) {
    const { isEmail } = require('validator');

    return isEmail(emailAddress);
  }
};
```

## Adapters

### Log

```js
// /config/email.js

module.exports.email = {
  adapter: 'log',
};
```

### Sendgrid

```js
// /config/email.js

module.exports.email = {
  adapter: 'sendgrid',
  settings: {
    secret:
      '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',
  },
};
```

### Mailgun

```js
// /config/email.js

module.exports.email = {
  adapter: 'mailgun',
  settings: {
    secret: 'key-3432afa32e9401482aba183c13f3',
    domain: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
    host: 'api.mailgun.net',
  },
};
```

### SMTP

```js
// /config/email.js

module.exports.email = {
  adapter: 'smtp',
  transport: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '16a872f2020cdc',
      pass: 'a2143465713ac5',
    },
  },
};
```
