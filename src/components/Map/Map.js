import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import './style.css'
import _ from 'lodash'

class myMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        onClick={this.props.onMapClick}
        center={this.props.center}
      >
        <Marker
          position={{ lat: this.state.latitude, lng: this.state.longitude }}
          title="My Location"
           />
        {_.map(this.props.markers, this.props.markerPlacer)}
      </GoogleMap>
    )
  }
}


export default withScriptjs(withGoogleMap(myMap))
