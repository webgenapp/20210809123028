import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Toy, ToyError } from '../types'
import ToyForm from './ToyForm'
import { useHistory } from 'react-router-dom'

function CreateToy() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createToy = useMutation<Toy, ToyError, Toy>(
    (values) => {
      return client.post('/api/v1/toys', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('toys')
      },
    }
  )

  const handleSubmit = (values: Toy, { setSubmitting }: FormikHelpers<Toy>) => {
    createToy.mutate(values)
    setSubmitting?.(false)
    history.push('/toys')
  }

  return <ToyForm onSubmit={handleSubmit} />
}

export default CreateToy
