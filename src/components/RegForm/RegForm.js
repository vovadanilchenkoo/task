import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import './RegForm.sass'
import config from '../../config'
// import Modal from '../Modal/Modal'

const RegForm = () => {
  const [fileName, setFileName] = useState('')
  const [positions, setPositions] = useState([])
  const congrats = useSelector(state => state.congrats)
  const usersCount = useSelector(state => state.usersCount)
  const dispatch = useDispatch()

  const { handleSubmit, register, errors, setError } = useForm();

  const handleFileInput = (e) => {
    // set file name for showing in file input
    if(e.target.files.length) {
      setFileName(e.target.files[0].name)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${config.apiUrl}/positions`)
      const response = await data.json()

      if(response.success) {
        setPositions(response.positions)
      } else {
        console.log(response.message)
      }
    }

    fetchData()
  }, [])

  const handleForm = (values, e) => {
    e.preventDefault()
    
    dispatch({type: 'SET_CONGRATS', payload: true})

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
        const getUsers = await fetch(`${config.apiUrl}/users?page=1&count=${usersCount}`)
        const users = await getUsers.json()

        if(response.success) {
          dispatch({type: 'SET_PAGE', payload: users.page})
          dispatch({type: 'SET_USERS', payload: users.users})
          dispatch({type: 'SET_TOTAL_PAGES', payload: users.total_pages})
        } else {
          console.log(response.message)
        }
      } else {
        console.log(response.message)
      }
    }

    postData()
  }

  return (
    <section id='reg-form' className='reg-form'>
      <div className='container'>
        <h1 className='reg-form__title'>
          Register to get a work
        </h1>
        <h3 className='reg-form__subtitle'>
          Attention! After successful registration and alert, update the list of users in the block from the top
        </h3>

        <form
          className='form'
          onSubmit={handleSubmit(handleForm)}
          encType='multipart/form-data'
        >
          <label htmlFor='name' className='form__label'>
            Name
            <div className='form-input-wrap'>
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
            </div>

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
                required: 'Phone field is required',
                pattern: {
                  value: /^[\+]{0,1}380([0-9]{9})$/,
                  message: 'Number should start with code of Ukraine +380'
                }
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
                      photo: value => {
                        // check file format
                        const format = value[0].type
                        if(format.includes('/jpeg') || format.includes('/jpg')) {
                          console.log('hello')
                        } else {
                          setError('photo', {type: 'format', message: 'The photo format must be jpeg/jpg type'})
                        }

                        // check photo resolution
                        const _URL = window.URL || window.webkitURL
                        const size = Math.round(value[0].size / 1024) // get image size in kylobytes
                        const image = new Image(value[0])
                        const imageURL = _URL.createObjectURL(value[0])

                        image.src = imageURL
                        image.onload = function(e) {
                          const height = e.target.height
                          const width = e.target.naturalWidth
                          
                          if(size >= 5000) {
                            setError('photo', {type: 'size', message: 'The photo size must not be greater than 5 Mb'})
                          }

                          if(width <= 70 && height <= 70) {
                            setError('photo', {type: 'resolution', message: 'Minimum size of photo 70x70px'})
                          }
                          
                          _URL.revokeObjectURL(imageURL);
                        }
                      }
                    }
                  })} 
                  type='file'
                  name='photo'
                  id='photo'
                  onChange={handleFileInput}
                  accept='image/jpg, image/jpeg'
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
                  <span className='form__notification'>{errors.photo.message}</span>}

              </label>
            </div>
          </div>
          <button type='submit' className='btn form__submit'>
            Sign up now
          </button>
        </form>

        {/* Modal after success registration */}
        {/* {
          congrats 
            ? <Modal />
            : ''
        } */}
      </div>
    </section>
  )
}

export default RegForm