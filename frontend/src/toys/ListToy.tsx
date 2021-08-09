import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Toy } from '../types'
import { useHistory } from 'react-router-dom'

type ToyPreviewProps = {
  toy: Toy
  handleEdit: (toy: Toy) => void
  handleDelete: (toy: Toy) => void
  handleDetail: (toy: Toy) => void
}

function ToyPreview({
  toy,
  handleEdit,
  handleDelete,
  handleDetail,
}: ToyPreviewProps) {
  return (
    <>
      {toy.name}
      <br />
      <button type='button' onClick={() => handleDetail(toy)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(toy)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(toy)}>
        delete
      </button>
    </>
  )
}

function ListToys() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const toysQuery = useQuery<Toy[]>('toys', () => {
    return client
      .get('/api/v1/toys')
      .then((response) => response.data) as Promise<Toy[]>
  })

  const deleteToy = useMutation<any, any, Partial<Toy>>(
    ({ id }) => {
      return client.delete(`/api/v1/toys/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('toys')
      },
    }
  )

  const handleEdit = ({ id }: Toy) => {
    history.push(`/toys/update/${id}`)
  }

  const handleDelete = ({ id }: Toy) => {
    deleteToy.mutate({ id })
  }

  const handleDetail = ({ id }: Toy) => {
    history.push(`/toys/detail/${id}`)
  }

  return (
    <>
      <p>{toysQuery.data?.length} toys</p>
      <ul>
        {toysQuery.data?.map((toy) => (
          <li key={toy.id}>
            <ToyPreview
              toy={toy}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListToys
