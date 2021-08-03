import React, { Fragment } from 'react'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
export default class MainCard extends React.Component {
  state = {
    carData: {},
    finishedLoading: true
  }

  componentDidMount() {
    this.setState({ carData: this.props.data });

  }

  render() {
    const finishedLoading = this.state.finishedLoading
    const { id, name, cc, hp, urlImage1, transmission } = this.state.carData
    return (
      <Fragment>
        <div className='main-card-wrapper'>
          {finishedLoading ? (
            <Fragment>
              <CardHeader
                id={this.props.data.id}
                name={name}
                cc={this.props.data.cc}
                hp={this.props.data.hp}
                transmission={transmission}
                urlImage1={urlImage1}
                themeColorRGB="25, 25, 25" />
              <CardContent carData={this.state.carData} />
              
              
            </Fragment>

          ) : ('Loading...')}
          {/* <Link to={`/inventory/car/${this.props.data.id}`} className="detalii">
            <Button variant="primary" size="lg" block>
            Accesați
            </Button>
          </Link> */}
          </div>
      </Fragment>
    )
  }
}
