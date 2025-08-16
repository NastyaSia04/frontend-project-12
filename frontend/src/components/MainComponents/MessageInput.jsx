import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const MessageInput = ({ message, onChange, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={onSubmit} className="py-1 border rounded-2" noValidate>
        <div className="input-group has-validation">
          <input
            name="body"
            placeholder={t('messages.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            aria-label={t('messages.ariaLabelInput')}
            value={message}
            onChange={onChange}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            aria-label={t('messages.ariaLabelButton')}
            disabled={!message.trim()}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.buttonText')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
