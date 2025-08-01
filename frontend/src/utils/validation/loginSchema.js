import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
})

export default loginSchema