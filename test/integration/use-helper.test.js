describe('Send with log', function () {
  it('Should call sails.helpers.email.send using log as default', async function () {
    await sails.helpers.email.send.with({
      from: 'admin@example.com',
      to: 'user@example.com',
      subject: 'Testing',
      template: 'email-test',
      templateData: {
        toName: 'John Doe',
      },
      layout: false,
    });

    assert.isTrue(true);
  });

  it('Should be able to use sails.helpers.email.sendLog', async function () {
    await sails.helpers.email.sendLog.with({
      from: 'admin@example.com',
      to: 'user@example.com',
      subject: 'Testing',
      html: '<b>Hello world!</b>',
    });

    assert.isTrue(true);
  });
});
