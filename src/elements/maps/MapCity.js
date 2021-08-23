import React, {Component} from 'react';

export default class MapCity extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <g
                    id={this.props.name}
                    transform={this.props.position + ' scale(1)'}
                    style={{pointerEvents: 'none'}}>
                    <ellipse
                        style={{opacity: '1', fill: this.props.color, fillOpacity:'1', strokeWidth:'0.05'}}
                        id={`ellipse-${this.props.name}`}
                        cx="162.26204"
                        cy="66.008652"
                        rx="0.61184895"
                        ry="0.61598307" />
                    <text
                        xmlSpace="preserve"
                        style={{fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal', fontSize: '1.46px', lineHeight: '1.25', fontFamily: 'Century Gothic', letterSpacing: '0.105px', strokeWidth:'0.036236'}}
                        x="172.34303"
                        y="59.316994"
                        id={`text-${this.props.name}`}
                        transform="scale(0.91265332,1.0957063)"><tspan
                        id={`span-${this.props.name}`}

                        x="172.34303"
                        y="59.316994"
                        style={{fill: this.props.color, fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal',  fontFamily: 'Century Gothic', strokeWidth:'0.036236'}}>{this.props.name}</tspan></text>
                </g>
            </>
        );
    }
}