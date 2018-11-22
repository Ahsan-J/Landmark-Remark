import React from 'react'
import { Marker } from 'react-google-maps'
import _ from 'lodash'

export default {

  /**********************LifeCycle Components in Order **********************************/
  componentWillMount: function () {
    if (!_.isUndefined(navigator.geolocation)) {
      navigator.geolocation.getCurrentPosition((position) => {
        let temp = [];
        temp.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          note: 'Ahsan',
        })

        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          markers: temp
        })
      })
    }
  },
  /***********************Additonal Functions to be used within component ***************/

  onMapClick: function (e) {
    let temp = this.state.markers;
    let lastMarker = temp.pop();

    if (!_.isUndefined(lastMarker) && !_.isEmpty(lastMarker.note)) {
      temp.push(lastMarker);
    }

    temp.push({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      note: '',
    })

    this.setState({ markers: temp, activeMarker: temp.length - 1 })
  },

  markerPlacer: function (value, index) {
    return (
      <Marker key={JSON.stringify(value) + index} position={{ lat: value.lat, lng: value.lng }} onClick={() => this.setState({ activeMarker: index })} />
    );
  },

  addNote: function () {
    let temp = this.state.markers;
    let lastMarker = temp.pop();

    if (_.isUndefined(lastMarker)) {
      alert("Seems like you didn't placed any marker");
      this.noteRef.value = "";
      return
    }

    temp.push({
      ...lastMarker,
      note: this.noteRef.value
    })

    this.noteRef.value = "";

    this.setState({ markers: temp })
  },

  deleteMarker : function () {
    let temp = this.state.markers;
    temp.splice(this.state.activeMarker, 1);
    this.setState({ markers: temp })
  },

  editNote : function () {
    this.noteRef.value = this.state.markers[this.state.activeMarker].note;
  },

  renderNote: function () {
    if (_.size(this.state.markers) > 0) {
      if (_.isEmpty(this.state.markers[this.state.activeMarker].note)) {
        return (
          <div>
            <p className="add-note" onClick={() => this.addNote()} data-toggle="modal" data-target="#noteModal">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Note
            </p>
          </div>
        )
      } else {
        return (
          <div>
            <div className="btn-group pull-right" style={{ display: 'block' }} role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-success" onClick={()=> this.editNote()}>
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={()=> this.deleteMarker()}>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
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