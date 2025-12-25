import { it, expect, describe } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import CounterPopup from '@/components/CounterPopup.tsx';

// These tests run in a real browser, so we can use the browser API to test the component.
describe('CounterPopup component', () => {
  it('should have a title of "Counter Popup Example"', async () => {
    const screen = await render(<CounterPopup />);
    const heading = await screen.getByTestId('page-title');
    expect(heading).toHaveTextContent('Counter Popup Example');
  });

  it('should increment the count when clicked', async () => {
    const screen = await render(<CounterPopup />);
    const counterText = await screen.getByTestId('counter-text');
    await expect.element(counterText).toHaveTextContent('count is 0');
    await screen.getByRole('button', { name: 'Increment counter' }).click();
    await expect.element(counterText).toHaveTextContent('count is 1');
  });

  describe('Using page.render() instead of render()', () => {
    it('should have a title of "Counter Popup Example"', async () => {
      const screen = await page.render(<CounterPopup />);
      const heading = await screen.getByTestId('page-title');
      expect(heading).toHaveTextContent('Counter Popup Example');
    });
  });
});
