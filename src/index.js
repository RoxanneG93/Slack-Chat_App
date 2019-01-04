import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


// importing for router and creating root constant variable
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Root = () => (
    <Router>
        <Switch>
            {/* adding exact will allow the switch not to match multiple components  */}
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
