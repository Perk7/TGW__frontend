import React, {Component} from 'react';

class ValueBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.style} className="game__value-bar">
                <div style={{
                    backgroundColor: this.props.color,
                    marginLeft: `${this.props.value}%`,}}> </div>
                <span>{this.props.text || ''}</span>
            </div>
        );
    }
}

export default ValueBar;