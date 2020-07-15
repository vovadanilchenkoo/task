import React from 'react'
import { useDispatch } from 'react-redux'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { ReactComponent as Logo } from '../../assets/img/logo.svg'
import { ReactComponent as MenuIcon } from '../../assets/img/menu-icon.svg'

import './Header.sass'

const Header = () => {
  const dispatch = useDispatch()

  const openMenu = () => {
    dispatch({type: 'SET_MOBILE_NAV', payload: true})
  }

  return (
    <header className='header'>
      <div className='container'>
        <nav className='header-nav'>
          <a href='##' className='nav__logo-link'>
            <Logo />
          </a>
          <button 
            type='button'
            onClick={openMenu}
            className='header-nav__menu-btn'
          >
            <MenuIcon />
          </button>
          <ul className='nav-list'>
            <li className='nav-list__item'>
              <AnchorLink href='#reg-form' className='nav-list__link'>
                About me
              </AnchorLink>
              {/* <a href='##' className='nav-list__link'> */}
              {/* </a> */}
            </li>
            <li className='nav-list__item'>
              <AnchorLink href='#reg-form' className='nav-list__link'>
                Relationships
              </AnchorLink>
              {/* <a href='##' className='nav-list__link'> */}
              {/* </a> */}
            </li>
            <li className='nav-list__item'>
              <AnchorLink href='#reg-form' className='nav-list__link'>
                Requirements
              </AnchorLink>
              {/* <a href='##' className='nav-list__link'> */}
              {/* </a> */}
            </li>
            <li className='nav-list__item'>
              <AnchorLink href='#reg-form' className='nav-list__link'>
                Users
              </AnchorLink>
              {/* <a href='##' className='nav-list__link'> */}
              {/* </a> */}
            </li>
            <li className='nav-list__item'>
              <AnchorLink href='#reg-form' className='nav-list__link'>
                Sign Up
              </AnchorLink>
              {/* <a href='##' className='nav-list__link'> */}
              {/* </a> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header