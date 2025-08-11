import * as Yup from 'yup';

const signUpSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(3, t('validation.minThree'))
    .max(20, t('validation.maxTwenty'))
    .required(t('validation.required')),
  password: Yup.string()
    .min(6, t('validation.minSix'))
    .required(t('validation.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('validation.passwordsMustMatch'))
    .required(t('validation.required')),
})

export default signUpSchema
