import React from 'react';
import ReactDOM from 'react-dom';

import CivilizationList from './model/CivilizationList';
import * as CreditType from './model/CreditType';
import PropertyUtil from './util/PropertyUtil';

import Hands from './view/Hands';
import TotalCostDisplay from './view/TotalCostDisplay';
import CivilizationListView from './view/CivilizationListView';

var state = initialState();
var totalCost = 0;
var credits = new Map(
    CreditType.ALL.map((type) => [type, 5])
);

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
    let displayProps = {
        credits: credits
    };
    ReactDOM.render(React.createElement(CivilizationListView, displayProps), document.getElementById('civilizations'));
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
    if (civ.discountedCost(credits) <= totalCost) {
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
