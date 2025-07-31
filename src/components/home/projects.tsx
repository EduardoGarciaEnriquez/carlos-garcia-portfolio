import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { IProject, ITechnology } from '../../types'
import Pill from './pill'
import GitHubIcon from '../icons/gitHub'
import EyeIcon from '../icons/eye'

const Projects = ({ projects }: { projects: IProject[] }) => {
  return (
    <Carousel
      // arrows={window.innerWidth > 428 ? true : false}
      arrows={false}
      autoPlaySpeed={3000}
      autoPlay={true}
      infinite
      pauseOnHover={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 2,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      shouldResetAutoplay
    >
      {projects.map((project) => (
        <ProjectItem {...project} />
      ))}
    </Carousel>
  )
}

function ProjectItem({
  description,
  name,
  cover,
  technologies,
  domain,
  repo,
}: IProject) {
  // return (
  //   <article className="my-10 pb-2 border-b-[1px] border-solid border-gray-400">
  //     <h3 className="text-xl font-semibold text-yellow-100/90">{name}</h3>
  //     <p className="mt-2 text-pretty text-base font-normal text-gray-500 dark:text-gray-400">
  //       {description}
  //     </p>
  //     <ul className="mt-4 flex flex-wrap gap-4 justify-normal">
  //       {technologies.map((technology: ITechnology) => (
  //         <Pill key={technology.id} href="">
  //           <img src={technology.icon} alt="" className="size-5 md:size-4" />{' '}
  //           <span className="hidden md:block">{technology.name}</span>
  //         </Pill>
  //       ))}
  //     </ul>
  //     <img
  //       src={cover}
  //       alt={`SS from ${name}`}
  //       className="rounded-md shadow-lg shadow-white/10 mt-4"
  //     />
  //     <div className="mt-4 flex flex-wrap gap-4 justify-center">
  //       <Pill href={domain}>
  //         <EyeIcon className="size-5 md:size-4" />
  //         <span className="hidden md:block"> Visit </span>
  //       </Pill>
  //       <Pill href={repo}>
  //         <GitHubIcon className="size-5 md:size-4" />
  //         <span className="hidden md:block"> GitHub </span>
  //       </Pill>
  //     </div>
  //   </article>
  // )
  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mx-2 h-full relative pb-8">
      <img
        className="aspect-[4/3] rounded-t-lg object-cover"
        src={cover}
        alt={`Screenshot of ${name}`}
      />
      <div className="p-2 flex flex-col gap-2">
        <ul className="flex flex-wrap gap-4 justify-normal">
          {technologies.map((technology: ITechnology) => (
            <Pill key={technology.id} href="">
              <img src={technology.icon} alt="" className="size-5 md:size-4" />{' '}
              <span className="hidden lg:block">{technology.name}</span>
            </Pill>
          ))}
        </ul>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 justify-center absolute bottom-2 left-0 right-0">
          <Pill href={domain}>
            <EyeIcon className="size-5 md:size-4" />
            <span className="hidden lg:block"> Visit </span>
          </Pill>
          <Pill href={repo}>
            <GitHubIcon className="size-5 md:size-4" />
            <span className="hidden lg:block"> GitHub </span>
          </Pill>
        </div>
      </div>
    </article>
  )
}
export default Projects
