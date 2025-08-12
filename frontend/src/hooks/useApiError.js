import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useCallback } from 'react'

export const useApiError = () => {
  const { t } = useTranslation()

  const handleApiError = useCallback((error, options = {}) => {
    const { setStatus, setErrors, fieldErrors, defaultMessageKey } = options

    if (!navigator.onLine) {
      toast.error(t('notifications.networkError'))
      return
    }

    const status = error.response?.status

    if (status === 401 && setStatus) {
      setStatus(t(defaultMessageKey))
    } else if (status === 409 && setErrors && fieldErrors) {
      setErrors(fieldErrors)
    } else {
      toast.error(t('notifications.dataLoadError'))
    }
  }, [t])

  return handleApiError
}
