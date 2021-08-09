import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Ticket } from '../types'

function DetailTicket() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Ticket>(['tickets', id], () =>
    client.get(`/api/v1/tickets/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const ticket = data as Ticket

  return (
    <div>
      <label>{ticket.number}</label>
      <br />
    </div>
  )
}

export default DetailTicket
