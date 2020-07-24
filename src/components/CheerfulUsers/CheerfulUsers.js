import React, { useEffect, useState } from 'react'
import { Tooltip } from '@material-ui/core'
import { useSelector, useDispatch, useStore } from 'react-redux'

import './CheerfulUsers.sass'
import config from '../../config'
import Placeholder from '../../assets/img/photo-cover.png'

import Max from '../../assets/img/maximillian.png'
import Adolph from '../../assets/img/adolph.png'
import Elizabeth from '../../assets/img/elizabeth.png'
import Alex from '../../assets/img/alexander.png'
import Noah from '../../assets/img/noah.png'
import Liam from '../../assets/img/liam.png'

const CheerfulUsers = () => {
  // const users = useSelector(state => state.users)
  const [users] = useState([
    {
      id: 1282,
      name: 'Maximillian',
      email: 'controldepartment@gmail',
      phone: '+380 50 678 03 24',
      position: 'Leading specialist of the Control Department',
      position_id: 2, 
      registration_timestamp: 1595249681,
      photo: Max
    },
    {
      id: 1283,
      name: 'Adolph Blaine Charles David Earl Matthew Matthew',
      email: 'adolph.blainecharles@.com',
      phone: '+380 50 678 03 24',
      position: 'Contextual advertising specialist',
      position_id: 3,
      registration_timestamp: 1595250302,
      photo: Adolph
    },
    {
      id: 1284,
      name: 'Elizabeth',
      email: 'elisabet.front@gmail.com',
      phone: '+380 50 678 03 24',
      position: 'Frontend developer',
      position_id: 1,
      registration_timestamp: 1595256952,
      photo: Elizabeth
    },
    {
      id: 1285,
      name: 'Alexander Jayden',
      email: 'alexander.back@gmail.com',
      phone: '+380 50 678 03 24',
      position: 'Backend developer',
      position_id: 2,
      registration_timestamp: 1595260855,
      photo: Alex
    },
    {
      id: 1286,
      name: 'Noah',
      email: 'noah1998@gmail.com',
      phone: '+380 50 678 03 24',
      position: 'QA',
      position_id: 2,
      registration_timestamp: 1595261022,
      photo: Noah
    },
    {
      id: 1287,
      name: 'Liamgrievescasey Smith Wiam',
      email: 'liamgrievescasey.smith@.ww',
      phone: '+380 50 678 03 24',
      position: 'Lead designer',
      position_id: 2,
      registration_timestamp: 1595266649,
      photo: Liam
    }
  ])
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

      if(response.success) {
        dispatch({type: 'SET_PAGE', payload: response.page})
        dispatch({type: 'SET_USERS', payload: response.users})
        dispatch({type: 'SET_TOTAL_PAGES', payload: response.total_pages})
      } else {
        console.log(response.message)
      }
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

        if(response.success) {
          dispatch({type: 'SET_PAGE', payload: response.page})
          dispatch({type: 'LOAD_MORE_USERS', payload: response.users})
          dispatch({type: 'SET_TOTAL_PAGES', payload: response.total_pages})
        } else {
          console.log(response.message)
        }
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