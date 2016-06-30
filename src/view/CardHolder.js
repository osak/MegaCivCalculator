/**
 * Created by osak on 16/06/28.
 */

import React from 'react';

import Card from './Card';

export default class CardHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    hoverStateUpdater(index) {
        return (e) => {
            this.props.updateHandler({
                hoveringIndex: index
            });
        };
    }
    
    selectedStateUpdater(index) {
        return (e) => {
            let nextCount = index < this.props.selectedCount ? 0 : index + 1;
            this.props.updateHandler({
                selectedCount: nextCount
            });
        };
    }
    
    render() {
        let cards = [];
        for (var i = 0; i < this.props.maxNumber; ++i) {
            cards.push(
                <Card hoverHandler={this.hoverStateUpdater(i).bind(this)}
                      leaveHandler={this.hoverStateUpdater(-1).bind(this)}
                      clickHandler={this.selectedStateUpdater(i).bind(this)}
                      key={i}
                      selected={i < this.props.selectedCount}
                      hovered={i <= this.props.hoveringIndex}
                />);
        }
        return (
            <div>
                {cards}
                <span>{this.props.totalCost}</span>
            </div>
        );
    }
}