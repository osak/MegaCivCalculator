import React from 'react';
import ReactDOM from 'react-dom';

import Hands from './Hands';
import PropertyUtil from './PropertyUtil';

function renderHands(props) {
    ReactDOM.render(React.createElement(Hands, props), document.getElementById('react'));
}

var state = initialState();
function update(diff) {
    PropertyUtil.update(state, diff);
    renderHands(state);
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
    renderHands(initialState());
}, false);
