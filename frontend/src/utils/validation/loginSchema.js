import * as Yup from 'yup';

const loginSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(2, t('validation.minPasw'))
    .max(20, t('validation.maxPasw'))
    .required(t('validation.required')),
  password: Yup.string()
    .min(2, t('validation.minPasw'))
    .max(20, t('validation.maxPasw'))
    .required(t('validation.required')),
})

export default loginSchema
