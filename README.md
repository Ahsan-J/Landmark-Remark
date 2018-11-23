This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## About the Project

### Brief requirement detail

The Application `Landmark Remark` is a simple single page application in which a user can view and add the Markers over Google map with a **Note**. Following are the basic functionalities this application can cover:

 - A user can save these notes (single note over a single marker) and let the other users of the application see this marker with his written note on it. 
 - A user's Marker is protected over the Application, Means only the user that wrote that note can change or delete that note. 
 - A user can also search for the notes written by his or other users over the application and access its note and address.
 - By default a marker is shown which only stays there to show the user his/her location.
 - Each marker can be identified uniquely on the basis of user name, location and note.

### Libraries used

- [react-google-maps](https://github.com/tomchentw/react-google-maps/)
- Firebase 

Project is hosted at https://tcig-landmarkremark.firebaseapp.com

### How much time is consumed

The Application uses the Google map API to render the map, which before developing the project I had no such experience for using the Google map using the API instead of integrating through iframes. Exploring the best possible ways to handle the requirement took a lot of time. Thanks to `react-google-maps` easy integration which made it possible to easily achivce the basic requirements of the application.
- Architecture Setup (2.5 h from sratch)
- Research and map implementation (4h)
- Achiving the requirements (4.5h)

### Issues or Limitation

Throughout the development process the application is limited to the following known issues.

- A user name is saved on the browser instead of a proper server which has a limitiation of 1 user per browser (instead if he opens in Incognito\Private mode of the browser)
- Google map API key is limited to the usage for Development purpose only. 
- A user location could marker is the same as the other markers but with a title of "My Location" on it.
