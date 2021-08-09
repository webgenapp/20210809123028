import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Toy } from '../types'

type CreateProps = {
  toy?: Toy
  onSubmit: (values: Toy, helpers: FormikHelpers<Toy>) => void
}

function ToyForm({ toy, onSubmit }: CreateProps) {
  const initialValues: Toy = {
    name: toy ? toy.name : '',
    price: toy ? toy.price : '',
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
          <Field type='text' name='name' placeholder='Name' />

          <Field type='text' name='price' placeholder='Price' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ToyForm
