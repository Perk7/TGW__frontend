import React, {Component} from 'react';
import MapRegion from "./maps/MapRegion";
import coordsmap from '../coordsMap'

class SmallMap extends Component {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70vw" height="100vh"
                viewBox={`0 0 270 190`}
                version="1.1"
                id="1svg8"
                className={this.props.className}
            >
                <g fill={'#f2f2f2'} id="Море">
                    {Object.keys(coordsmap).map((reg) =>
                        <MapRegion
                            key={Object.keys(coordsmap).indexOf(reg)}
                            coord={coordsmap[reg]}
                            identy={reg.split(' ').join('_')}
                            color={ this.props.regions.indexOf(reg) !== -1 ? '#1c6d48' : '#dbba22' } /> )
                    }
                </g>
            </svg>
        );
    }
}

export default SmallMap;