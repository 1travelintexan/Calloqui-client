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
