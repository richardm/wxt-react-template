import { Page } from '@playwright/test';

export async function openPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  // use getByTestId helper to wait for the counter button
  await page.getByTestId('counter');

  const popup = {
    getIncrementCounterButton: () => page.getByRole('button', { name: 'Increment counter' }),
    getCounterText: () => page.getByTestId('counter-text'),
    clickCounter: async () => {
      const counter = await popup.getIncrementCounterButton();
      await counter.click();
    },
    getCounterTextValue: async () => {
      const counter = await popup.getCounterText();
      return await counter.evaluate((el) => el.textContent);
    },
  };
  return popup;
}
