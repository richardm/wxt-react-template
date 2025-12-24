import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/entrypoints/popup/App.tsx';

describe('App', () => {
  it('renders the CounterPopup page title', () => {
    render(<App />);
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});
