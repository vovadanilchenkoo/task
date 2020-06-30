import React from 'react'
import { ReactComponent as Logo } from '../../assets/img/logo.svg'
import './Header.sass'

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <nav className='header-nav'>
          <a href='##' className='nav__logo-link'>
            <Logo />
          </a>
          <ul className='nav-list'>
            <li className='nav-list__item'>
              <a href='##' className='nav-list__link'>
                About me
              </a>
            </li>
            <li className='nav-list__item'>
              <a href='##' className='nav-list__link'>
                Relationships
              </a>
            </li>
            <li className='nav-list__item'>
              <a href='##' className='nav-list__link'>
                Requirements
              </a>
            </li>
            <li className='nav-list__item'>
              <a href='##' className='nav-list__link'>
                Users
              </a>
            </li>
            <li className='nav-list__item'>
              <a href='##' className='nav-list__link'>
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header