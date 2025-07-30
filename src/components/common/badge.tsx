const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    darkBg: 'dark:bg-blue-700',
    darkText: 'dark:text-blue-300',
    darkFilledBg: 'dark:bg-blue-900',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
    darkBg: 'dark:bg-gray-700',
    darkText: 'dark:text-gray-300',
    darkFilledBg: 'dark:bg-gray-900',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    darkBg: 'dark:bg-red-700',
    darkText: 'dark:text-red-300',
    darkFilledBg: 'dark:bg-red-900',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    darkBg: 'dark:bg-green-700',
    darkText: 'dark:text-green-300',
    darkFilledBg: 'dark:bg-green-900',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    darkBg: 'dark:bg-yellow-700',
    darkText: 'dark:text-yellow-300',
    darkFilledBg: 'dark:bg-yellow-900',
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
    darkBg: 'dark:bg-indigo-700',
    darkText: 'dark:text-indigo-300',
    darkFilledBg: 'dark:bg-indigo-900',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    darkBg: 'dark:bg-purple-700',
    darkText: 'dark:text-purple-300',
    darkFilledBg: 'dark:bg-purple-900',
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    border: 'border-pink-300',
    darkBg: 'dark:bg-pink-700',
    darkText: 'dark:text-pink-300',
    darkFilledBg: 'dark:bg-pink-600',
  },
}

function Badge({
  color = 'blue',
  text,
  size = 'xs',
  variant = 'default',
  prefix,
  suffix,
}: {
  color?: keyof typeof colorMap
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outlined' | 'default'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}) {
  const c = colorMap[color] || colorMap.blue

  const style = {
    default: `${c.bg} ${c.text} ${c.darkBg} ${c.darkText}`,
    outlined: `${c.bg} ${c.text} ${c.border} ${c.darkBg} ${c.darkText} border`,
    filled: `${c.bg} ${c.text} text-xs ${c.darkFilledBg} ${c.darkText}`,
  }

  return (
    <span
      className={`text-${size} font-medium me-2 px-2.5 py-0.5 rounded flex gap-1 items-center ${style[variant]}`}
    >
      {prefix && prefix}
      {text}
      {suffix && suffix}
    </span>
  )
}

export default Badge
