import React, { Component } from 'react'
import { Grid, Form, Segemnt, Button, Header, Message, Icon, Segment } from 'semantic-ui-react';

class Register extends Component {

    state = {};

    handleChange = () => { };

    render() {
        return (
            <div>
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" icon color="orange" textAlign="center">
                            <Icon name="puzzle piece" color="orange" />
                            Register for DevChat
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid name="username"
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    type="text"
                                />
                                <Form.Input
                                    fluid name="email"
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    type="email"
                                />
                                <Form.Input
                                    fluid name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    type="password"
                                />
                                <Form.Input
                                    fluid name="passwordConfirm"
                                    icon="repeat"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    type="password"
                                />
                                <Button color="orange" fluid size="large">Submit</Button>

                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Register;

