import React from 'react';
import ReactDOM from 'react-dom';

import CivilizationList from './model/CivilizationList';
import * as CreditType from './model/CreditType';
import PropertyUtil from './util/PropertyUtil';

import Hands from './view/Hands';
import CivilizationListView from './view/CivilizationListView';
import StatusDisplay from './view/StatusDisplay';

var hands = initialHands();
var totalProperty = 0;
var credits = new Map(
    CreditType.ALL.map((type) => [type, 5])
);
var selectedCivilizations = new Set();
var acquiredCivilizations = [];

function renderHands() {
    ReactDOM.render(
        <Hands
            cardHolderStates={hands}
            updateHandler={update}
        />, document.getElementById('hands'));
}

function renderCivilizations() {
    ReactDOM.render(
        <CivilizationListView
            civilizations={CivilizationList.filter((civ) => acquiredCivilizations.indexOf(civ) == -1)}
            credits={credits}
            isBuyable={isBuyable}
            isSelected={(civ) => selectedCivilizations.has(civ)}
            setSelectionState={setSelectionState}
        />, document.getElementById('civilizations'));
}

function renderAcquiredCivilizations() {
    ReactDOM.render(
        <CivilizationListView
            civilizations={acquiredCivilizations}
            credits={credits}
            isBuyable={() => true}
            isSelected={() => false}
            setSelectionState={() => false}
        />, document.getElementById('acquired-civilizations'));
}

function renderStatusDisplay() {
    var totalToBuy = 0;
    selectedCivilizations.forEach((civ) => {
        totalToBuy += civ.discountedCost(credits);
    });
    let props = {
        totalProperty: totalProperty,
        totalToBuy: totalToBuy,
        credits: credits,
        buySelection: buySelection
    };
    ReactDOM.render(React.createElement(StatusDisplay, props), document.getElementById('status'));
}

function update(cost, kind, count) {
    hands[cost][kind].selectedCount = count;
    recalculateCost();
    renderAll();
}

function renderAll() {
    renderHands();
    renderCivilizations();
    renderAcquiredCivilizations();
    renderStatusDisplay();
}

function recalculateCost() {
    totalProperty = 0;
    hands.forEach((holdersByValue, value) => {
        if (value == 0) {
            return;
        }
        holdersByValue.forEach((holder) => {
            holder.totalProperty = holder.selectedCount * holder.selectedCount * value;
            totalProperty += holder.totalProperty;
        });
    });
}

function isBuyable(civ) {
    return civ.discountedCost(credits) <= totalProperty;
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
        if (acquiredCivilizations.indexOf(civ) == -1) {
            for (let credit of civ.credits) {
                credits.set(credit.type, credits.get(credit.type) + credit.amount);
            }
            acquiredCivilizations.push(civ);
        }
    }
    selectedCivilizations.clear();
    hands = initialHands();
    renderHands();
    renderCivilizations();
    renderAcquiredCivilizations();
    renderStatusDisplay();
}

function initialHands() {
    let cardHolderStates = [null];
    for (var i = 1; i <= 9; ++i) {
        cardHolderStates.push([
            {
                selectedCount: 0,
                totalProperty: 0
            },
            {
                selectedCount: 0,
                totalProperty: 0
            }
        ]);
    }
    return cardHolderStates;
}

window.addEventListener('DOMContentLoaded', () => {
    renderAll();
}, false);
