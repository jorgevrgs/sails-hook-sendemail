module.exports = {
  fromName: {
    type: 'string',
    description: 'An override for the default "from" name.',
    example: 'Anne Martin',
  },

  from: {
    type: 'string',
    description:
      'An override for the default "from" email that\'s been configured.',
    example: 'anne.martin@example.com',
    isEmail: true,
    required: true,
  },

  toName: {
    type: 'string',
    description: 'Name of the primary recipient as displayed in their inbox.',
    example: 'Nola Thacher',
  },

  to: {
    type: 'string',
    description: 'The email address of the primary recipient.',
    example: 'nola.thacker@example.com',
    isEmail: true,
    required: true,
  },

  bcc: {
    type: 'json',
    description:
      'The email addresses of recipients secretly copied on the email.',
    example: ['john.doe@example.com', 'jane.doe@example.com'],
  },

  subject: {
    type: 'string',
    required: true,
    description: 'The subject of the email.',
    example: 'Hello there.',
  },

  html: {
    type: 'string',
    description: 'Rendered view or html content',
    example: '<p>Hello, <b>world</b>!</p>',
    required: true,
  },

  text: {
    type: 'string',
    description: 'Plain text message content',
    example: 'Hello, world!',
    defaultsTo: '',
  },

  attachments: {
    type: 'ref',
    description:
      'Attachments to include in the email, with the file content encoded as base64.',
    defaultsTo: [],
    example: [
      {
        contentBytes: 'iVBORw0KGgoAA…',
        name: 'sails.png',
        type: 'image/png',
      },
    ],
  },
};
