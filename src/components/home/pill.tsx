const Pill = ({
  href,
  className,
  children,
}: {
  href?: string | null
  className?: string
  children: React.ReactNode
}) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={`flex flex-row gap-2 items-center border dark:border-white/10 dark:bg-white/5 border-black/10 bg-black/5 text-md px-3 py-1 rounded-full hover:bg-white/10 ${className}`}
      >
        {children}
      </a>
    )
  }
  return (
    <span
      className={`flex flex-row gap-2 items-center border dark:border-white/10 dark:bg-white/5 border-black/10 bg-black/5 text-md px-3 py-1 rounded-full hover:bg-white/10 ${className}`}
    >
      {children}
    </span>
  )
}

export default Pill
