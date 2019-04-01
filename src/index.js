import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';
import Spinner from './Spinner';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


// importing for router and creating root constant variable
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';


// Setting up REDUX
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import { setUser, clearUser } from './actions';

// created entire state object from rootRedcuer
const store = createStore((rootReducer), composeWithDevTools());

class Root extends React.Component {

    // when root compoentnets run the FB listener for user sign in and redirect to home
    componentDidMount() {
        console.log(this.props.isLoading);
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                // using setUser action to set current user
                this.props.setUser(user);
                this.props.history.push('/');
            } else {
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }

    render() {
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                {/* adding exact will allow the switch not to match multiple components  */}
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );

    }
}

// function to assing loading state
const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
})


// *** NEED TO LOOK MORE  INTO THIS ****
// making use of history to redirect to home
// created RootWithAuth to wrap root using 'withRouter'
// connecting actions to components using connect from redux
const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));
// const RootWithAuth = withRouter(connect(null, { setUser })(Root));

// changed the render to display Router wraping the RootWithAuth
// will automatically redirect to home with user signed in
// Now using Redux will be wrapping Router with Provider
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

// if (module.hot) {
//     module.hot.accept();
// }
