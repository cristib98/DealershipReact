import React from 'react'
import { Spring } from 'react-spring'
import { Link } from 'react-router-dom'

const CardContent = ({ carData }) => {
  // const contentLines = carData.generalData.map((line, i) => (
  //   <ContentLine
  //     key={line.title}
  //     title={line.title}
  //     value={line.value}
  //     delay={100 + 40 * i}
  //   />
  // ))
  const { id, name, hp, cc, year, transmission, category } = carData
  return (
    <div className='content-wrapper'>
      <Spring
        to={{ transform: 'scaleY(1)' }}
        from={{ transform: 'scaleY(0)' }}
        config={{ tension: 550, friction: 50, clamp: true }}
      >
        {props => (
           <Link to={`/inventory/car/${id}`} >
          <div className='content-section heading-main' style={props}>
            <span className='content-heading'>
              {name} <span className='subheading'></span>
            </span>
            <span className='subheading'></span>
          </div>
          </Link>
        )}
      </Spring>
      
      <div>
      <div  className='content-section content-line'>
          <span className='content-line-title'>An</span>
          <span className='content-line-value'>{year}</span>
        </div>
        <div  className='content-section content-line'>
          <span className='content-line-title'>Cai putere</span>
          <span className='content-line-value'>{hp}</span>
        </div>

        <div  className='content-section content-line'>
          <span className='content-line-title'>Capacitate clinidrcă</span>
          <span className='content-line-value'>{cc}</span>
        </div>
        <div  className='content-section content-line'>
          <span className='content-line-title'>Transmisie</span>
          <span className='content-line-value'>{transmission}</span>
        </div>
        <div  className='content-section content-line'>
          <span className='content-line-title'>Caroserie</span>
          <span className='content-line-value'>{category}</span>
        </div>
        
        
        </div>
    </div>
  )
}

const ContentLine = ({ title, value, delay }) => {
  return (
    <Spring
      to={{ transform: 'scaleY(1)' }}
      from={{ transform: 'scaleY(0)' }}
      config={{ tension: 550, friction: 50, clamp: true }}
      delay={delay}
    >
      {props => (
        <div style={props} className='content-section content-line'>
          <span className='content-line-title'>{title}</span>
          <span className='content-line-value'>{value}</span>
        </div>
      )}
    </Spring>
  )
}

export default CardContent
