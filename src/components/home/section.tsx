const Section = ({
  id,
  className = '',
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <section
      id={id}
      className={`mx-auto w-[90vw] max-w-[768px] pt-20 my-20 lg:my-52 dark:text-white text-gray-700 text-pretty ${className}`}
    >
      {children}
    </section>
  )
}

export default Section
