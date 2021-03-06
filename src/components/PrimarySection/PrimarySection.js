import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import './PrimarySection.sass'

const PrimarySection = () => {
  return (
    <section className='primary-section'>
      <div className='container'>
        <h1 className='primary-section__title'>
          Test assignment for Frontend Developer position
        </h1>
        <p className='primary-section__description'>
          We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens
        </p>
        <AnchorLink href='#reg-form' className='btn primary-section__sign-up'>Sign up now</AnchorLink>
      </div>
    </section>
  )
}

export default PrimarySection