/**
 * Created by osak on 16/07/08.
 */

import React from 'react';

export default class Adjuster extends React.Component {
    constructor(props) {
        super(props);
    }

    generateUpdater(val) {
        return ((e) => this.props.stateUpdater(val)).bind(this);
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{marginRight: '2pt'}}>{this.renderButton('+', this.generateUpdater(5))}</div>
                <div>{this.renderButton('-', this.generateUpdater(-5))}</div>
            </div>
        );
    }

    renderButton(text, handler) {
        let buttonStyle = {
            backgroundColor: this.props.color,
            borderRadius: '5pt',
            border: '1px black solid',
            height: '90%',
            fontSize: '100%'
        };
        return (
            <div>
                <button style={buttonStyle} onClick={handler}>{text}</button>
            </div>
        );
    }
}
