import React from 'react';
import ReactDOM from 'react-dom';

import * as Civilization from './model/Civilization';
import * as CreditType from './model/CreditType';

import Hands from './view/Hands';
import CivilizationListView from './view/CivilizationListView';
import StatusDisplay from './view/StatusDisplay';
import CivilizationView from './view/CivilizationView';

var hands = initialHands();
var totalProperty = 0;
var victoryPoints = 0;
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
            civilizations={Civilization.List.filter((civ) => acquiredCivilizations.indexOf(civ) == -1)}
            costCalculator={calculateDiscountedCost}
            isBuyable={isBuyable}
            isSelected={(civ) => selectedCivilizations.has(civ)}
            setSelectionState={setSelectionState}
        />, document.getElementById('civilizations'));
}

function renderAcquiredCivilizations() {
    ReactDOM.render(
        <CivilizationListView
            civilizations={acquiredCivilizations}
            costCalculator={(civ) => civ.cost}
            credits={credits}
            isBuyable={() => true}
            isSelected={() => false}
            setSelectionState={() => false}
        />, document.getElementById('acquired-civilizations'));
}

function renderStatusDisplay() {
    var discount = 0;
    if (selectedCivilizations.has(Civilization.Library)) {
        let costsWithoutLibrary = Array.from(selectedCivilizations).filter((civ) => civ != Civilization.Library).map((civ) => calculateDiscountedCost(civ));
        discount = Math.min(Math.max(...costsWithoutLibrary, 0), 40);
    }
    let totalToBuy = Array.from(selectedCivilizations).reduce((sum, civ) => sum + calculateDiscountedCost(civ), 0) - discount;
    ReactDOM.render(
        <StatusDisplay
            totalProperty={totalProperty}
            totalToBuy={totalToBuy}
            credits={credits}
            buySelection={buySelection}
            victoryPoints={victoryPoints}
         />, document.getElementById('status'));
}

function update(cost, kind, count) {
    hands[cost][kind].selectedCount = count;
    recalculateProperty();
    renderAll();
}

function renderAll() {
    renderHands();
    renderCivilizations();
    renderAcquiredCivilizations();
    renderStatusDisplay();
    ReactDOM.render(
        <CivilizationView
            costCalculator={calculateDiscountedCost}
            civilization={Civilization.Library} />,
        document.getElementById('test')
    );
}

function recalculateProperty() {
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
    return calculateDiscountedCost(civ) <= totalProperty;
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

function calculateDiscountedCost(civ) {
    return civ.discountedCost(credits, acquiredCivilizations);
}

function buySelection() {
    for (let civ of selectedCivilizations) {
        if (acquiredCivilizations.indexOf(civ) == -1) {
            for (let [type, amount] of civ.credits.entries()) {
                credits.set(type, credits.get(type) + amount);
            }
            acquiredCivilizations.push(civ);
            victoryPoints += civ.victoryPoint;
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
