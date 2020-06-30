import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './CheerfulUsers.sass'
import config from '../../config'

const CheerfulUsers = () => {
  const users = useSelector(state => state.users)
  const page = useSelector(state => state.page)
  const totalPages = useSelector(state => state.totalPages)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${config.apiUrl}/users?page=1&count=6`)
      const response = await data.json()

      dispatch({type: 'SET_PAGE', payload: response.page})
      dispatch({type: 'SET_USERS', payload: response.users})
      dispatch({type: 'SET_TOTAL_PAGES', payload: response.total_pages})
    }

    fetchData()
  }, [])

  const fetchMoreUsers = () => {
    async function fetchData() {
      if((page + 1) > totalPages) {
        console.log('error')
      } else {
        const data = await fetch(`${config.apiUrl}/users?page=${page + 1}&count=6`)
        const response = await data.json()

        dispatch({type: 'SET_PAGE', payload: response.page})
        dispatch({type: 'LOAD_MORE_USERS', payload: response.users})
        dispatch({type: 'SET_TOTAL_PAGES', payload: response.total_pages})
      }
    }

    fetchData()
  }
  
  return (
    <section className='cheerful-users'>
      <div className='container'>
        <h1 className='cheerful-users__title'>
          Our cheerful users
        </h1>
        <h3 className='cheerful-users__subtitle'>
          Attention! Sorting users by registration date
        </h3>
        <ul className='users-list'>
          {
            users.map(user => (
              <li 
                key={user.id}
                className='users-list-item'
              >
                <img src={user.photo} className='users-list-item__photo' alt={user.name} />
                <span className='users-list-item__name'>
                  {user.name}
                </span>
                <span className='users-list-item__description'>
                  {user.position} <br />
                  <span className='users-list-item__email'>
                    {user.email}
                  </span>
                  {user.phone}
                </span>
              </li>
            ))
          }
        </ul>
        {
          page !== totalPages
            ? (
                <button 
                  type='button'
                  onClick={fetchMoreUsers}
                  className='btn cheerful-users__show-more'>
                  Show more
                </button>
            )
            : ''
        }
      </div>
    </section>
  )
}

export default CheerfulUsers