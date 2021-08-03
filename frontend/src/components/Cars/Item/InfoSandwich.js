import React from 'react'
import { Spring } from 'react-spring'

const InfoSandwich = ({ delay, label, unit, value }) => {
  const normalStyle = {
    transform: 'scale(1)',
    opacity: 1
  }
  const initialStyle = {
    transform: 'scale(0)',
    opacity: 0
  }
  console.log("value = " + typeof(value))
  return (
    <Spring
      to={normalStyle}
      from={initialStyle}
      config={{ tension: 550, friction: 50 }}
      delay={delay}
    >
      {props => (
        <div style={props} className='info-sandwich'>
          <div className='info-content'>
            <div className='info-label'>{label}</div>
            <div>
              <Spring native
                from={{ number: 0 }}
                to={{ number: parseInt(value) }}
                config={{ duration: 370 }}
              >
                {props => (
                  <span className='info-value'>{Math.floor(props.number)}</span>
                )}
              </Spring>

              <span className='info-unit'>{unit}</span>
            </div>
          </div>
        </div>
      )}
    </Spring>
  )
}

export default InfoSandwich
