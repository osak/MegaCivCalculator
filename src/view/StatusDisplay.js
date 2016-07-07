/**
 * Created by osamu on 6/30/16.
 */

import React from 'react';

import Credit from './Credit';
import Adjuster from './Adjuster'

const STYLE = {
    background: 'lightgray',
    borderRadius: '5pt',
    lineHeight: '1.2em',
    display: 'flex'
};

const FLEX_ITEM = {
    marginRight: '10pt'
};

const BUTTON_STYLE = {
    backgroundColor: 'lightblue',
    border: 0,
    borderRadius: '5pt',
    boxShadow: '2pt 2pt 2pt #4040ff',
    marginLeft: '20pt'
};

const CREDIT_STYLE = {
    display: 'flex',
    flexDirection: 'row'
};

const CREDITS_STYLE = {
    display: 'flex',
    flexDirection: 'column'
};

export default class StatusDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    creditUpdater(type) {
        return ((amount) => this.props.creditUpdater(type, amount)).bind(this);
    }
    
    render() {
        return (
            <div style={STYLE}>
                <div style={FLEX_ITEM}>
                    <div>Total property: {this.props.totalProperty}</div>
                    <div>Total to buy: {this.props.totalToBuy}<button style={BUTTON_STYLE} onClick={this.props.buySelection}>Buy</button></div>
                    <div style={{fontWeight: 'bold', color: 'red'}}>Required treasure: {Math.max(0, this.props.totalToBuy - this.props.totalProperty)}</div>
                    <div>Victory Points: {this.props.victoryPoints}</div>
                </div>
                <div style={FLEX_ITEM}>
                    <div>{this.renderCredits()}</div>
                </div>
            </div>
        );
    }

    renderCredits() {
        let credits = Array.from(this.props.credits.entries(), ([type, amount]) =>
            <div style={CREDIT_STYLE}>
                <div style={{flexBasis: '4em', flexShrink: 0}}><Credit key={type.symbol} type={type} amount={amount} /></div>
                <div style={{height: '100%'}}><Adjuster color={type.color} stateUpdater={this.creditUpdater(type)} /></div>
            </div>
        );
        return (
            <div style={CREDITS_STYLE}>
                {credits}
            </div>
        );
    }
}
