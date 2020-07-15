import React, { useEffect } from 'react'
import { Tooltip } from '@material-ui/core'
import { useSelector, useDispatch, useStore } from 'react-redux'

import './CheerfulUsers.sass'
import config from '../../config'
import Placeholder from '../../assets/img/photo-cover.png'

const CheerfulUsers = () => {
  const users = useSelector(state => state.users)
  const page = useSelector(state => state.page)
  const totalPages = useSelector(state => state.totalPages)
  const store = useStore()
  const dispatch = useDispatch()


  const sortUsers = (list) => {
    list.sort((a, b) => {
      if(a.registration_timestamp < b.registration_timestamp) {
        return -1
      }
    })
  }

  useEffect(() => {
    // check window width
    const windowWidth = window.screen.width
    if(windowWidth < 481) {
      dispatch({type: 'SET_USERS_COUNT', payload: 3})
    }

    async function fetchData() {
      const usersCount = store.getState().usersCount
      const data = await fetch(`${config.apiUrl}/users?page=1&count=${usersCount}`)
      const response = await data.json()

      const usersList = sortUsers(response.users)

      dispatch({type: 'SET_PAGE', payload: response.page})
      dispatch({type: 'SET_USERS', payload: response.users})
      dispatch({type: 'SET_TOTAL_PAGES', payload: response.total_pages})
    }

    fetchData()
  }, [])

  const fetchMoreUsers = () => {
    async function fetchData() {
      const usersCount = store.getState().usersCount
      if((page + 1) > totalPages) {
        console.log('error')
      } else {
        const data = await fetch(`${config.apiUrl}/users?page=${page + 1}&count=${usersCount}`)
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
                <img 
                  alt={user.name} 
                  className='users-list-item__photo' 
                  src={user.photo.includes('/placeholder.png') ? Placeholder : user.photo }
                />
                <span className='users-list-item__name'>
                  {user.name}
                </span>
                <span className='users-list-item__description'>
                  {user.position} <br />
                  <Tooltip title={user.email}>
                    <span className='users-list-item__email'>
                      {user.email}
                    </span>
                  </Tooltip>
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