import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Modal from '../../../components/admin/modal'
import SearchBar from '../../../components/admin/searchbar'
import Table, { ColumnType } from '../../../components/admin/table'
import Badge from '../../../components/common/badge'
import Button from '../../../components/common/button'
import NoResults from '../../../components/common/noResults'
import Pagination from '../../../components/common/pagination'
import DeleteIcon from '../../../components/icons/delete'
import EditIcon from '../../../components/icons/edit'
import Loader from '../../../components/icons/loader'
import {
  deleteTechnology,
  fetchTechnologiesByPage,
} from '../../../store/slices/technologies.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { ITag, ITechnology } from '../../../types'
import NoImageIcon from '../../../components/icons/noImage'

const TechnologiesPage = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string | null>(null)
  const [modal, setModal] = useState({ isOpen: false, text: '', id: null })

  const {
    technologies,
    loadingFetchTechnologies: loading,
    errorFetchTechnologies: error,
    totalPages: total,
  } = useSelector((state: IRootState) => state.technology)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchTechnologiesByPage({ page, search }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search])

  const closeModal = () => {
    setModal({ text: '', isOpen: false, id: null })
  }

  const handleOnDelete = () => {
    if (modal.id) dispatch(deleteTechnology(modal.id))
    closeModal()
  }

  const PageHeader = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-2xl dark:text-gray-400 text-gray-600">
            Technologies
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

  const columns: ColumnType<ITechnology>[] = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (props) => {
        const { icon, name } = props
        if (!icon)
          return <NoImageIcon className="h-10 w-auto mx-auto text-gray-400" />
        return (
          <img
            src={icon}
            alt={`${name} icon`}
            className="h-10 w-auto round-sm mx-auto"
          />
        )
      },
    },
    {
      title: 'Technology',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (props) => {
        const { tags } = props
        return (
          <div className="flex items-center justify-center gap-2">
            {tags.map(({ id, name, color }: ITag) => {
              return (
                <Badge
                  key={id + name}
                  variant="filled"
                  text={name}
                  color={color ?? undefined}
                  size="xs"
                />
              )
            })}
          </div>
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (props) => {
        const { id, name } = props
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
                  text: `Delete '${name}' technology ?`,
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
      {technologies.length !== 0 && !error ? (
        <>
          <Table columns={columns} dataSource={technologies ?? []} />
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

export default TechnologiesPage
