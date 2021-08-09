import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ToyForm from './ToyForm'
import { Toy } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateToy() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Toy>(['toys', id], () =>
    client.get(`/api/v1/toys/${id}`).then((response) => response.data)
  )

  const updateToy = useMutation<Toy, any, Toy>(
    (values: Toy) =>
      client
        .put(`/api/v1/toys/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('toys')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const toy = data as Toy
  return (
    <ToyForm
      toy={toy}
      onSubmit={(values, { setSubmitting }) => {
        updateToy.mutate(values)
        setSubmitting?.(false)
        history.push('/toys')
      }}
    />
  )
}

export default UpdateToy
