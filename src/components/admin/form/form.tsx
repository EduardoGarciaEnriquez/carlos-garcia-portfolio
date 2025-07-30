import Button from '../../common/button'
import LeftArrowIcon from '../../icons/leftArrow'

interface IForm {
  children: React.ReactNode
  title: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  disabled?: boolean
  editing: boolean
  onCancel?: () => void
  onEdit?: () => void
  onGoBack?: () => void
}

const Form = ({
  children,
  title,
  onSubmit,
  disabled = false,
  editing,
  onCancel,
  onEdit,
  onGoBack,
}: IForm) => {
  const FormHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        {!!onGoBack && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onGoBack}
            icon={<LeftArrowIcon />}
          >
          </Button>
        )}
        <h2 className="text-2xl dark:text-gray-400 text-gray-600">{title}</h2>

        {editing ? (
          <div className="flex items-center gap-2">
            <Button
              variant="filled"
              color="primary"
              type="submit"
              disabled={disabled}
            >
              Save
            </Button>
            {!!onCancel && (
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        ) : (
          !!onEdit && (
            <Button variant="filled" color="primary" onClick={onEdit}>
              Edit
            </Button>
          )
        )}
      </div>
    )
  }

  const FormFooter = () => {
    if (!editing) return <></>
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="filled"
          color="primary"
          type="submit"
          className="w-full"
          disabled={disabled}
        >
          Save
        </Button>
        {!!onCancel && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
            className="w-full"
          >
            Cancel
          </Button>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full transition-all duration-500 ease-in-out"
    >
      <FormHeader />
      {children}
      <FormFooter />
    </form>
  )
}

export default Form
