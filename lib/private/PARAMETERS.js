module.exports = {
  fromName: {
    type: 'string',
  },
  from: {
    type: 'string',
    isEmail: true,
    required: true,
  },
  toName: {
    type: 'string',
  },
  to: {
    type: 'string',
    isEmail: true,
    required: true,
  },
  bcc: {
    type: 'json',
    example: ['john.doe@example.com', 'jane.doe@example.com'],
  },
  subject: {
    type: 'string',
    required: true,
  },
  html: {
    type: 'string',
    required: true,
  },
  attachments: {
    type: 'ref',
    example: [
      {
        contentBytes: 'iVBORw0KGgoAA…',
        name: 'sails.png',
        type: 'image/png',
      },
    ],
  },
};
