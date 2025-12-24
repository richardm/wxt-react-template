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
    expect.element(counterText).toHaveTextContent('count is 0');
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

  describe('examples of bad eslint rules - to see if eslint works', () => {
    it('checkbox false positives', async () => {
      const { getByRole } = await render(<input type="checkbox" che />);
      const element = getByRole('checkbox');
      expect(element).toHaveProperty('checked'); // passes
    });

    it('checkbox false positives', async () => {
      const { getByRole } = await render(<input type="checkbox" />);
      const element = getByRole('checkbox');
      expect(element).toHaveProperty('checked'); // also passes 😱
    });

    it('should fail', async () => {
      const screen = await render(<CounterPopup />);
      const heading = await screen.getByTestId('page-title');

      expect(screen.getByTestId('page-title')).toHaveLength(1);
      expect(await screen.queryByText('foo')).toHaveLength(1);
      expect(await screen.queryByText('foo')).toHaveLength(0);
      expect(await screen.queryByText('foo')).toBeNull();
      expect(await screen.queryByText('foo')).not.toBeNull();
      expect(await screen.queryByText('foo')).toBe(null);
      expect(await screen.queryByText('foo')).not.toBe(null);
      expect(await screen.queryByText('foo')).toEqual(null);
      expect(await screen.queryByText('foo')).not.toEqual(null);
      expect(await screen.queryByText('foo')).toBeDefined();
      expect(await screen.queryByText('foo')).not.toBeDefined();
      expect(await screen.queryByText('foo')).toBeTruthy();
      expect(await screen.queryByText('foo')).not.toBeTruthy();
      expect(await screen.queryByText('foo')).toBeFalsy();
      expect(await screen.queryByText('foo')).not.toBeFalsy();
    });
  });
});
