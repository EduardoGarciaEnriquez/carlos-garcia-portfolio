import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTechnologiesByPage } from '../../store/slices/technologies.slice'
import { AppDispatch, IRootState } from '../../store/store'
import { ITag, ITechnology } from '../../types'
import Badge from '../common/badge'
import Loader from '../icons/loader'

const Technologies = () => {
  const { technologies, loadingFetchTechnologies: loading } = useSelector(
    (state: IRootState) => state.technology
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTechnologiesByPage({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  return (
    <div className="mt-4 flex flex-wrap gap-4 justify-between">
      {technologies.map((technology: ITechnology) => (
        <TechnologyItem key={`technology-${technology.name}`} {...technology} />
      ))}
    </div>
  )
}

function TechnologyItem({
  name,
  icon,
  tags,
}: {
  name: string
  icon: string
  tags: ITag[]
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="flex flex-col gap-2 items-center border dark:border-white/10 dark:bg-white/5 border-black/10 bg-black/5 text-md p-3 md:rounded-sm rounded-full 
      hover:bg-white/10 md:w-[20%] relative"
    >
      <img src={icon} alt={`${name} icon`} className="size-5 md:size-11" />
      <span className="hidden md:block text-sm">{name}</span>
      {isFocused && (
        <div className="md:hidden absolute top-10 p-1 text-xs text-center text-white bg-gray-400 rounded-md dark:bg-gray-700">
          {name}
        </div>
      )}
      <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
        {tags.map(({ name, color }: ITag) => {
          return (
            <Badge
              key={`${name}-${color}`}
              variant="filled"
              text={name.toLowerCase()}
              color={color}
              size="xs"
            />
          )
        })}
      </div>
    </div>
  )
}

export default Technologies
