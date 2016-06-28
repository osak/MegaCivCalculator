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
        return (stateDiff) => {
            this.props.updateHandler({
                cardHolderStates: [
                    {
                        index: cost,
                        value: [
                            {
                                index: kind,
                                value: stateDiff
                            }
                        ]
                    }
                ]
            });
        };
    }

    renderCardsOfCost(cost) {
        let cardHolders = this.props.cardHolderStates[cost].map((state, i) => {
            return (<CardHolder
                    updateHandler={this.cardHolderUpdater(cost, i).bind(this)}
                    maxNumber={10 - cost + 1}
                    selectedCount={state.selectedCount}
                    hoveringIndex={state.hoveringIndex}
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
