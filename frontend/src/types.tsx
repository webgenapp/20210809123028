export type Toy = {
  id?: number

  name: string

  price: string
}

export type Ticket = {
  id?: number

  number: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type ToyError = any

export type TicketError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
