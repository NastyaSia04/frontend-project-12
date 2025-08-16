import { string, object } from 'yup'

export default object().shape({
  username: string()
    .required('validation.required')
    .min(3, 'validation.minThree')
    .max(20, 'validation.maxTwenty'),
  password: string()
    .required('validation.required'),
})
