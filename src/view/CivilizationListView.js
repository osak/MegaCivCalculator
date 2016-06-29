/**
 * Created by osak on 16/06/30.
 */

import React from 'react';

import CivilizationList from '../model/CivilizationList';

import Credit from './Credit';

export default class CivilizationListView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            borderCollapse: 'collapse'
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
        return CivilizationList.map((civ) => {
            let color1 = civ.discountBy[0].color;
            let color2 = (civ.discountBy[1] || civ.discountBy[0]).color;
            let style = {
                backgroundImage: 'linear-gradient(90deg, ' + color1 + ',' + color2 + ')'
            };
            return (
                <tr style={style}>
                    <td>{civ.discountedCost(this.props.credits)}</td>
                    <td>{civ.name}</td>
                    <td>{civ.description}</td>
                    <td>{this.renderCredits(civ.credits)}</td>
                    <td>{civ.victoryPoint}</td>
                </tr>
            )
        });
    }
    
    renderCredits(credits) {
        return credits.map((credit) => {
            return <Credit type={credit.type} amount={credit.amount} />;
        });
    }
}
