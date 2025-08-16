import { string, object } from 'yup'

const channelSchema = (existingChannels = []) => object().shape({
  name: string()
    .required('validation.required')
    .min(3, 'validation.minThree')
    .max(20, 'validation.maxTwenty')
    .notOneOf(existingChannels, 'validation.channelExists'),
})

export default channelSchema
