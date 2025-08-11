import * as Yup from 'yup'

const channelSchema = (t, existingChannelName) => Yup.object({
  name: Yup.string()
    .min(3, t('validation.minThree'))
    .max(20, t('validation.maxTwenty'))
    .notOneOf(existingChannelName, t('validation.channelExists'))
    .required(t('validation.required')),
})

export default channelSchema
