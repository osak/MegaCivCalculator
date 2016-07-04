/**
 * Created by osak on 16/06/30.
 */

import React from 'react';

import Credit from './Credit';

export default class CivilizationListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: null
        };
    }
    
    rowHoverChanger(index) {
        return ((e) => this.setState({hovering: index})).bind(this);
    }

    rowClickHandler(civ) {
        return ((e) => this.props.setSelectionState(civ, !this.props.isSelected(civ))).bind(this);
    }

    render() {
        let style = {
            borderCollapse: 'collapse',
            width: '100%'
        };
        return (
            <table style={style}>
                <thead>
                <tr>
                    <th>Cost</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Credits</th>
                    <th>VP</th>
                </tr>
                </thead>
                <tbody>
                {this.renderTableBody()}
                </tbody>
            </table>
        )
    }

    renderTableBody() {
        return this.props.civilizations.map((civ, i) => {
            let color1 = civ.discountBy[0].color;
            let color2 = (civ.discountBy[1] || civ.discountBy[0]).color;
            let style = {
                backgroundImage: 'linear-gradient(90deg, ' + color1 + ',' + color2 + ')',
                boxSizing: 'border-box'
            };
            if (!this.props.isBuyable(civ)) {
                style.opacity = 0.5;
            }
            if (this.props.isSelected(civ)) {
                style.boxShadow = 'inset 0 0 0 2px red';
            } else if (this.state.hovering == i) {
                style.boxShadow = 'inset 0 0 0 2px gray'
            }
            return (
                <tr style={style}
                    onMouseEnter={this.rowHoverChanger(i)}
                    onMouseLeave={this.rowHoverChanger(null)}
                    onClick={this.rowClickHandler(civ)}>
                    <td>{this.props.costCalculator(civ)}</td>
                    <td>{civ.name}</td>
                    <td>{civ.description}</td>
                    <td>{this.renderCredits(civ.credits)}</td>
                    <td>{civ.victoryPoint}</td>
                </tr>
            )
        });
    }
    
    renderCredits(credits) {
        return Array.from(credits.entries(), ([type, amount]) =>
            <Credit type={type} amount={amount} />
        );
    }
}
