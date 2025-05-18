import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/ui/badge';

describe('Badge Component', () => {
  it('renders with default styling', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    const customClass = 'custom-test-class';
    render(<Badge className={customClass}>Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');

    expect(badge).toHaveClass(customClass);
    expect(badge).toHaveClass('inline-flex'); // Still has default classes
  });

  it('passes through additional props', () => {
    const dataTestId = 'test-badge-id';
    render(<Badge data-testid={dataTestId}>Props Badge</Badge>);

    const badge = screen.getByTestId(dataTestId);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Props Badge');
  });
});
