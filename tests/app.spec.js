import { strict as assert } from 'assert';
import electronPath         from 'electron';
import { Application }      from 'spectron';

const app = new Application({
  path        : electronPath,
  requireName : 'electronRequire',
  args        : ['.'],
});

app
  .start()
  .then(async () => {
    const isVisible = app.browserWindow.isVisible();
    assert.ok(isVisible, 'Main window not visible');
  })

  .then(async () => {
    const isDevtoolsOpen = app.webContents.isDevToolsOpened();
    assert.ok(!isDevtoolsOpen, 'DevTools opened');
  })

  .then(async () => {
    // Get the window content
    const content = await app.client.$('#app');
    assert.notStrictEqual(
      await content.getHTML(),
      '<div id="app"></div>',
      'Window content is empty',
    );
  })

  .then(() => {
    if (app?.isRunning())  return app.stop();
    return undefined;
  })

  .then(() => process.exit(0))

  .catch((error) => {
    console.error(error);
    if (app?.isRunning()) void app.stop();

    process.exit(1);
  });
