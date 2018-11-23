import firebase from 'firebase'
import config from '../constant/config';

firebase.initializeApp(config.FIREBASE_CONFIG);

let db = firebase.database().refFromURL('https://tcig-landmarkremark.firebaseio.com/')

export default firebase;

export function fetchMarkersFromFirebase() {
  let markerRef = db.child('markers');
  markerRef.on('value',(snapshot)=>{
    this.setState({
      markers : snapshot.val()
    })
  })
}

export function addMarkersToFirebase () {
  let markerRef = db.child('markers');
  markerRef.set(this.state.markers)
}
