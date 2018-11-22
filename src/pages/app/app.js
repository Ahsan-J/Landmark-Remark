import React, { Component } from 'react';
import { connect } from 'react-redux'
import './style.css';
import f from './function.js'
import Map from '../../components/Map/Map.js'
import constants from '../../constant/config.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Map
          googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + constants.API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          dynamicMarkers
        />
      </div>
    );
  }
}



export default connect(f.mapStateToProps.bind(this), f.mapDispatchToProps.bind(this))(App);
