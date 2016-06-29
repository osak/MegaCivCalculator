/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

import Credits from '../model/CreditType';

import Civilization from './Civilization';

export default class CivilizationDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    clickHandler(i) {
        return (e) => {
            this.props.buyHandler(i);
        };
    }
    
    render() {
        let civs = this.props.civilizations.map((civ, i) => {
            return (
                <Civilization
                    name={civ.name}
                    cost={civ.cost}
                    buyable={civ.buyable}
                    credits={civ.credits}
                    discountBy={civ.discountBy}
                    clickHandler={this.clickHandler(i)}
                />
            );
        });
        return (
            <div>
                {this.renderCredits()}
                <div style={{display: 'table', borderCollapse: 'separate', borderSpacing: '2pt'}}>
                    {civs}
                </div>
            </div>
        );
    }

    renderCredits() {
        return Object.keys(this.props.credits).map((color) => {
            return (
                <span style={{marginRight: '10pt', color: Credits[color].color}}>
                    {Credits[color].symbol}: {this.props.credits[color]}
                </span>
            );
        });
    }
}
