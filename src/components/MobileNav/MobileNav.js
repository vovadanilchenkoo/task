import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Logo } from '../../assets/img/logo.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import './MobileNav.sass'

const MobileNav = () => {
  const mobileNav = useSelector(state => state.mobileNav)
  const dispatch = useDispatch()

  const menuItems = [
    ['About me', 'Relationships', 'Users', 'Sign up', 'Terms and conditions'],
    ['How it works', 'Partnership', 'Help', 'Leave testimonial', 'Contact us'],
    ['Articles', 'Our news', 'Testimonials', 'Licenses', 'Privacy Policy']
  ]

  const closeMenu = () => {
    dispatch({type: 'SET_MOBILE_NAV', payload: false})
  }

  return (
    <div className={mobileNav ? 'moblie-nav-wrap moblie-nav-wrap_active' : 'moblie-nav-wrap'}>
      <span>{mobileNav}</span>
      <nav className='mobile-nav'>
        <a href='##' className='mobile-nav__logo-link'>
          <Logo />
        </a>
        {
          menuItems.map((menu, i) => (
            <ul key={menu[i]} className='mobile-nav-list'>
              {
                menu.map(item => (
                  <li key={item} className='mobile-nav-list__item'>
                    <AnchorLink href='#reg-form' className='mobile-nav-list__link'>
                      {item}
                    </AnchorLink>
                  </li>
                ))
              }
            </ul>
          ))
        }
      </nav>
      <div 
        onClick={closeMenu}
        className='backdrop'
      ></div>
    </div>
  )
}

export default MobileNav