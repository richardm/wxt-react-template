import { test, expect } from './fixtures.ts';
import { BrowserContext, Page } from '@playwright/test';

export async function givenUserIsLoggedIn() {
  await test.step('Given the user is logged in', async () => {
    // seed storage / token
  });
}

export async function givenUserIsLoggedOut() {
  await test.step('Given the user is logged in', async () => {
    // clear storage / token
  });
}

export async function whenUserOpensPopup(context: BrowserContext, extensionId: string) {
  return await test.step('When the user opens the extension popup', async () => {
    const popupUrl = `chrome-extension://${extensionId}/popup.html`;
    await test.info().attach('popup-url', { body: popupUrl });

    const popupPage = await context.newPage();
    await popupPage.goto(`chrome-extension://${extensionId}/popup.html`);

    return popupPage;
  });
}

export async function thenResultsAreShown(page: Page) {
  await test.step('Then analysis results are shown', async () => {
    await expect(page.locator('[data-testid="counter-text"]')).toBeVisible();
  });
}
