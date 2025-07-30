import React from 'react'

export interface ColumnType<T> {
  title: string
  dataIndex?: keyof T | string
  key: string
  render?: ({ ...props }) => React.ReactElement
}

export interface TableProps<T> {
  columns: ColumnType<T>[]
  dataSource: T[]
}

function Table<T extends { id: React.Key }>({ columns, dataSource }: TableProps<T>) {
  return (
    <div className="relative overflow-x-auto shadow-lg mt-4 rounded-lg">
      <table className="w-full text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns?.map(({ title, key }) => {
              return (
                <th key={`${title} ${key}`} scope="col" className="px-6 py-3">
                  {title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => {
            const { id } = row;
            return (
              <tr
                key={`col-${id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map(({ dataIndex, render }) => {
                  return (
                    <td
                      key={`${String(dataIndex)}-${id}`}
                      className="px-6 py-4 text-center"
                    >
                      {render
                        ? render(row)
                        : dataIndex && typeof dataIndex === 'string'
                        ? (dataIndex in row
                            ? (typeof row[dataIndex as keyof T] === 'object' && row[dataIndex as keyof T] !== null
                                ? JSON.stringify(row[dataIndex as keyof T])
                                : String(row[dataIndex as keyof T]))
                            : null)
                        : dataIndex && typeof dataIndex !== 'undefined'
                        ? (typeof row[dataIndex as keyof T] === 'object' && row[dataIndex as keyof T] !== null
                            ? JSON.stringify(row[dataIndex as keyof T])
                            : String(row[dataIndex as keyof T]))
                        : null}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
