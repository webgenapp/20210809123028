import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Ticket } from '../types'

type CreateProps = {
  ticket?: Ticket
  onSubmit: (values: Ticket, helpers: FormikHelpers<Ticket>) => void
}

function TicketForm({ ticket, onSubmit }: CreateProps) {
  const initialValues: Ticket = {
    number: ticket ? ticket.number : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='number' placeholder='Number' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default TicketForm
