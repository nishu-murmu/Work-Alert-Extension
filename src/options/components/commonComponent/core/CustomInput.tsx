import React from 'react'

const CustomInput = React.forwardRef<
  HTMLInputElement,
  {
    name: string
    type: string
    id: string
    placeholder?: string
    value: any
    className: string
    pattern?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onClickCapture?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  }
>(
  (
    {
      id,
      name,
      type,
      value,
      placeholder,
      pattern,
      className,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onClickCapture,
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        id={id}
        name={name}
        ref={ref}
        placeholder={placeholder}
        value={value}
        className={className}
        pattern={pattern}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
      />
    )
  },
)

export default CustomInput
