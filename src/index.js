import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


// importing for router and creating root constant variable
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';


// Setting up REDUX
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(() => { }, composeWithDevTools());

class Root extends React.Component {

    // when root compoentnets run the FB listener for user sign in and redirect to home
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                // setUser(user)
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <Switch>
                {/* adding exact will allow the switch not to match multiple components  */}
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )

    }
}

// *** NEED TO LOOK MORE  INTO THIS ****
// making use of history to redirect to home
// created RootWithAuth to wrap root using 'withRouter'
const RootWithAuth = withRouter(Root);

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
