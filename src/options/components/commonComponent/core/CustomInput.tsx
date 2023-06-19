import React from 'react'

const CustomInput: React.FC<{
  name: string
  type: string
  id: string
  placeholder?: string
  value: any
  className: string
  ref?: React.RefObject<HTMLInputElement>
  pattern?: string
  onChange?: (e: any) => void
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  onClickCapture?: (e: any) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}> = ({
  id,
  name,
  type,
  value,
  placeholder,
  pattern,
  className,
  ref,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onClickCapture,
}) => {
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
}

export default CustomInput
