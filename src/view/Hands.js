/**
 * Created by osak on 16/06/28.
 */

import React from 'react';

import CardHolder from './CardHolder';

export default class Hands extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cardHolderByCost = [];
        for (var i = 1; i < this.props.cardHolderStates.length; ++i) {
            cardHolderByCost.push(this.renderCardsOfCost(i));
        }
        return (<div>
            {cardHolderByCost}
        </div>)
    }

    cardHolderUpdater(cost, kind) {
        return ((index) => {
            this.props.updateHandler(cost, kind, index);
        }).bind(this);
    }

    renderCardsOfCost(cost) {
        let cardHolders = this.props.cardHolderStates[cost].map((state, i) => {
            return (<CardHolder
                    updateHandler={this.cardHolderUpdater(cost, i)}
                    maxNumber={10 - cost + 1}
                    selectedCount={state.selectedCount}
                    totalProperty={state.totalProperty}
                    key={i}
                />
            );
        });
        return (
            <div>
                <h2>Cost {cost}</h2>
                {cardHolders}
            </div>
        );
    }
}
