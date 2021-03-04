# sails-hook-sendemail - IN DEVELOPMENT NOT FOR PRODUCTION READY

Helper to send emails for Sails v1

## How to use

Use the sails-hook-organics features with some extra features:

```js
sails.helpers.email.send.with({
  from,
  to,
  subject,
  template: 'email-contact',
});
```

### Console

```js
// /config/email.js

module.exports = {
  adapter: 'console',
};
```

### Sendgrid

```js
// /config/email.js

module.exports = {
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

module.exports = {
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

module.exports = {
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
