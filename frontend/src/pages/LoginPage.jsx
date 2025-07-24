import { Formik } from 'formik'

const LoginPage = () => {
  //схема валидации
  //const validationSchema = yup.object({
  //username: yup.string().required('Введите имя пользователя')
  //})

  //обработчик отправки формы(пока логируем)
  //const handleSubmit = (values) => {
  //console.log('Данные формы:', values)
  //}

  return (
    <div>
      <h2>Войти</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>Имя пользователя</label><br />
              <input
                id='username'
                name='username'
                type='text'
                onChange={handleChange}
                value={values.username}
              />
            </div>
            <div>
              <label htmlFor='username'>Имя пользователя</label><br />
              <input
                id='password'
                name='password'
                type='password'
                onChange={handleChange}
                value={values.password}
              />
            </div>
            <button type='submit'>Войти</button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage