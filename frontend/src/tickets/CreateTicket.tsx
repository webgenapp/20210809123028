import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Ticket, TicketError } from '../types'
import TicketForm from './TicketForm'
import { useHistory } from 'react-router-dom'

function CreateTicket() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createTicket = useMutation<Ticket, TicketError, Ticket>(
    (values) => {
      return client.post('/api/v1/tickets', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tickets')
      },
    }
  )

  const handleSubmit = (
    values: Ticket,
    { setSubmitting }: FormikHelpers<Ticket>
  ) => {
    createTicket.mutate(values)
    setSubmitting?.(false)
    history.push('/tickets')
  }

  return <TicketForm onSubmit={handleSubmit} />
}

export default CreateTicket
