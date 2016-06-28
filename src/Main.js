import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello React!</h1>
            </div>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Test />, document.getElementById('react'));
}, false);
