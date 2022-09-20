# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Calloqui

Description
This is a simple but usefull app that will allow everyone to post and host events, around the world. You create an event and anyone on the app can choose to attend, and comment of the post.

User Stories
-404 page: anyone will see our custom 404 page when they attempt to go to a page that doesnt exist
-Signup: Anyone can signup with an email and password, and then can create, attend or comment on existing events.
-Login: As a user, I can login to the platform to see my events and scroll through others
-Logout: As a user, I can logout from the platform until I choose to return.
-Add Event: As a user, I can add a new event with date, time, activity and location.
-List Events: As a user, I can see a list of all the events near me.

Backlog
-See all events on a map

Client
Routes

- '/' - home page
  -'/auth/signup' - Signup page
  -'/auth/login' - Login page
  -'/events' - List of events page
  -'/events/create' - Create an Event
  -'/events/:id - Event detail page
  -404 page - all other routes end here

Pages

- Home page (public)
- Signup page (public)
- Signin page (public)
- Events list page (user)
- Event create page (user)
- Event detail page (user)
- 404 page

## Components

Services
Auth Service

- Auth.login(user)
- Auth.signup(user)
- Auth.logout()
  Restaurant Service
- Event.list()
- Event.create(data)
- Event.detail(id)
- Event.delete(id)

Server
Models

User model
username - String // required
email - String // required & unique
password - String // required

Event model
owner - ObjectID<User> // required
name - String // required
description - String
location- String

<=======================================leaflet map api steps=======================>
-npm i leaflet react-leaflet

-change package.json BrowserList to this:
"browserslist": [
">0.2%",
"not dead",
"not op_mini all"
]

-add this to you html head:

   <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
      crossorigin=""
    />

-add this to the html body:

 <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
   integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
   crossorigin=""></script>

create component for map, import these:
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
map container needs these to work, also add a className that gives the container and height and width. (Otherwise it wont show)
<MapContainer
center={[lat, lon]}
zoom={13}
scrollWheelZoom={false} >
TileLayer is next: It needs an attribution and url from a tile provider. In this case open street map
<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
The Marker and popup are a nice touch and require the position attribute to work:
<Marker position={[lat, lon]}>
<Popup>
Great spot choice! <br /> Catch some waves.
</Popup>
</Marker>
<=========================Now the api for the lon and lat============>
-Open weather map api is free and easy to setup.

-Create an account and request a key

-Afterwards you can make a request like this: (city is from an input and appid is the key from the Open weather map api)
let coordinates = await axios.get(
`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
);
After you get your data the lat and lon with be in the FIRST index of the array with the key of lat & lon
ex: lat: coordinates.data[0].lat,
lon: coordinates.data[0].lon,

-store those values in your DB and then set the center of the MapContainer component and the position of the marker.
