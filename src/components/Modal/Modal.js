import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'

import './Modal.sass'
import { ReactComponent as CloseIcon } from '../../assets/img/close-icon.svg'

const Modal = () => {
  const congrats = useSelector(state => state.congrats)
  const dispatch = useDispatch()

  const closeCongrats = () => {
    dispatch({type: 'SET_CONGRATS', payload: false})
  }

  return (
    <CSSTransition
      in={congrats}
      timeout={5000}
      mountOnEnter
      unmountOnExit
    >
      <div className='congrats'>
        <div className='congrats-backdrop'></div>
        <div className='congrats-content'>
          <h5 className='congrats-content__title'>Congratulations</h5>
          <button 
            type='button'
            onClick={closeCongrats}
            className='congrats-content__close'
          >
            <CloseIcon />
          </button>
          <p className='congrats-content__text'>
            You have successfully passed the registration
          </p>
          <button 
            type='button'
            onClick={closeCongrats}
            className='btn congrats-content__great-btn'
          >
            Great
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Modal