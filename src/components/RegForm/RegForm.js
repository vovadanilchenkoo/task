import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import './RegForm.sass'
import config from '../../config'

const RegForm = () => {
  const [fileName, setFileName] = useState('')
  const [positions, setPositions] = useState([])
  const dispatch = useDispatch()

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values, e) => {
    e.preventDefault()
    console.log(e)
    console.log(values)
  };

  const handleFileInput = (e) => {
    if(e.target.files.length) {
      setFileName(e.target.files[0].name)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${config.apiUrl}/positions`)
      const response = await data.json()

      setPositions(response.positions)
    }

    fetchData()
  }, [])

  const handleForm = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const activePositionObj = positions.find(el => el.name === formData.get('position'))
    formData.append('position_id', activePositionObj.id)

    async function postData() {
      const getToken = await fetch(`${config.apiUrl}/token`)
      const token = await getToken.json()

      const data = await fetch(`${config.apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Token': token.token
        },
        body: formData
      })
      const response = await data.json()

      if(response.success) {
        const getUsers = await fetch(`${config.apiUrl}/users?page=1&count=6`)
        const users = await getUsers.json()
  
        dispatch({type: 'SET_PAGE', payload: users.page})
        dispatch({type: 'SET_USERS', payload: users.users})
        dispatch({type: 'SET_TOTAL_PAGES', payload: users.total_pages})
      } else {
        console.log('error')
      }

    }

    postData()
  }

  return (
    <section className='reg-form'>
      <div className='container'>
        <h1 className='reg-form__title'>
          Register to get a work
        </h1>
        <h3 className='reg-form__subtitle'>
          Attention! After successful registration and alert, update the list of users in the block from the top
        </h3>

        <form
          className='form' 
          // onSubmit={handleForm}
          onSubmit={handleSubmit(onSubmit)}
          encType='multipart/form-data'
        >
          <label htmlFor='name' className='form__label'>
            Name
            <input
              ref={register({
                required: true,
                minLength: 2,
                maxLength: 60
              })}
              type='text'
              placeholder='Your name'
              name='name'
              id='name'
              className='form__input'
            />

            {errors.name?.type === "required" && 
              <span className='form__notification'>Your input is required</span>}
            {errors.name?.type === "minLength" &&
              <span className='form__notification'>Min length is 2 symbols</span>}
            {errors.name?.type === "maxLength" &&
              <span className='form__notification'>Max length is 60 symbols</span>}
          </label>

          <label htmlFor='email' className='form__label'>
            Email
            <input
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                }
              })}
              type='email'
              placeholder='Your email'
              name='email'
              id='email'
              className='form__input'
            />
            
            {errors.name?.type === "required" && 
              <span className='form__notification'>Your input is required</span>}
            {errors.name?.type === "pattern" && 
              <span className='form__notification'>Invalid email address</span>}
          </label>
          
          <label htmlFor='phone' className='form__label'>
            Phone number
            <input
              ref={register({
                required: true
              })}
              type='text'
              placeholder='+380 XX X XX XX XX' 
              name='phone' 
              id='phone' 
            className='form__input' />
            <span className='form__notification'>
              Enter phone number in open format
            </span>
          </label>
          <div className='form-radio-list'>
            <span className='form-radio-list__title'>
              Select your position
            </span>
            {
              positions.length !== 0
                ? positions.map(position => (
                    <label
                      key={position.id}
                      htmlFor={position.name} 
                      className='form-radio-list__label'
                    >
                      <input
                        type='radio'
                        name='position'
                        id={position.name}
                        value={position.name}
                        data-position-id={position.id}
                        className='form-radio-list__radio'
                      />
                      <span className='form-radio-list__custom-radio'></span>
                      {position.name}
                    </label>
                  ))
                : ''
            }
            <div className='load-photo'>
              <label htmlFor='photo' className='load-photo__label'>
                Photo
                <input type='file' onChange={handleFileInput} name='photo' placeholder='Upload your photo' id='photo' className='load-photo__file-input form__input' />
                <div className='custom-load-photo'>
                  <div className='custom-load-photo__input'>
                    {
                      fileName !== ''
                        ? fileName
                        : 'Upload your photo'
                    }
                  </div>
                  <button type='button' className='custom-load-photo__browse'>
                    Browse
                  </button>
                </div>
              </label>
            </div>
          </div>
          <button type='submit' className='btn form__submit'>
            Sign up now
          </button>
        </form>
      </div>
    </section>
  )
}

export default RegForm