import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import f from './function.js'
import './style.css'
import _ from 'lodash'

class myMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
      markers: [],
      activeMarker : 0,
    }
    // Binding Functions
    this.componentWillMount = f.componentWillMount.bind(this);
    this.onMapClick = f.onMapClick.bind(this);
    this.markerPlacer = f.markerPlacer.bind(this);
    this.addNote = f.addNote.bind(this);
    this.deleteMarker = f.deleteMarker.bind(this);
    this.renderNote = f.renderNote.bind(this);
    this.renderPositon = f.renderPositon.bind(this);
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        onClick={this.onMapClick}
        center={{ lat: this.state.lat, lng: this.state.lng }}
      >
        {this.props.dynamicMarkers ?
          _.map(this.state.markers, this.markerPlacer)
          : null}
        {/* Modal to add the Note */}
        <div className="modal fade" id="noteModal" tabIndex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="noteModalLabel">Note to the recently selected marker</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea className="form-control" rows="3" placeholder="Wrte a note ..." ref={(noteRef) => this.noteRef = noteRef}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNote}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* Text View to show the data of a marker */}
        <div className="cardWrapper col-md-3">
          <div className="card border-primary" style={{maxWidth: '20rem'}}>
            <div className="card-header">
            {this.renderPositon()}
            </div>
            <div className="card-body">
              {this.renderNote()}
            </div>
          </div>
        </div>
      </GoogleMap>
    )
  }
}


export default withScriptjs(withGoogleMap(myMap))
