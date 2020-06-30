import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import './RegForm.sass'
import config from '../../config'

const RegForm = () => {
  const [fileName, setFileName] = useState('')
  const [positions, setPositions] = useState([])
  const dispatch = useDispatch()

  const { handleSubmit, register, errors, setError } = useForm();
  const onSubmit = (values, e) => {
    e.preventDefault()
    // console.log(e)
    // console.log(values)
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
                required: 'Name field is required',
                minLength: {
                  value: 2,
                  message: 'Min length is 2 symbols'
                },
                maxLength: {
                  value: 60,
                  message: 'Max length is 60 symbols'
                }
              })}
              type='text'
              placeholder='Your name'
              name='name'
              id='name'
              className={errors.name ? 'form__input form__input_error' : 'form__input'}
            />

            {errors.name && 
              <span className='form__notification'>{errors.name.message}</span>}
            
          </label>

          <label htmlFor='email' className='form__label'>
            Email
            <input
              ref={register({
                required: 'Email field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              })}
              type='email'
              placeholder='Your email'
              name='email'
              id='email'
              className={errors.email ? 'form__input form__input_error' : 'form__input'}
            />
            
            {errors.email && 
              <span className='form__notification'>{errors.email.message}</span>}

          </label>
          
          <label htmlFor='phone' className='form__label'>
            Phone number
            <input
              ref={register({
                required: 'Phone field is required'
              })}
              type='text'
              placeholder='+380 XX X XX XX XX' 
              name='phone' 
              id='phone' 
              className={errors.phone ? 'form__input form__input_error' : 'form__input'}
            />

            {errors.phone && 
              <span className='form__notification'>{errors.phone.message}</span>}
          
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
                        ref={register({
                          required: 'Position field is required'
                        })}
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
            {errors.position && 
              <span className='form__notification'>{errors.position.message}</span>}
            
            <div className='load-photo'>
              <label htmlFor='photo' className='load-photo__label'>
                Photo
                <input
                  ref={register({
                    required: 'Photo field is required',
                    validate: {
                      resolution: value => {
                        const _URL = window.URL || window.webkitURL
                        const image = new Image(value[0])
                        const imageURL = _URL.createObjectURL(value[0])
                        
                        image.src = imageURL
                        image.onload = function(e) {
                          const width = e.target.naturalWidth
                          const height = e.target.height
                          if(width <= 70 && height <= 70) {
                            setError('photo', 'resolution', 'Photo resolution must be greater than 70x70 px')
                          }
                          
                          _URL.revokeObjectURL(imageURL);
                        }
                      },
                      size: value => {
                        const size = Math.round(value[0].size / 1024) // get image size in kylobytes

                        if(size >= 5000) {
                          setError('photo', 'size', 'Photo size must be less than 5mb')
                        }
                      },
                      // type: value => {
                      //   const format = value[0].type

                      //   console.log(format)
                      //   if(format.includes('/jpeg') || format.includes('/jpg')) {
                      //     console.log('hello')
                      //     setError('photo', 'type', 'Photo format must be jpeg/jpg')
                      //   } else {
                      //     console.log('error')
                      //     setError('photo', 'type', 'Photo format must be jpeg/jpg')
                      //   }
                      // }
                    }
                  })} 
                  type='file'
                  name='photo'
                  id='photo'
                  onChange={handleFileInput}
                  placeholder='Upload your photo'
                  className='load-photo__file-input form__input'
                />
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

                {errors.photo &&
                  <span className=''>{errors.photo.message}</span>}

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