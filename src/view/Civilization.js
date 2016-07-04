/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

import Credits from '../model/CreditType';

const BASE_STYLE = {
    width: '100pt',
    height: '150pt',
    border: '1px black solid',
    borderRadius: '3pt',
    display: 'table-cell',
    margin: '4pt'
};


export default class Civilization extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = Object.assign({}, BASE_STYLE);
        let color1 = Credits[this.props.discountBy[0]].color;
        let color2 = this.props.discountBy.length > 1 ? Credits[this.props.discountBy[1]].color : color1;
        style.backgroundImage = 'linear-gradient(90deg,' + color1 + ',' + color2 + ')';
        if (!this.props.buyable) {
            style.opacity = 0.3;
        }
        return (
            <div style={style} onClick={this.props.clickHandler}>
                <h3>{this.props.name}</h3>
                <p>Cost: {this.props.cost}</p>
                {this.renderCredit()}
            </div>
        );
    }

    renderCredit() {
        return this.props.credits.map((credit) => {
            let spec = Credits[credit.color];
            return (
                <span style={{color: spec.color, display: 'block'}}>{spec.symbol}: {credit.amount}</span>
            );
        });
    }
}
