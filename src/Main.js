import React from 'react';
import ReactDOM from 'react-dom';

import CivilizationList from './model/CivilizationList';
import * as CreditType from './model/CreditType';
import PropertyUtil from './util/PropertyUtil';

import Hands from './view/Hands';
import TotalCostDisplay from './view/TotalCostDisplay';
import CivilizationListView from './view/CivilizationListView';
import StatusDisplay from './view/StatusDisplay';

var state = initialState();
var totalCost = 0;
var credits = new Map(
    CreditType.ALL.map((type) => [type, 5])
);
var selectedCivilizations = new Set();

function renderHands() {
    ReactDOM.render(React.createElement(Hands, state), document.getElementById('hands'));
}

function renderCivilizations() {
    let displayProps = {
        credits: credits,
        isBuyable: isBuyable,
        isSelected: (civ) => selectedCivilizations.has(civ),
        setSelectionState: setSelectionState
    };
    ReactDOM.render(React.createElement(CivilizationListView, displayProps), document.getElementById('civilizations'));
}

function renderStatusDisplay() {
    var totalToBuy = 0;
    selectedCivilizations.forEach((civ) => {
        totalToBuy += civ.discountedCost(credits);
    });
    let props = {
        totalProperty: totalCost,
        totalToBuy: totalToBuy,
        credits: credits,
        buySelection: buySelection
    };
    ReactDOM.render(React.createElement(StatusDisplay, props), document.getElementById('status'));
}

function update(diff) {
    PropertyUtil.update(state, diff);
    recalculateCost();
    renderHands();
    renderCivilizations();
    renderStatusDisplay();
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

function isBuyable(civ) {
    return civ.discountedCost(credits) <= totalCost;
}

function setSelectionState(civ, added) {
    if (added) {
        selectedCivilizations.add(civ);
    } else {
        selectedCivilizations.delete(civ);
    }
    renderCivilizations();
    renderStatusDisplay();
}

function buySelection() {
    for (let civ of selectedCivilizations) {
        for (let credit of civ.credits) {
            credits.set(credit.type, credits.get(credit.type) + credit.amount);
        }
    }
    renderCivilizations();
    renderStatusDisplay();
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
