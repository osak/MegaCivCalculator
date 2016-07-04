/**
 * Created by osak on 16/06/30.
 */

import React from 'react';

export default class Credit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            color: this.props.type.color,
            marginRight: '4pt'
        };
        return (
            <span style={style}>{this.props.type.symbol}:{this.props.amount}</span>
        )
    }
}

