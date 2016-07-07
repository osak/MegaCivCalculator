/**
 * Created by osak on 16/06/30.
 */

import React from 'react';

import Credit from './Credit';
import CivilizationView from './CivilizationView'

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
            width: '100%',
            listStyle: 'none',
            paddingLeft: 0
        };
        return (
            <ul style={style}>
                {this.renderBody()}
            </ul>
        )
    }

    renderBody() {
        return this.props.civilizations.map((civ, i) => {
            let needsWrap = !this.props.isBuyable(civ);
            let style = {};
            if (this.props.isSelected(civ)) {
                style.border = '2pt solid red';
            } else {
                style.border = '2pt solid transparent';
            }
            return (
                <li style={style} onClick={this.rowClickHandler(civ)} key={i}>
                    {this.renderCard(civ, needsWrap)}
                </li>
            )
        });
    }

    renderCard(civ, needsWrap) {
        let main = <CivilizationView costCalculator={this.props.costCalculator} civilization={civ} />;
        if (needsWrap) {
            return <div style={{backgroundColor: 'gray'}}><div style={{opacity: 0.5}}>{main}</div></div>;
        } else {
            return main;
        }
    }
}
