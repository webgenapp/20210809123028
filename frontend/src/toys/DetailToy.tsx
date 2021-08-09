import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Toy } from '../types'

function DetailToy() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Toy>(['toys', id], () =>
    client.get(`/api/v1/toys/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const toy = data as Toy

  return (
    <div>
      <label>{toy.name}</label>
      <br />

      <label>{toy.price}</label>
      <br />
    </div>
  )
}

export default DetailToy
