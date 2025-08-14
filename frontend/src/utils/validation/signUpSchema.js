import { string, object, ref } from 'yup'

export default object().shape({
  username: string()
    .required('validation.required')
    .min(3, 'validation.minThree')
    .max(20, 'validation.maxTwenty'),
  password: string()
    .required('validation.required')
    .min(6, 'validation.minSix'),
  confirmPassword: string()
    .required('validation.required')
    .oneOf([ref('password')], 'validation.passwordsMustMatch'),
})
