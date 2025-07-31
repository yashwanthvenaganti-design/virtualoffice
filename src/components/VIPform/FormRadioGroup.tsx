import React from 'react';
import type { UseFormRegister, FieldError, UseFormWatch } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  isDark: boolean;
  disabled?: boolean;
  helperText?: string;
  direction?: 'horizontal' | 'vertical';
  register: UseFormRegister<any>;
  error?: FieldError;
  watch: UseFormWatch<any>;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  required = false,
  isDark,
  helperText,
  direction = 'horizontal',
  register,
  error,
  watch,
  disabled,
}) => {
  const { onChange, onBlur, name: fieldName, ref } = register(name);

  const selectedValue = watch(name) ?? 'unspecified';

  return (
    <FormControl
      component='fieldset'
      error={!!error}
      required={required}
      disabled={disabled}
      variant='standard'
      margin='normal'
    >
      <FormLabel component='legend' sx={{ color: isDark ? 'grey.300' : 'text.primary' }}>
        {label}
      </FormLabel>

      <RadioGroup
        row={direction === 'horizontal'}
        name={fieldName}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio inputRef={ref} />}
            label={option.label}
            disabled={option.disabled || disabled}
          />
        ))}
      </RadioGroup>

      {(helperText || error) && (
        <FormHelperText>{error ? error.message : helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormRadioGroup;
