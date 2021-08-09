import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Ticket } from '../types'
import { useHistory } from 'react-router-dom'

type TicketPreviewProps = {
  ticket: Ticket
  handleEdit: (ticket: Ticket) => void
  handleDelete: (ticket: Ticket) => void
  handleDetail: (ticket: Ticket) => void
}

function TicketPreview({
  ticket,
  handleEdit,
  handleDelete,
  handleDetail,
}: TicketPreviewProps) {
  return (
    <>
      {ticket.number}
      <br />
      <button type='button' onClick={() => handleDetail(ticket)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(ticket)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(ticket)}>
        delete
      </button>
    </>
  )
}

function ListTickets() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const ticketsQuery = useQuery<Ticket[]>('tickets', () => {
    return client
      .get('/api/v1/tickets')
      .then((response) => response.data) as Promise<Ticket[]>
  })

  const deleteTicket = useMutation<any, any, Partial<Ticket>>(
    ({ id }) => {
      return client.delete(`/api/v1/tickets/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tickets')
      },
    }
  )

  const handleEdit = ({ id }: Ticket) => {
    history.push(`/tickets/update/${id}`)
  }

  const handleDelete = ({ id }: Ticket) => {
    deleteTicket.mutate({ id })
  }

  const handleDetail = ({ id }: Ticket) => {
    history.push(`/tickets/detail/${id}`)
  }

  return (
    <>
      <p>{ticketsQuery.data?.length} tickets</p>
      <ul>
        {ticketsQuery.data?.map((ticket) => (
          <li key={ticket.id}>
            <TicketPreview
              ticket={ticket}
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

export default ListTickets
