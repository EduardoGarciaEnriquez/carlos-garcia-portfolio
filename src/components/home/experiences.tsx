import dayjs from 'dayjs'
import { IExperience } from '../../types'
import CalendarIcon from '../icons/calendar'

const Experiences = ({ experiences }: { experiences: IExperience[] }) => {
  return (
    <ol className="relative border-s border-gray-400 dark:border-gray-700">
      {experiences.map((item) => {
        return <ExperienceItem {...item} key={`experience-item-${item.id}`} />
      })}
    </ol>
  )
}

const ExperienceItem = ({
  title,
  company,
  startDate,
  endDate,
  description,
}: IExperience) => {
  return (
    <li
      className="mb-10 ms-6"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-anchor-placement="center-bottom"
    >
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-transparent dark:bg-blue-900">
        <CalendarIcon className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
      </span>
      <h3 className="flex items-center gap-x-2 mb-1 ml-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        <span className="italic">{company}</span>,{' '}
        {dayjs(startDate).add(1, 'day').format('MMMM YYYY')}
        {' - '}
        {endDate ? dayjs(endDate).add(1, 'day').format('MMMM YYYY') : 'Ongoing'}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  )
}

export default Experiences
