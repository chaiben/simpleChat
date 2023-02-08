import * as Yup from 'yup'

export const createMessageSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please, type a message')
})
