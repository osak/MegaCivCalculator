/**
 * Created by osak on 16/06/29.
 */

import React from 'react';

const STYLE = {
    fontSize: '20pt',
    fontWeight: 'bold'
};

export default class TotalCostDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div style={STYLE}>
            Total Cost: {this.props.totalCost}
        </div>);
    }
}
