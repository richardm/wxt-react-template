import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
// I currently prefer to explicitly import dependencies, but by default, they are auto-imported via .wxt/types/imports-modules.d.ts
// Note that while auto-importing works with unit tests, it does not appear to work with browser tests.
// import CounterPopup from '@/components/CounterPopup.tsx';

describe('CounterPopup component', () => {
  it('should have a title of "Counter Popup Example"', async () => {
    render(<CounterPopup />);
    const heading = screen.getByTestId('page-title');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Counter Popup Example');
  });
});

let testName = 'validate eslint config';

describe(testName, () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
});
