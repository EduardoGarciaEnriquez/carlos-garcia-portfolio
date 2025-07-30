import { Link } from 'react-router-dom'

function Avatar({
  image,
  width = 'w-10',
  heigh = 'h-10',
  text = 'Ed',
  href,
}: {
  href?: string
  image?: string
  text?: string
  width?: string
  heigh?: string
}) {
  if (href)
    return (
      <Link to={href}>
        <div
          className={`inline-flex relative items-center justify-center ${width} ${heigh} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 text-sm transition-all duration-500 ease-in-out`}
        >
          {image ? (
            <img
              src={image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Ed
            </span>
          )}
        </div>
      </Link>
    )

  return (
    <div
      className={`inline-flex relative items-center justify-center ${width} ${heigh} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 text-sm transition-all duration-500 ease-in-out`}
    >
      {image ? (
        <img
          src={image}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {text}
        </span>
      )}
    </div>
  )
}

export default Avatar
