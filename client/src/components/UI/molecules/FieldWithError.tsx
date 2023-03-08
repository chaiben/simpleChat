import React from 'react'
import { Field } from 'formik'
import { Input, Error, FlexBox } from '../atoms'

interface Props {
  id: string
  name: string
  placeholder: string
  type?: string
  error?: string
  touched?: boolean
}

export const FieldWithError: React.FC<Props> = ({
  id,
  name,
  placeholder,
  type,
  error,
  touched
}) => {
  return (
    <FlexBox>
      <Field
        as={Input}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type != null ? type : 'text'}
        error={error != null && (touched ?? false) ? 'true' : null}
      />
      {error != null && (touched ?? false) ? <Error>{error}</Error> : null}
    </FlexBox>
  )
}
