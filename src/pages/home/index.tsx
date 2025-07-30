import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Badge from '../../components/common/badge'
import Avatar from '../../components/home/avatar'
import Experiences from '../../components/home/experiences'
import Pill from '../../components/home/pill'
import Projects from '../../components/home/projects'
import Section from '../../components/home/section'
import Technologies from '../../components/home/technologies'
import ExperiencesIcon from '../../components/icons/experiences'
import GitHubIcon from '../../components/icons/gitHub'
import GmailIcon from '../../components/icons/gmail'
import LinkedInIcon from '../../components/icons/linkedIn'
import Loader from '../../components/icons/loader'
import NotionIcon from '../../components/icons/notion'
import ProjectsIcon from '../../components/icons/projects'
import TechnologiesIcon from '../../components/icons/technologies'
import { fetchUserById } from '../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../store/store'

function Home() {
  const { user, loadingFetchUser: loading } = useSelector(
    (state: IRootState) => state.users
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchUserById(1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  return (
    <div>
      <Section id="about">
        <h1 className="text-3xl font-bold flex gap-4 flex-col-reverse md:flex-row md:text-5xl md:items-center">
          Hi, I'm {user?.firstName} {user?.lastName}!
          <div className="flex items-center gap-4">
            <div className="md:hidden block">
              <Avatar image={user?.avatar ?? undefined} href="/login" />
            </div>

            <a
              className="flex items-center"
              href="https://www.linkedin.com/in/carlos-eduardo-garcia-enriquez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge text={user?.availability ?? 'Available for hire'} />
            </a>
          </div>
        </h1>
        <h2 className="text-xl md:text-2xl mt-5 text-wrap">
          I'm a{' '}
          <span className="dark:text-yellow-200 text-yellow-500 font-semibold">
            {user?.professionalTitle ?? 'front end developer'}.
          </span>{' '}
          {user?.bio}
        </h2>
        <div className="mt-8 flex flex-wrap gap-4 justify-between md:justify-normal">
          {user?.linkedin && (
            <Pill href={user.linkedin} className="w-[45%] md:w-auto">
              <LinkedInIcon className="w-4 h-4" /> Linked In
            </Pill>
          )}
          {user?.github && (
            <Pill href={user.github} className="w-[45%] md:w-auto">
              <GitHubIcon className="w-4 h-4" /> GitHub
            </Pill>
          )}
          {user?.notionResume && (
            <Pill href={user.notionResume} className="w-[45%] md:w-auto">
              <NotionIcon className="w-4 h-4" /> Notion
            </Pill>
          )}
          {user?.email && (
            <Pill href={`mailto:${user.email}`} className="w-[45%] md:w-auto">
              <GmailIcon className="w-4 h-4" /> E-mail
            </Pill>
          )}
        </div>
      </Section>

      <Section id="experience">
        <h2 className="text-3xl font-bold ml-[-10px] mb-4 flex items-center gap-x-2">
          <ExperiencesIcon /> Work experience
        </h2>
        <Experiences experiences={user?.experiences ?? []} />
      </Section>

      <Section id="my-stack">
        <h2 className="text-3xl font-bold ml-[-10px] mb-4 flex items-center gap-x-2">
          <TechnologiesIcon /> My stack
        </h2>
        <p className="mt-2 text-pretty text-base font-normal text-gray-500 dark:text-gray-400">
          This are some of the technologies I work with.
        </p>
        <Technologies />
      </Section>

      <Section id="projects" className="pt-20 my-20 lg:mt-52">
        <h2 className="text-3xl font-bold ml-[-10px] mb-4 flex items-center gap-x-2">
          <ProjectsIcon /> Projects
        </h2>
        <Projects projects={user?.projects ?? []} />
      </Section>
    </div>
  )
}

export default Home
