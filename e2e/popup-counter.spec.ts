import { test, expect } from './fixtures.ts';
import { givenUserIsLoggedOut, whenUserOpensPopup, thenResultsAreShown } from './given-when-then.ts';
import { openPopup } from './pages/popup.ts';

test('Popup should render the CounterPopup component', async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);
  expect(await popup.getPageTitle()).toBeVisible();
  expect(await popup.getPageTitle()).toHaveText('WXT + React: Counter Popup Example');
});

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

test('Popup title should be "Counter Popup Example"', async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);
  expect(await page.title()).toEqual('Counter Popup Example');
});

test('Given When Then Example', async ({ context, extensionId }) => {
  await givenUserIsLoggedOut();
  const page = await context.newPage();
  await page.goto('https://google.com');

  const popupPage = await whenUserOpensPopup(context, extensionId);

  await thenResultsAreShown(popupPage);
});
