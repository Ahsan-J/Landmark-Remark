import React from 'react'
import { Marker } from 'react-google-maps'
import _ from 'lodash'

export default {

  /**********************LifeCycle Components in Order **********************************/
  componentWillMount: function () {
    if (!_.isUndefined(navigator.geolocation)) {
      navigator.geolocation.getCurrentPosition((position) => {
        let temp = [];
        let user = "";
        
        if (_.isNull(localStorage.getItem("username"))) {
          while (_.isEmpty(user)) {
            user = prompt("Please enter your name").trim()
          }
          localStorage.setItem("username", user)
        } else {
          user = localStorage.getItem("username")
        }
        
        temp.push({
          id: temp.length,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          note: '',
          user,
        })
        
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          markers: temp,
          currentUser: user,
        })
      })
    }
  },
  
  componentDidMount: function () {
    
  },
  /***********************Additonal Functions to be used within component ***************/

  onMapClick: function (e) {
    let temp = this.state.markers;
    let lastMarker = temp.pop();

    if (!_.isUndefined(lastMarker) && !_.isEmpty(lastMarker.note)) {
      temp.push(lastMarker);
    }

    temp.push({
      id: temp.length,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      user: this.state.currentUser,
      note: '',
    })

    this.setState({ markers: temp, activeMarker: temp.length - 1, searchInput: '' })
  },

  markerPlacer: function (value, index) {
    return (
      <Marker key={JSON.stringify(value) + index} title={value.user} position={{ lat: value.lat, lng: value.lng }} onClick={() => this.setState({ activeMarker: index })} />
    );
  },

  addNote: function () {
    let temp = this.state.markers;
    let lastMarker = temp.pop();

    if (_.isUndefined(lastMarker)) {
      alert("Seems like you didn't placed any markers yet");
      this.addNoteRef.value = "";
      return
    }

    temp.push({
      ...lastMarker,
      user: this.state.currentUser,
      note: this.addNoteRef.value.trim()
    })

    this.addNoteRef.value = "";
    this.addMarkersToFirebase();
  },

  deleteMarker: function () {
    let temp = this.state.markers;
    temp.splice(this.state.activeMarker, 1);
    this.addMarkersToFirebase();
  },

  editNoteModal: function () {
    let temp = this.state.markers;
    this.editNoteRef.value = temp[this.state.activeMarker].note;
  },

  editNote: function () {
    let temp = this.state.markers;
    temp[this.state.activeMarker].note = this.editNoteRef.value;
    this.editNoteRef.value = "";
    this.addMarkersToFirebase();
  },

  searchOutput : function (id) {
    console.log(id);
    this.setState({
      lat: this.state.markers[id].lat,
      lng: this.state.markers[id].lng,
      activeMarker : id,
      searchInput : '',
    })
  },

  renderSearchResults: function () {
    if (_.size(this.state.markers) > 0 && !_.isEmpty(this.state.searchInput)) {
      return _.map(_.filter(this.state.markers, (marker) => {
        return marker.note.trim().toLowerCase().includes(this.state.searchInput.toLowerCase()) || marker.user.trim().toLowerCase().includes(this.state.searchInput.toLowerCase())
      }), (listItems) => {
        return <span onClick={()=> this.searchOutput(listItems.id)} key={JSON.stringify(listItems)} className="list-group-item list-group-item-action search-item">{listItems.note}</span>
      })
    }
  },

  renderNote: function () {
    if (_.size(this.state.markers) > 0) {
      if (_.isEmpty(this.state.markers[this.state.activeMarker].note)) {
        return (
          <div>
            <p className="add-note" onClick={() => this.addNote()} data-toggle="modal" data-target="#addNoteModal">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Note
            </p>
          </div>
        )
      } else {
        return (
          <div>
            <div className="pull-left">
              <p>Marked by: {this.state.markers[this.state.activeMarker].user}</p>
            </div>
            {(this.state.markers[this.state.activeMarker].user == this.state.currentUser) ?
              <div className="btn-group pull-right" style={{ display: 'block' }} role="group" aria-label="Basic example">
                <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#editNoteModal" onClick={() => this.editNoteModal()}>
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={() => this.deleteMarker()}>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </div>
              : null
            }
            <div className="note-text-wrapper">
              <p className="note-text">{this.state.markers[this.state.activeMarker].note}</p>
            </div>
          </div>
        )
      }
    }
  },

  renderPositon: function () {
    if (_.size(this.state.markers) > 0) {
      return (
        <span>
          Position: Latitude: {this.state.markers[this.state.activeMarker].lat.toFixed(2)} Longitude : {this.state.markers[this.state.activeMarker].lng.toFixed(2)}
        </span>
      )
    }
  },

  /**********************Connecting and defining the Redux ******************************/
  mapStateToProps: function (state) {
    return {

    }
  },

  mapDispatchToProps: function (dispatch) {
    return {

    }
  },
}

// Local functions limitng to only this component