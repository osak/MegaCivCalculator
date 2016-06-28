import React from 'react';
import ReactDOM from 'react-dom';

import CivilizationList from './CivilizationList';
import PropertyUtil from './PropertyUtil';

import Hands from './Hands';
import TotalCostDisplay from './TotalCostDisplay';
import CivilizationDisplay from './CivilizationDisplay';

var state = initialState();
var totalCost = 0;
var credits = {
    red: 5,
    orange: 5,
    blue: 5,
    green: 5,
    yellow: 5
};

function renderHands() {
    ReactDOM.render(React.createElement(Hands, state), document.getElementById('hands'));
}

function renderTotalCosts() {
    let totalCost = state.cardHolderStates.reduce((prev, curr) => {
        return prev + (curr !== null ? curr[0].totalCost + curr[1].totalCost : 0);
    }, 0);
    ReactDOM.render(React.createElement(TotalCostDisplay, {totalCost: totalCost}), document.getElementById('total-cost'));
}

function renderCivilizations() {
    let civilizations = CivilizationList.map((civ) => {
        return {
            name: civ.name,
            cost: civ.cost,
            buyable: civ.cost <= totalCost,
            credits: civ.credits
        };
    });
    let displayProps = {
        civilizations: civilizations,
        buyHandler: buyCivilization,
        credits: credits
    };
    ReactDOM.render(React.createElement(CivilizationDisplay, displayProps), document.getElementById('civilizations'));
}

function update(diff) {
    PropertyUtil.update(state, diff);
    recalculateCost();
    renderHands();
    renderTotalCosts();
    renderCivilizations();
}

function recalculateCost() {
    totalCost = 0;
    state.cardHolderStates.forEach((holdersByCost, cost) => {
        if (cost == 0) {
            return;
        }
        holdersByCost.forEach((holder) => {
            holder.totalCost = holder.selectedCount * holder.selectedCount * cost;
            totalCost += holder.totalCost;
        });
    });
}

function buyCivilization(index) {
    let civ = CivilizationList[index];
    if (civ.cost <= totalCost) {
        civ.credits.forEach((credit) => {
            credits[credit.color] += credit.amount;
        });
    }
    renderCivilizations();
}

function initialState() {
    let cardHolderStates = [null];
    for (var i = 1; i <= 9; ++i) {
        cardHolderStates.push([
            {
                selectedCount: 0,
                hoveringIndex: -1
            },
            {
                selectedCount: 0,
                hoveringIndex: -1
            }
        ]);
    }
    return {
        cardHolderStates: cardHolderStates,
        updateHandler: update
    };
}

window.addEventListener('DOMContentLoaded', () => {
    update({});
}, false);
