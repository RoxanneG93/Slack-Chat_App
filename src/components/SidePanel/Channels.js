import React, { Component } from 'react'
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';



class Channels extends Component {


    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        // creating state property for channels to store in FB
        channelsRef: firebase.database().ref('channels'),
        modal: false,
        firstLoad: true
    }

    // Loads channels when components loads
    componentDidMount() {
        this.addListeners();
    }

    // will remove channelsref listener
    componentWillUnmount() {
        this.removeListeners();
    }



    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
        })
    }


    // Need tolook more into this off method from FB
    removeListeners() {
        this.state.channelsRef.off();
    }


    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        // if first load is true and there are channels
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);

        }
        // then setState to false
        this.setState({ firstLoad: false });
    }

    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state;

        // will use the push method and grab the key value to give us a unique key per channel
        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };

        channelsRef.child(key).update(newChannel).then(() => {
            this.setState({ chanelName: '', channelDetails: '' });
            this.closeModal();
            console.log('channel added');
        })
            .catch(err => {
                console.error(err);
            });

    }

    // method to display channels
    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{ opacity: 0.7 }}
                active={channel.id == this.state.activeChannel}
            >
                # {channel.name}


            </Menu.Item>
        ))
    )

    // method to set active channel
    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id });
    }

    // method to change the channel
    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
    }

    // fucntion to take in user value in form input and setState
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        // what is this doing? returning true if this.state exists???
        if (this.isFormValid(this.state)) {
            console.log('form is valid');
            this.addChannel();
        }
    }

    // method that checks that there are both inputs in form filled out
    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

    // function to open Modal
    openModal = () => this.setState({ modal: true });

    // function to close Modal
    closeModal = () => this.setState({ modal: false });

    render() {

        const { channels, modal } = this.state;
        return (

            // React.Fragment lets us group together multple componenets in one file
            <React.Fragment>
                {/* <div> */}
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" /> CHANNELS
                </span>{" "}
                        ({channels.length}) <Icon name="add" onClick={this.openModal} />
                    </Menu.Item>
                    {/* Here we'll display channels */}
                    {this.displayChannels(channels)}
                </Menu.Menu>

                {/* Add Channel Modal */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name of Channel"
                                    name="channelName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="channelDetails"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark" /> Add
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal} >
                            <Icon name="remove" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
                {/* </div> */}
            </React.Fragment>

        )
    }
}

// connecting component to redux
// Setting mapStateToProps to null, and getting setCurrentChannel from redux?
export default connect(null, { setCurrentChannel })(Channels);
