import React, { Component } from 'react'
import { Grid, Form, Button, Header, Message, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {

    state = {

        email: '',
        password: '',
        errors: [],
        loading: false,

    };

    // method to display errors
    displayErrors = errors => errors.map((error, i, errors) => <p key={i}>{error.message}</p>)

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                });

        }

    }

    // checking to see if email and password exist
    isFormValid = ({ email, password }) => email && password;

    // method that handles each error per input
    handleInputError = (errors, inputName) => {

        // map through "some" of the errors array that includes 'inputName' and set 'error' string 
        // for className
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    render() {
        // Desctructoring to set state values to input values
        const {
            email,
            password,
            errors,
            loading
        } = this.state;
        return (

            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" icon color="violet" textAlign="center">
                            <Icon name="code branch" color="violet" />
                            Login to DevChat
                        </Header>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid name="email"
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={email}
                                    className={this.handleInputError(errors, 'email')}
                                    type="email"
                                />
                                <Form.Input
                                    fluid name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={password}
                                    className={this.handleInputError(errors, 'password')}
                                    type="password"
                                />
                                {/*  TOGGLE classname and disabled button on the loading state boolean */}
                                <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large" >Submit</Button>

                            </Segment>
                        </Form>
                        {errors.length > 0 && (
                            <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                        <Message>Don't have an account? <Link to="/register">Register here</Link></Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;
