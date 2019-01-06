import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

import { connect } from 'react-redux';

class UserPanel extends Component {

    // inital state
    state = {
        user: null,

    }

    // will mount current user to set userPanel state
    componentWillreceiveProps(nextProps) {
        this.setState({ user: nextProps.currentUser });
    }

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
        // console.log(this.props.currentUser);

        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/*  App Header */}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code" />
                            <Header.Content>DevChat</Header.Content>
                        </Header>
                    </Grid.Row>
                    {/* User DropDown */}
                    <Header style={{ padding: '0.25em' }} as="h4" inverted>
                        <Dropdown trigger={<span>User</span>} options={this.dropdownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel);
