import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('heading', { name: 'basestation' })).toBeTruthy();
  });

  it('should link to sign in', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('link', { name: 'Sign in' })).toBeTruthy();
  });
});
