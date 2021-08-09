import React, { useEffect } from 'react'

import CreateToy from './toys/CreateToy'
import ListToy from './toys/ListToy'
import DetailToy from './toys/DetailToy'
import UpdateToy from './toys/UpdateToy'

import CreateTicket from './tickets/CreateTicket'
import ListTicket from './tickets/ListTicket'
import DetailTicket from './tickets/DetailTicket'
import UpdateTicket from './tickets/UpdateTicket'

import CreateUser from './users/CreateUser'
import ListUser from './users/ListUser'
import DetailUser from './users/DetailUser'
import UpdateUser from './users/UpdateUser'

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import client, { fetchCSRFToken, hasCSRFToken } from './api'

function App() {
  const { data: user } = useQuery('user', () => client.get('/auth/me'), {
    retry: false,
  })

  useEffect(() => {
    if (!hasCSRFToken()) fetchCSRFToken()
  }, [])

  return (
    <Router>
      <nav>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/register'>Register</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/toys'>Toys</Link>
            <br />
            <Link to='/toys/create'>Create a Toy</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/tickets'>Tickets</Link>
            <br />
            <Link to='/tickets/create'>Create a Ticket</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/users'>Users</Link>
            <br />
            <Link to='/users/create'>Create a User</Link>
            <br />
          </li>
        </ul>
      </nav>
      <main>
        <Route path='/toys'>
          <h1>Toys</h1>
        </Route>

        <Route path='/tickets'>
          <h1>Tickets</h1>
        </Route>

        <Route path='/users'>
          <h1>Users</h1>
        </Route>

        <Switch>
          {/* Toy routes */}
          <Route path='/toys/create' component={CreateToy} />
          <Route path='/toys/update/:id' component={UpdateToy} />
          <Route path='/toys/detail/:id' component={DetailToy} />
          <Route path='/toys' component={ListToy} />,{/* Ticket routes */}
          <Route path='/tickets/create' component={CreateTicket} />
          <Route path='/tickets/update/:id' component={UpdateTicket} />
          <Route path='/tickets/detail/:id' component={DetailTicket} />
          <Route path='/tickets' component={ListTicket} />,{/* User routes */}
          <Route path='/users/create' component={CreateUser} />
          <Route path='/users/update/:id' component={UpdateUser} />
          <Route path='/users/detail/:id' component={DetailUser} />
          <Route path='/users' component={ListUser} />
          {/* auth routes */}
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
