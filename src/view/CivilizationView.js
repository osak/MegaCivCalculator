/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

import Credit from './Credit';

const CARD_STYLE = {
    border: '2pt solid lightgray'
};

const COST_STYLE = {
    borderRadius: '50%',
    border: '2pt solid white',
    boxShadow: '2pt gray',
    padding: '2pt',
    backgroundColor: '#e0e0e0',
    float: 'left',
};

const NAME_STYLE = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
};

const BOTTOM_ROW_STYLE = {
    display: 'flex',
    justifyContent: 'space-between'
};

const VP_STYLE = {
    backgroundColor: '#e0e0e0',
    border: '2pt solid white',
    borderRadius: '2pt',
    font: 'bold 1.2em serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexBasis: '32pt',
    flexGrow: 0,
    flexShrink: 0,
};

const DESCRIPTION_STYLE = {
    padding: '0 3pt 0 3pt'
};

const CREDITS_STYLE = {
    backgroundColor: '#e0e0e0'
};

export default class Civilization extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let civ = this.props.civilization;
        let color1 = civ.discountBy[0].color;
        let color2 = (civ.discountBy[1] || civ.discountBy[0]).color;
        let topRowStyle = {
            backgroundImage: 'linear-gradient(90deg, ' + color1 + ',' + color2 + ')',
            boxSizing: 'border-box',
            borderBottom: '2px ridge white'
        };

        return (
            <div style={CARD_STYLE}>
                <div style={topRowStyle}>
                    <div style={COST_STYLE}>{this.props.costCalculator(civ)}</div>
                    <div style={NAME_STYLE}>{civ.name}</div>
                </div>
                <div style={BOTTOM_ROW_STYLE}>
                    <div style={VP_STYLE}>{civ.victoryPoint}</div>
                    <div style={DESCRIPTION_STYLE}>{civ.description}</div>
                    <div style={CREDITS_STYLE}>{this.renderBonusCredits()}</div>
                </div>
            </div>
        );
    }

    renderBonusCredits() {
        return Array.from(this.props.civilization.credits.entries(), ([type, amount]) => {
            return (
                <div>
                    <Credit type={type} amount={amount} />
                </div>
            );
        });
    }
}
