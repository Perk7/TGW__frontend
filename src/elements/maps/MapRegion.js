import React, {Component} from 'react';

export default class MapRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ident: this.props.identy.split(' ').join('_'),
            fill: this.props.color,
            occup: this.props.occuped ? `url(#${this.props.identy.split(' ').join('_').split("'").join('')}__occuped)` : null,
            occuped: this.props.occuped || {agress: '#0700ff', looser: '#f24534'}
        }
    }
    render() {
        let filler = (this.props.color.indexOf('squad') === -1
            ? this.props.occuped
                ? this.state.occup
                : this.props.color
            : this.props.color)
        let squads = (this.state.occup ? `${this.state.occuped.agress}bb` : `${this.state.fill}bb`)
        return (
            <>
                <path
                    onClick={this.props.onClick}
                    className='map-region' style={{fontVariationSettings:'normal',vectorEffect:'none',fillOpacity:'1',stroke:'#000000',strokeWidth:'0.0499999',strokeLinecap:'butt',strokeLinejoin:'miter',strokeMiterlimit:'4',strokeDasharray:'none',strokeDashoffset:'0',strokeOpacity:'1',stopColor:'#000000'}}
                    fill={filler}
                    d={this.props.coord}
                    id={this.state.ident}
                />
                <radialGradient id={`${this.state.ident.split("'").join('')}__linear-gradient`} cx="50%" cy="50%" r="85%">
                    <stop offset="0%" stopColor={this.state.fill}/>
                    <stop offset="20%" stopColor={this.state.fill}/>
                    <stop offset="95%" stopColor="#000"/>
                </radialGradient>
                <radialGradient id={`${this.state.ident.split("'").join('')}__squad-gradient`} cx="50%" cy="50%" r="85%">
                    <stop offset="0%" stopColor={squads}/>
                    <stop offset="50%" stopColor={squads}/>
                    <stop offset="95%" stopColor={`#000`}/>
                </radialGradient>
                <pattern id={`${this.state.ident.split("'").join('')}__occuped`} width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <rect
                        style={{fill: this.state.occuped.looser}}
                        id="rect913"
                        width="4"
                        height="4"
                        x="0"
                        y="0" />
                    <line x1="0" y1="0" x2="0" y2="20" style={{stroke: this.state.occuped.agress, strokeWidth:'5.5'}} />
                </pattern>
            </>
        );
    }
}