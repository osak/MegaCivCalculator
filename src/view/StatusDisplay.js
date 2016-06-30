/**
 * Created by osamu on 6/30/16.
 */

import React from 'react';

import Credit from './Credit';

const STYLE = {
    background: 'lightgray',
    borderRadius: '5pt'
};

const BUTTON_STYLE = {
    backgroundColor: 'lightblue',
    border: 0,
    borderRadius: '5pt',
    boxShadow: '2pt 2pt 2pt #4040ff',
    marginLeft: '20pt'
};

export default class StatusDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={STYLE}>
                <div>Total property: {this.props.totalProperty}</div>
                <div>Total to buy: {this.props.totalToBuy}<button style={BUTTON_STYLE} onClick={this.props.buySelection}>Buy</button></div>
                <div>Credits: {this.renderCredits()}</div>
            </div>
        );
    }

    renderCredits() {
        let result = [];
        for (let entry of this.props.credits.entries()) {
            result.push(<Credit key={entry[0].symbol} type={entry[0]} amount={entry[1]} />);
        }
        return result;
    }
}
