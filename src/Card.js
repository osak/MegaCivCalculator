/**
 * Created by osak on 16/06/28.
 */

import React from 'react';

const BASE_STYLE = {
    border: '1px black solid',
    borderRadius: '5px',
    width: '10pt',
    height: '15pt',
    margin: '0 2pt 0 2pt',
    display: 'inline-block'
};
const HOVERED_STYLE = Object.assign({}, BASE_STYLE, {
    backgroundColor: 'lightgray'
});
const SELECTED_STYLE = Object.assign({}, BASE_STYLE, {
    backgroundColor: '#c0c000'
});

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = this.props.selected ? SELECTED_STYLE
            : this.props.hovered ? HOVERED_STYLE
            : BASE_STYLE;
        return (
            <span onMouseEnter={this.props.hoverHandler}
                  onMouseLeave={this.props.leaveHandler}
                  onClick={this.props.clickHandler}
                  style={style}>
            </span>
        );
    }
}
