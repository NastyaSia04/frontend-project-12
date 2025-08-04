import * as Yup from 'yup'

const channelSchema = (existingChannelName) => Yup.object({
  name: Yup.string()
    .test(
      'length',
      'От 3 до 30 символов',
      (value) => value && value.length >= 3 && value.length <= 20
    )
    .notOneOf(existingChannelName, 'Имя канала уже существует')
    .required('Обязательное поле'),
})

export default channelSchema
