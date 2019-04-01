import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';


class ColorPanel extends Component {
    render() {
        return (
            <Sidebar
                as={Menu}
                icon="Labeled"
                inverted
                verticle
                visible
                width="very thin"
            >
                <Divider />
                <Button icon="add" size="small" color="blue"></Button>

            </Sidebar>
        )
    }
}

export default ColorPanel;
