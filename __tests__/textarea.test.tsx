import React from 'react';
import { render, screen } from '@testing-library/react';
import { Textarea } from '@/ui/textarea';

describe('Textarea Component', () => {
  it('renders with default styling', () => {
    render(<Textarea placeholder="Test placeholder" />);
    const textarea = screen.getByPlaceholderText('Test placeholder');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('min-h-[80px]');
    expect(textarea).toHaveClass('rounded-md');
    expect(textarea).toHaveClass('resize-vertical');
  });

  it('applies custom className', () => {
    const customClass = 'custom-test-class';
    render(<Textarea className={customClass} placeholder="Custom textarea" />);
    const textarea = screen.getByPlaceholderText('Custom textarea');

    expect(textarea).toHaveClass(customClass);
    expect(textarea).toHaveClass('min-h-[80px]'); // Still has default classes
  });

  it('passes through additional props', () => {
    const dataTestId = 'test-textarea-id';
    render(<Textarea data-testid={dataTestId} defaultValue="Initial content" />);

    const textarea = screen.getByTestId(dataTestId);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial content');
  });
});