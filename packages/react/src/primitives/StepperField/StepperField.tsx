import classNames from 'classnames';

import { useStepper } from './useStepper';
import { FieldDescription, FieldErrorMessage } from '../Field';
import { FieldGroup } from '../FieldGroup';
import { FieldGroupIconButton } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconAdd, IconRemove } from '../Icon';
import { Input } from '../Input';
import { Label } from '../Label';
import { StepperFieldProps } from '../types/stepperField';
import { ComponentClassNames } from '../shared/constants';
import { SharedText } from '../shared/i18n';
import { useStableId } from '../shared/utils';
import { Primitive } from '../types/view';
import { splitPrimitiveProps } from '../shared/styleUtils';

export const DECREASE_ICON = 'decrease-icon';
export const INCREASE_ICON = 'increase-icon';

export const StepperField: Primitive<StepperFieldProps, 'input'> = (props) => {
  const {
    className,
    descriptiveText,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    defaultValue,
    errorMessage,
    hasError = false,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    labelHidden = false,
    onStepChange,
    size,
    testId,
    // this is only required in useStepper hook but deconstruct here to remove its existence in rest
    value: controlledValue,
    ..._rest
  } = props;

  const fieldId = useStableId(id);

  const { baseStyleProps, flexContainerStyleProps, rest } =
    splitPrimitiveProps(_rest);

  const {
    step,
    value,
    inputValue,
    handleDecrease,
    handleIncrease,
    handleOnBlur,
    handleOnChange,
    handleOnWheel,
    shouldDisableDecreaseButton,
    shouldDisableIncreaseButton,
  } = useStepper(props);

  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.StepperField,
        className
      )}
      data-size={size}
      testId={testId}
      {...flexContainerStyleProps}
    >
      <Label htmlFor={fieldId} visuallyHidden={labelHidden}>
        {label}
      </Label>
      <FieldDescription
        labelHidden={labelHidden}
        descriptiveText={descriptiveText}
      />
      <FieldGroup
        outerStartComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.DecreaseTo} ${
              value - step
            }`}
            className={ComponentClassNames.StepperFieldButtonDecrease}
            data-invalid={hasError}
            isDisabled={shouldDisableDecreaseButton}
            onClick={handleDecrease}
            size={size}
          >
            <IconRemove data-testid={DECREASE_ICON} size={size} />
          </FieldGroupIconButton>
        }
        outerEndComponent={
          <FieldGroupIconButton
            aria-controls={fieldId}
            ariaLabel={`${SharedText.StepperField.ariaLabel.IncreaseTo} ${
              value + step
            }`}
            className={ComponentClassNames.StepperFieldButtonIncrease}
            data-invalid={hasError}
            isDisabled={shouldDisableIncreaseButton}
            onClick={handleIncrease}
            size={size}
          >
            <IconAdd data-testid={INCREASE_ICON} size={size} />
          </FieldGroupIconButton>
        }
      >
        <Input
          className={ComponentClassNames.StepperFieldInput}
          hasError={hasError}
          id={fieldId}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isRequired={isRequired}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onWheel={handleOnWheel}
          size={size}
          type="number"
          value={inputValue}
          {...baseStyleProps}
          {...rest}
        />
      </FieldGroup>
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};