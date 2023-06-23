import { act, fireEvent, render, screen } from '@testing-library/react';

// helpers
import { TestWrapper } from '../../helpers/test-wrapper';

import NumberField from './number';
import type { Props } from './number';

type TestProps = Omit<Props, 'label' | 'name' | 'value' | 'onChange'> & {
  value?: number;
  onChange?: (newValue: number) => void;
};

const arrangeTest = (props: TestProps) =>
  render(
    <TestWrapper>
      <NumberField
        {...props}
        label="field label"
        name="number-input"
        value={props.value || 1}
        onChange={props.onChange || vi.fn()}
      />
    </TestWrapper>
  );

describe('Number Field', () => {
  it('renders the label', () => {
    arrangeTest({});

    expect(screen.getByTestId('number-field-label')).toHaveTextContent('field label');
  });

  describe('when the maximum value is greater than 1', () => {
    it('renders a max button', () => {
      arrangeTest({ maximum: 2 });

      expect(screen.getByTestId('number-field-max')).toBeInTheDocument();
    });

    it('sets the maximum value when the max button is clicked', () => {
      const maximum = 3;
      const onChangeMock = vi.fn();
      arrangeTest({ maximum, onChange: onChangeMock });

      act(() => fireEvent.click(screen.getByTestId('number-field-max')));

      expect(onChangeMock).toHaveBeenCalledWith(maximum);
    });
  });

  describe('when the current value is equal to the minimum value', () => {
    it('disables the decrease button', () => {
      arrangeTest({ value: 1, minimum: 1 });

      expect(screen.getByTestId('number-field-decrease')).toBeDisabled();
    });
  });

  describe('when the decrease button is clicked', () => {
    describe('and a step value is present', () => {
      it('subtracts the step value from the current value', () => {
        const step = 5;
        const value = 10;
        const onChangeMock = vi.fn();
        arrangeTest({ step, value, onChange: onChangeMock });

        act(() => fireEvent.click(screen.getByTestId('number-field-decrease')));

        const expectedValue = value - step;
        expect(onChangeMock).toHaveBeenCalledWith(expectedValue);
      });
    });

    it('fires the onChange event', () => {
      const onChangeMock = vi.fn();
      arrangeTest({ onChange: onChangeMock });

      act(() => fireEvent.click(screen.getByTestId('number-field-decrease')));

      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe('when the current value is equal to the maximum value', () => {
    it('disables the increase button', () => {
      arrangeTest({ value: 1, maximum: 1 });

      expect(screen.getByTestId('number-field-increase')).toBeDisabled();
    });
  });

  describe('when the increase button is clicked', () => {
    describe('and a step value is present', () => {
      it('adds the step value to the current value', () => {
        const step = 5;
        const value = 10;
        const onChangeMock = vi.fn();
        arrangeTest({ step, value, onChange: onChangeMock });

        act(() => fireEvent.click(screen.getByTestId('number-field-increase')));

        const expectedValue = value + step;
        expect(onChangeMock).toHaveBeenCalledWith(expectedValue);
      });
    });

    it('fires the onChange event', () => {
      const onChangeMock = vi.fn();
      arrangeTest({ onChange: onChangeMock });

      act(() => fireEvent.click(screen.getByTestId('number-field-increase')));

      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
