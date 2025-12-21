import { test, expect } from './fixtures.ts';
import { openPopup } from './pages/popup.ts';

test('Popup counter should be 0 initially', async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);
  expect(await popup.getCounterTextValue()).toEqual('count is 0');
});

test('Popup counter increments when clicked', async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);
  expect(await popup.getCounterTextValue()).toEqual('count is 0');

  await popup.clickCounter();
  expect(await popup.getCounterTextValue()).toEqual('count is 1');

  await popup.clickCounter();
  expect(await popup.getCounterTextValue()).toEqual('count is 2');
});
