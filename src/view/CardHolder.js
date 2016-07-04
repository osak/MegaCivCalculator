/**
 * Created by osak on 16/06/28.
 */

import React from 'react';

import Card from './Card';

export default class CardHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveringIndex: -1
        };
    }

    hoverStateUpdater(index) {
        return ((e) => {
            this.setState({
                hoveringIndex: index
            });
        }).bind(this);
    }
    
    selectedStateUpdater(index) {
        return ((e) => {
            this.props.updateHandler(index < this.props.selectedCount ? 0 : index + 1);
        }).bind(this);
    }
    
    render() {
        let cards = [];
        for (var i = 0; i < this.props.maxNumber; ++i) {
            cards.push(
                <Card hoverHandler={this.hoverStateUpdater(i)}
                      leaveHandler={this.hoverStateUpdater(-1)}
                      clickHandler={this.selectedStateUpdater(i)}
                      key={i}
                      selected={i < this.props.selectedCount}
                      hovered={i <= this.state.hoveringIndex}
                />);
        }
        return (
            <div>
                {cards}
                <span>{this.props.totalProperty}</span>
            </div>
        );
    }
}