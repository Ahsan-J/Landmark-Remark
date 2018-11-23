import React, { Component } from 'react';
import { connect } from 'react-redux'
import './style.css';
import f from './function.js'
import Map from '../../components/Map/Map.js'
import constants from '../../constant/config.js'
import { fetchMarkersFromFirebase, addMarkersToFirebase } from '../../helpers/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      markers: [],
      activeMarker: 0,
      searchInput: '',
      currentUser : '',
      // person : prompt("Please enter your name", "")
    }
    // Binding LifeCycle Methods
    this.componentWillMount = f.componentWillMount.bind(this);
    this.componentDidMount = f.componentDidMount.bind(this);
    // Binding Functions
    this.onMapClick = f.onMapClick.bind(this);
    this.markerPlacer = f.markerPlacer.bind(this);
    this.addNote = f.addNote.bind(this);
    this.editNote = f.editNote.bind(this);
    this.editNoteModal = f.editNoteModal.bind(this);
    this.deleteMarker = f.deleteMarker.bind(this);
    this.renderNote = f.renderNote.bind(this);
    this.renderSearchResults = f.renderSearchResults.bind(this);
    this.searchOutput = f.searchOutput.bind(this);
    this.renderPositon = f.renderPositon.bind(this);
    // External Functions
    this.fetchMarkersFromFirebase = fetchMarkersFromFirebase.bind(this);
    this.addMarkersToFirebase = addMarkersToFirebase.bind(this);
  }
  render() {
    return (
      <div>
        <Map
          googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + constants.API_KEY + "&v=3.exp&libraries=geometry,drawing,places"}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={this.state.markers}
          onMapClick={this.onMapClick}
          markerPlacer={this.markerPlacer}
          renderMyLocation
          center={{ lat: this.state.lat, lng: this.state.lng }} />

        {/* Text View to show the data of a marker */}
        <div className="cardWrapper col-md-3">
          <div className="card border-primary" style={{ maxWidth: '20rem' }}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" value={this.state.searchInput} onChange={(e) => this.setState({ searchInput: e.target.value })} />
              <div className="search-list-wrapper">
                <div className="list-group">
                  {this.renderSearchResults()}
                </div>
              </div>
            </div>
            <div className="card-header">
              {this.renderPositon()}
            </div>
            <div className="card-body">
              {this.renderNote()}
            </div>
          </div>
        </div>

        {/* Modal to add the Note */}
        <div className="modal fade" id="addNoteModal" tabIndex="-1" role="dialog" aria-labelledby="addNoteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addNoteModalLabel">Note to the recently selected marker</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea className="form-control" rows="3" placeholder="Wrte a note ..." ref={(addNoteRef) => this.addNoteRef = addNoteRef}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNote}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal to edit the Note */}
        <div className="modal fade" id="editNoteModal" tabIndex="-1" role="dialog" aria-labelledby="editNoteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editNoteModalLabel">Note to the recently selected marker</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea className="form-control" rows="3" placeholder="Wrte a note ..." ref={(editNoteRef) => this.editNoteRef = editNoteRef}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editNote}>Edit changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(f.mapStateToProps.bind(this), f.mapDispatchToProps.bind(this))(App);
