import { act, render, screen, fireEvent } from '@testing-library/react';

// helpers
import { TestWrapper } from '../../helpers/test';

import Card from '.';
import type { Props } from '.';

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Card
        {...props}
        testIds={{
          title: 'card-title',
          copyButton: 'card-copy-button',
          deleteButton: 'card-delete-button'
        }}
      >
        Card content
      </Card>
    </TestWrapper>
  );

describe('Card', () => {
  describe('when title is present', () => {
    it('renders the title', () => {
      arrangeTest({ title: 'This is a title' });

      expect(screen.getByTestId('card-title')).toHaveTextContent('This is a title');
    });
  });

  describe('when onCopyClick is present', () => {
    it('renders the copy button', () => {
      arrangeTest({ onCopyClick: vi.fn() });

      expect(screen.getByTestId('card-copy-button')).toBeInTheDocument();
    });

    it('triggers onCopyClick when the button is clicked', () => {
      const onCopyClickMock = vi.fn();
      arrangeTest({ onCopyClick: onCopyClickMock });

      act(() => fireEvent.click(screen.getByTestId('card-copy-button')));

      expect(onCopyClickMock).toHaveBeenCalled();
    });
  });

  describe('when onDeleteClick is present', () => {
    it('renders the delete button', () => {
      arrangeTest({ onDeleteClick: vi.fn() });

      expect(screen.getByTestId('card-delete-button')).toBeInTheDocument();
    });

    it('triggers onCopyClick when the button is clicked', () => {
      const onDeleteClickMock = vi.fn();
      arrangeTest({ onDeleteClick: onDeleteClickMock });

      act(() => fireEvent.click(screen.getByTestId('card-delete-button')));

      expect(onDeleteClickMock).toHaveBeenCalled();
    });
  });
});
