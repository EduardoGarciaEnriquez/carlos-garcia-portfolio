import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import Modal from '../../../components/admin/modal'
import SearchBar from '../../../components/admin/searchbar'
import Table, { ColumnType } from '../../../components/admin/table'
import Button from '../../../components/common/button'
import NoResults from '../../../components/common/noResults'
import Pagination from '../../../components/common/pagination'
import DeleteIcon from '../../../components/icons/delete'
import EditIcon from '../../../components/icons/edit'
import Loader from '../../../components/icons/loader'
import {
  deleteExperience,
  fetchExperiencesByPage,
} from '../../../store/slices/experiences.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IExperience } from '../../../types'

const ExperiencesPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string | null>(null)
  const [modal, setModal] = useState({ isOpen: false, text: '', id: undefined })

  const {
    experiences,
    loadingFetchExperiences: loading,
    errorFetchExperiences: error,
    totalPages: total,
  } = useSelector((state: IRootState) => state.experience)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchExperiencesByPage({ page, search }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search])

  const closeModal = () => {
    setModal({ text: '', isOpen: false, id: undefined })
  }

  const handleOnDelete = () => {
    if (modal?.id) dispatch(deleteExperience(modal.id))
    closeModal()
  }

  const PageHeader = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-2xl dark:text-gray-400 text-gray-600">
            Experiences
          </h2>
          <div className="md:block hidden w-full">
            <SearchBar
              onChangeInput={(value) => {
                setSearch(value)
              }}
              inputValue={search || ''}
            />
          </div>
          <Button
            size="lg"
            variant="filled"
            color="primary"
            onClick={() => {
              navigate('create-new')
            }}
          >
            New
          </Button>
        </div>
        <div className="md:hidden block">
          <SearchBar
            onChangeInput={(value) => {
              setSearch(value)
            }}
            inputValue={search || ''}
          />
        </div>
      </>
    )
  }

  const columns: ColumnType<IExperience>[] = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (props) => {
        const { company, startDate, endDate } = props
        return (
          <div className="flex flex-col items-center justify-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <div className="text-base font-semibold">{company}</div>
            <div className="font-normal text-gray-500">
              {dayjs(startDate).add(1, 'day').format('MMMM YYYY')}
              {' - '}
              {endDate
                ? dayjs(endDate).add(1, 'day').format('MMMM YYYY')
                : 'Ongoing'}
            </div>
          </div>
        )
      },
    },
    {
      title: 'Role',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (props) => {
        const { id, company, title } = props
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              size="xs"
              variant="filled"
              color="primary"
              onClick={() => {
                navigate(`${id}`)
              }}
              icon={<EditIcon />}
            />
            <Button
              size="xs"
              variant="outlined"
              color="danger"
              onClick={() => {
                setModal({
                  isOpen: true,
                  text: `Delete your experience at ${company} as ${title}?`,
                  id,
                })
              }}
              icon={<DeleteIcon />}
            />
          </div>
        )
      },
    },
  ]

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader className="h-24 w-24" />
      </div>
    )

  return (
    <>
      <PageHeader />
      {experiences.length !== 0 && !error ? (
        <>
          <Table columns={columns} dataSource={experiences ?? []} />
          <Pagination
            total={total}
            page={page}
            next={() => setPage(page + 1)}
            prev={() => setPage(page - 1)}
          />
          <Modal
            open={modal.isOpen}
            onClose={closeModal}
            onAccept={handleOnDelete}
            text={modal.text}
          />
        </>
      ) : (
        <NoResults />
      )}
    </>
  )
}

export default ExperiencesPage
