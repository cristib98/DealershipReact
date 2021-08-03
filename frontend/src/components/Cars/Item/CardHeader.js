import React, { Fragment } from 'react'
import { Spring, config } from 'react-spring'
import InfoSandwich from './InfoSandwich'
import { MdClose, MdLocalGasStation } from 'react-icons/md'
import { Link } from 'react-router-dom'
export default class CardHeader extends React.Component {
  state = {
    isFuelInfoVisible: false
  }

  toggleMoreInfo = () => {
    this.setState({ isFuelInfoVisible: !this.state.isFuelInfoVisible })
  }

  render () {
    const { id, name, cc, hp, transmission, urlImage1} = this.props
    const { isFuelInfoVisible } = this.state
    const overlayOpacity = 0.9
    const ccString = toString(this.props.cc)  
    const hpString = toString(this.props.hp)
    const themeColorRGB = "187, 10, 48";

    const overlayStyle = {
      backgroundColor: `rgba(${themeColorRGB}, ${overlayOpacity})`
    }

    const overlayStyleZero = {
      backgroundColor: `rgba(${themeColorRGB}, 0)`
    }

    console.log(typeof(this.props.cc))

    return (
      <Fragment>
        <Spring
          to={isFuelInfoVisible ? overlayStyle : overlayStyleZero}
          config={config.fast}
        >
          {props => (
           
            <div className='top-wrapper' style={{ backgroundImage: `url(${urlImage1})` }}>
              <div className='top-section' style={props}>
                
              </div>
            </div>
           
          )}
        </Spring>
      </Fragment>
    )
  }
}

const CloseButton = props => {
  const springConfig = { tension: 500, friction: 20, clamp: true }
  return (
    <Spring
      to={{ transform: 'rotate(0deg)' }}
      from={{ transform: 'rotate(45deg)' }}
      config={springConfig}
    >
      {props => <MdClose style={props} />}
    </Spring>
  )
}

const MoreButton = props => {
  const springConfig = { tension: 500, friction: 20, clamp: true }
  return (
    <Spring
      to={{ transform: 'scaleX(1)' }}
      from={{ transform: 'scaleX(0)' }}
      config={springConfig}
    >
      {props => <MdLocalGasStation style={props} />}
    </Spring>
  )
}
