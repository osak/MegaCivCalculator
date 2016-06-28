/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

import Civilization from './Civilization';

export default class CivilizationDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let civs = this.props.civilizations.map((civ) => {
            return (
                <Civilization
                    name={civ.name}
                    cost={civ.cost}
                    buyable={civ.buyable}
                />
            );
        });
        return (
            <div>
                {civs}
            </div>
        );
    }
}
