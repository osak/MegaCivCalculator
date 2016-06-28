import React from 'react';
import ReactDOM from 'react-dom';

import CardHolder from './CardHolder';

function renderCardHolder(props) {
    ReactDOM.render(React.createElement(CardHolder, props), document.getElementById('react'));
}

window.addEventListener('DOMContentLoaded', () => {
    renderCardHolder({
        maxNumber: 8,
        selectedCount: 0,
        hoveringIndex: -1,
        onUpdate: renderCardHolder
    });
}, false);
