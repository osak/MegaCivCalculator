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
            this.props.onUpdate(Object.assign({}, this.props, {
                hoveringIndex: index
            }));
        };
    }
    
    selectedStateUpdater(index) {
        return (e) => {
            this.props.onUpdate(Object.assign({}, this.props, {
                selectedCount: index + 1
            }));
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
            </div>
        );
    }
}