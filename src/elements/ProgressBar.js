import React, {Component} from 'react';

class ProgressBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.style} className="game__progress-bar">
                <div style={{
                    backgroundColor: this.props.color,
                    width: `${this.props.value}%`,}}> </div>
                <span>{this.props.text || ''}</span>
            </div>
        );
    }
}

export default ProgressBar;