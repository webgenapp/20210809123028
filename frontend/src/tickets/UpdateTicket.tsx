import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TicketForm from './TicketForm'
import { Ticket } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateTicket() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Ticket>(['tickets', id], () =>
    client.get(`/api/v1/tickets/${id}`).then((response) => response.data)
  )

  const updateTicket = useMutation<Ticket, any, Ticket>(
    (values: Ticket) =>
      client
        .put(`/api/v1/tickets/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tickets')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const ticket = data as Ticket
  return (
    <TicketForm
      ticket={ticket}
      onSubmit={(values, { setSubmitting }) => {
        updateTicket.mutate(values)
        setSubmitting?.(false)
        history.push('/tickets')
      }}
    />
  )
}

export default UpdateTicket
