/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

const BASE_STYLE = {
    width: '100pt',
    height: '150pt',
    border: '1px black solid',
    borderRadius: '3pt',
    display: 'inline-block',
    margin: '4pt'
};

export default class Civilization extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = Object.assign({}, BASE_STYLE);
        if (!this.props.buyable) {
            style.backgroundColor = 'lightgray';
        }
        return (
            <div style={style}>
                <h3>{this.props.name}</h3>
                <p>Cost: {this.props.cost}</p>
            </div>
        );
    }
}
