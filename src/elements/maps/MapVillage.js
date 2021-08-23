import React, {Component} from 'react';

export default class MapVillage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <g
                    id={this.props.name}
                    transform={this.props.position}
                    style={{pointerEvents: 'none'}}>
                    <ellipse
                        style={{opacity: '1', fill:'#000000', fillOpacity:'1', strokeWidth:'0.033'}}
                        id={`ellipse-${this.props.name}`}
                        cx="113.27132"
                        cy="24.531715"
                        rx="0.41306725"
                        ry="0.40550831" />
                    <text
                        xmlSpace="preserve"
                        style={{fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal', fontSize: '0.929436px', lineHeight: '1.25', fontFamily: 'Century Gothic', letterSpacing: '0.0673087px', strokeWidth:'0.023236'}}
                        x="123.79749"
                        y="21.550314"
                        id={`text-${this.props.name}`}
                        transform="scale(0.90339729,1.1069327)"><tspan
                        id={`span-${this.props.name}`}
                        x="121.79749"
                        y="21.550314"
                        style={{fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal', fontSize: '0.929436px', lineHeight: '1.25', fontFamily: 'Century Gothic', letterSpacing: '0.0673087px', strokeWidth:'0.023236'}}>{this.props.name}</tspan></text>
                </g>
            </>
        );
    }
}