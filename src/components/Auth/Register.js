import React, { Component } from 'react'
import { Grid, Form, Button, Header, Message, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: [],
        loading: false
    };


    // form Validation 
    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            // throw err
            error = { message: 'Fill in all feilds' }
            // merges the two errors arrays and sets state errors array
            this.setState({ errors: errors.concat(error) })
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            // throw err
            error = { message: "Password is invalid" };
            this.setState({ errors: errors.concat(error) })
            return false
        } else {
            // form valid!!!
            return true;
        }
    }

    // will return true if the state properties lengths are 0
    isFormEmpty = ({ username, email, password, passwordConfirm }) => {
        return !username.length || !email.length || !password.length
            || !passwordConfirm.length;
    }


    // *** Wanna refactor this ****
    // password match validation
    isPasswordValid = ({ password, passwordConfirm }) => {
        // firebase requires password lenght greater then 6 char
        if (password.lenth < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm) {
            return false
        } else {

            return true;
        }
    }

    // method to display errors
    displayErrors = errors => errors.map((error, i, errors) => <p key={i}>{error.message}</p>)

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true });

            firebase
                .auth()
                .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser)
                    this.setState({ loading: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    });
                });
        }

    }

    // method that handles each error per input
    handleInputError = (errors, inputName) => {

        // map through "some" of the errors array that includes 'inputName' and set 'error' string 
        // for className
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    render() {
        // Desctructoring to set state values to input values
        const {
            username,
            email,
            password,
            passwordConfirm,
            errors,
            loading
        } = this.state;
        return (

            <div>
                <Grid textAlign="center" verticalAlign="middle" className="app">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" icon color="orange" textAlign="center">
                            <Icon name="puzzle piece" color="orange" />
                            Register for DevChat
                        </Header>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid name="username"
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    value={username}
                                    type="text"

                                />
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
                                <Form.Input
                                    fluid name="passwordConfirm"
                                    icon="repeat"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    value={passwordConfirm}
                                    className={this.handleInputError(errors, 'password')}
                                    type="password"
                                />
                                {/*  TOGGLE classname and disabled button on the loading state boolean */}
                                <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large" >Submit</Button>

                            </Segment>
                        </Form>
                        {errors.length > 0 && (
                            <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                        <Message>Already a have an account? <Link to="/login">Login here</Link></Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Register;

