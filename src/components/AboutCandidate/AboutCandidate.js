import React from 'react'
import './AboutCandidate.sass'
import { ReactComponent as ManLaptop } from '../../assets/img/man-laptop-v1.svg'

const AboutCandidate = () => {
  return (
    <section className='about-candidate'>
      <div className='container'>
        <h1 className='about-candidate__title'>
          Let's get acquainted
        </h1>
        <div className='candidate-content'>
          <ManLaptop className='candidate-content__laptop-img' />
          <div className='candidate-txt'>
            <h2 className='candidate-txt__title'>
              I am cool frontend developer
            </h2>
            <p className='candidate-txt__description'>
              We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
            </p>
            <p className='candidate-txt__description'>
              If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3. 
            </p>
            <a className='candidate-txt__link' href='##'>
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCandidate