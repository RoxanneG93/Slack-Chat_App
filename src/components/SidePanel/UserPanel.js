import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

import { connect } from 'react-redux';

class UserPanel extends Component {

    // initial state
    state = {
        user: this.props.currentUser,

    }

    // will mount current user to set userPanel state
    // componentWillreceiveProps(nextProps) {
    //     this.setState({ user: nextProps.currentUser });
    // }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user && this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        },
    ]

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("signed out"));
    }

    render() {
        //  Logs current user from props
        console.log(this.props.currentUser);


        const { user } = this.state;

        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/*  App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                        <Header style={{ padding: '0.25em' }} as="h4" inverted>
                            {/* User DropDown */}
                            <Dropdown
                                trigger={
                                    <span>
                                        <Image src={user.photoURL} spaced="right" avatar />
                                        {this.state.user.displayName}
                                    </span>}
                                options={this.dropdownOptions()}
                            />
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

// grab current user from global state and set component UserPanel state to props
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);
