/**
 * Created by osak on 16/07/08.
 */

import React from 'react';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeHandler() {
        return ((e) => this.props.filterSetter(e.target.value)).bind(this);
    }

    render() {
        return (
            <select onChange={this.onChangeHandler()}>
                {this.renderOptions()}
            </select>
        );
    }

    renderOptions() {
        return Object.keys(this.props.filters).map((key, i) =>
            <option value={key} key={i}>{this.props.filters[key].name}</option>
        );
    }
}
