import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { jwtDecode } from 'jwt-decode'

import Modal from '../../../components/admin/modal'
import SearchBar from '../../../components/admin/searchbar'
import Table, { ColumnType } from '../../../components/admin/table'
import Button from '../../../components/common/button'
import NoResults from '../../../components/common/noResults'
import Pagination from '../../../components/common/pagination'
import DeleteIcon from '../../../components/icons/delete'
import EditIcon from '../../../components/icons/edit'
import Loader from '../../../components/icons/loader'
import { fetchUsersByPage } from '../../../store/slices/users.slice'
import { AppDispatch, IRootState } from '../../../store/store'
import { IUser } from '../../../types'
import Avatar from '../../../components/home/avatar'

const UsersPage = () => {
  const [page, setPage] = useState(1)
  const [selectorValue, setSelectorValue] = useState<
    'email' | 'firstName' | 'lastName' | null
  >(null)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [modal, setModal] = useState({ isOpen: false, text: '' })

  const { token } = useSelector((state: IRootState) => state.auth)
  const { sub } = jwtDecode(token ?? '')

  const {
    users,
    loadingFetchUsers: loading,
    errorFetchUsers: error,
    totalPages: total,
  } = useSelector((state: IRootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsersByPage({ page, searchBy: selectorValue, searchValue }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectorValue, searchValue])

  const handleOnDelete = () => {
    setModal({ text: '', isOpen: false })
  }

  const PageHeader = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-2xl dark:text-gray-400 text-gray-600">Users</h2>
          <div className="md:block hidden w-full">
            <SearchBar
              options={[
                { text: 'First name', value: 'firstName' },
                { text: 'Last name', value: 'lastName' },
                { text: 'E-mail', value: 'email' },
              ]}
              onChangeSelect={(value) => {
                setSelectorValue(value as 'email' | 'firstName' | 'lastName')
              }}
              onChangeInput={(value) => {
                setSearchValue(value)
              }}
              inputValue={searchValue || ''}
              selectorValue={selectorValue || ''}
            />
          </div>
          <Button size="lg" variant="filled" color="primary" onClick={() => {}}>
            New
          </Button>
        </div>
        <div className="md:hidden block">
          <SearchBar
            options={[
              { text: 'First name', value: 'firstName' },
              { text: 'Last name', value: 'lastName' },
              { text: 'E-mail', value: 'email' },
            ]}
            onChangeSelect={(value) => {
              setSelectorValue(value as 'email' | 'firstName' | 'lastName')
            }}
            onChangeInput={(value) => {
              setSearchValue(value)
            }}
            inputValue={searchValue || ''}
            selectorValue={selectorValue || ''}
          />
        </div>
      </>
    )
  }

  const columns: ColumnType<IUser>[] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (props) => {
        const { avatar } = props
        return (
          <Avatar
            image={avatar ?? undefined}
            text={avatar ? 'NA' : undefined}
          />
        )
      },
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (props) => {
        const { firstName, lastName, email } = props
        return (
          <div className="flex flex-row items-center justify-center px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div className="ps-3">
              <div className="text-base font-semibold">
                {firstName} {lastName}
              </div>
              <div className="font-normal text-gray-500">{email}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Position',
      dataIndex: 'professionalTitle',
      key: 'professionalTitle',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (props) => {
        const { id, firstName, lastName } = props
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
            {id !== parseInt(sub ?? '0') && (
              <Button
                size="xs"
                variant="outlined"
                color="danger"
                onClick={() => {
                  setModal({
                    isOpen: true,
                    text: `Delete user '${firstName} ${lastName}'?`,
                  })
                }}
                icon={<DeleteIcon />}
              />
            )}
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
      {users.length !== 0 && !error ? (
        <>
          <Table columns={columns} dataSource={users ?? []} />
          <Pagination
            total={total}
            page={page}
            next={() => setPage(page + 1)}
            prev={() => setPage(page - 1)}
          />
          <Modal
            open={modal.isOpen}
            onClose={() => setModal({ text: '', isOpen: false })}
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

export default UsersPage
