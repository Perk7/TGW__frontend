import React, {Component} from 'react';

class Squad extends Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.double) {
            return (
                <g
                    transform={`translate(${this.props.xC}, ${this.props.yC}) scale(0.08)`}
                    id={`${this.props.ident}-squad`}
                    data-ident={this.props.ident}
                    data-owner={this.props.owner ? 'yes' : ''}
                    data-type={this.props.type}
                    data-country={this.props.country}
                    data-quan={this.props.quan}
                    data-place={this.props.place}>
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect855"
                        width="6.5598531"
                        height="6.0999231"
                        x="26.6096"
                        y="48.920918" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect857"
                        width="41.746235"
                        height="5.1133442"
                        x="9.0352478"
                        y="40.976322" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect857-9"
                        width="41.746235"
                        height="5.1133442"
                        x="9.0350275"
                        y="15.005829" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect888"
                        width="27.356194"
                        height="24.969707"
                        x="17.288925"
                        y="18.473166" />

                        <path
                            id="Shape"
                            d="m 61,11 c -0.0032,1.186485 -0.705308,2.259633 -1.791224,2.737696 C 58.122861,14.215758 56.857214,14.008907 55.98,13.21 55.878444,13.670214 55.471283,13.998436 55,14 H 7 C 6.5287168,13.9984 6.1215555,13.670214 6.02,13.21 4.8239643,14.307954 2.9714884,14.255169 1.8399132,13.090892 c -1.13157508,-1.164278 -1.13157508,-3.017506 0,-4.1817837 C 2.9714884,7.7448306 4.8239643,7.6920457 6.02,8.79 6.1215555,8.3297862 6.5287168,8.0015643 7,8 h 48 c 0.471283,0.00156 0.878445,0.3297862 0.98,0.79 C 56.857214,7.9910933 58.122861,7.784242 59.208776,8.2623043 60.294692,8.7403666 60.996833,9.8135154 61,11 Z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}} />
                        <circle
                            id="Oval"
                            cx="31"
                            cy="4"
                            r="4"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}} />
                        <path
                            id="path4"
                            d="M 22,46 H 54 V 16 H 8 v 30 h 10 c 0.552285,0 1,0.447715 1,1 0,0.552285 -0.447715,1 -1,1 H 8 v 3 c 0.00329,1.103202 0.8967981,1.996705 2,2 h 42 c 1.103202,-0.0033 1.996705,-0.896798 2,-2 V 48 H 22 c -0.552285,0 -1,-0.447715 -1,-1 0,-0.552285 0.447715,-1 1,-1 z M 20.01,24.16 c -0.07122,-0.463169 0.185493,-0.914495 0.62,-1.09 l 10,-4 c 0.237896,-0.09302 0.502104,-0.09302 0.74,0 l 10,4 c 0.434507,0.175505 0.691224,0.626831 0.62,1.09 l -1.28,7.66 c -0.503381,3.044346 -2.166374,5.775383 -4.64,7.62 C 31.176,43.119 31.456,43 31,43 c -0.456,0 -0.127,0.156 -5.07,-3.56 -2.473626,-1.844617 -4.136619,-4.575654 -4.64,-7.62 z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}} />
                        <path
                            id="path6"
                            d="m 23.26,31.49 -1.14,-6.86 8.88,-3.55 8.88,3.55 -1.14,6.86 c -0.421515,2.537029 -1.808335,4.812559 -3.87,6.35 L 31,40.75 27.13,37.84 c -2.061665,-1.537441 -3.448484,-3.812971 -3.87,-6.35 z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}} />
                        <rect
                            id="Rectangle-path"
                            height="5"
                            rx="1"
                            width="6"
                            x="28"
                            y="55"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}} />

                    <text
                        xmlSpace="preserve"
                        style={{fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal', fontSize: '20px', lineHeight: '25', fontFamily: 'Century Gothic', letterSpacing: '1px', strokeWidth:'0.036236'}}
                        x="1"
                        y="1"
                        id={`text-${'s'}`}><tspan
                        id={`span-squad`}
                        x="1"
                        y="80"
                        style={{fill: '#111', fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal',  fontFamily: 'Century Gothic', strokeWidth:'0.036236'}}>{this.props.quan}</tspan></text>

                </g>
            );
    } else {
            return (
                <>
                    <defs
                        id="defs13">
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath854">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 0.16888102,60.697779 61.52996598,-0.0023 -0.0057,-61.52222428 z"
                                id="path856" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath858">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 0.16888102,60.697779 61.52996598,-0.0023 -0.0057,-61.52222428 z"
                                id="path860" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath862">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 0.16888102,60.697779 61.52996598,-0.0023 -0.0057,-61.52222428 z"
                                id="path864" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath866">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 0.16888102,60.697779 61.52996598,-0.0023 -0.0057,-61.52222428 z"
                                id="path868" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath870">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 0.16888102,60.697779 61.52996598,-0.0023 -0.0057,-61.52222428 z"
                                id="path872" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath874">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 2.80468,56.863282 54.07117,-0.002 -0.005,-54.0722675 z"
                                id="path876" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath878">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 2.80468,56.863282 54.07117,-0.002 -0.005,-54.0722675 z"
                                id="path880" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath882">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 2.80468,56.863282 54.07117,-0.002 -0.005,-54.0722675 z"
                                id="path884" />
                        </clipPath>
                        <clipPath
                            clipPathUnits="userSpaceOnUse"
                            id="clipPath886">
                            <path
                                style={{fontVariationSettings: 'normal', opacity: '1', vectorEffect: 'none', fill: 'none', fillOpacity: '1', stroke: '#000000', strokeWidth: '1.13786px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '4', strokeDasharray: 'none', strokDashoffset: '0', strokeOpacity: '1', stopColor: '#000000', stopOpacity:'1'}}
                                d="m 2.80468,56.863282 54.07117,-0.002 -0.005,-54.0722675 z"
                                id="path888" />
                        </clipPath>
                    </defs>
                <g
                    transform={`translate(${this.props.xC}, ${this.props.yC}) scale(0.08)`}
                    id={`${this.props.ident}-squad`}
                    data-ident={this.props.ident}
                    data-owner={this.props.owner ? 'yes' : ''}
                    data-type={this.props.type}
                    data-country={this.props.country}
                    data-quan={this.props.quan}
                    data-place={this.props.place}>
                <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect855"
                        width="6.5598531"
                        height="6.0999231"
                        x="26.6096"
                        y="48.920918"
                        clipPath="url(#clipPath886)" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect857"
                        width="41.746235"
                        height="5.1133442"
                        x="9.0352478"
                        y="40.976322"
                        clipPath="url(#clipPath882)" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect857-9"
                        width="41.746235"
                        height="5.1133442"
                        x="9.0350275"
                        y="15.005829"
                        clipPath="url(#clipPath878)" />
                    <rect
                        style={{fill:'#000000', fillOpacity: '1', stroke: 'none', strokeWidth: '1.3', strokeMiterlimit: '4',
                            strokeDasharray: 'none', strokeOpacity:'1'}}
                        id="rect888"
                        width="27.356194"
                        height="24.969707"
                        x="17.288925"
                        y="18.473166"
                        clipPath="url(#clipPath874)" />
                        <path
                            id="Shape"
                            d="m 61,11 c -0.0032,1.186485 -0.705308,2.259633 -1.791224,2.737696 C 58.122861,14.215758 56.857214,14.008907 55.98,13.21 55.878444,13.670214 55.471283,13.998436 55,14 H 7 C 6.5287168,13.9984 6.1215555,13.670214 6.02,13.21 4.8239643,14.307954 2.9714884,14.255169 1.8399132,13.090892 c -1.13157508,-1.164278 -1.13157508,-3.017506 0,-4.1817837 C 2.9714884,7.7448306 4.8239643,7.6920457 6.02,8.79 6.1215555,8.3297862 6.5287168,8.0015643 7,8 h 48 c 0.471283,0.00156 0.878445,0.3297862 0.98,0.79 C 56.857214,7.9910933 58.122861,7.784242 59.208776,8.2623043 60.294692,8.7403666 60.996833,9.8135154 61,11 Z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}}
                            clipPath="url(#clipPath870)" />
                        <circle
                            id="Oval"
                            cx="31"
                            cy="4"
                            r="4"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}}
                            clipPath="url(#clipPath866)" />
                        <path
                            id="path4"
                            d="M 22,46 H 54 V 16 H 8 v 30 h 10 c 0.552285,0 1,0.447715 1,1 0,0.552285 -0.447715,1 -1,1 H 8 v 3 c 0.00329,1.103202 0.8967981,1.996705 2,2 h 42 c 1.103202,-0.0033 1.996705,-0.896798 2,-2 V 48 H 22 c -0.552285,0 -1,-0.447715 -1,-1 0,-0.552285 0.447715,-1 1,-1 z M 20.01,24.16 c -0.07122,-0.463169 0.185493,-0.914495 0.62,-1.09 l 10,-4 c 0.237896,-0.09302 0.502104,-0.09302 0.74,0 l 10,4 c 0.434507,0.175505 0.691224,0.626831 0.62,1.09 l -1.28,7.66 c -0.503381,3.044346 -2.166374,5.775383 -4.64,7.62 C 31.176,43.119 31.456,43 31,43 c -0.456,0 -0.127,0.156 -5.07,-3.56 -2.473626,-1.844617 -4.136619,-4.575654 -4.64,-7.62 z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}}
                            clipPath="url(#clipPath862)" />
                        <path
                            id="path6"
                            d="m 23.26,31.49 -1.14,-6.86 8.88,-3.55 8.88,3.55 -1.14,6.86 c -0.421515,2.537029 -1.808335,4.812559 -3.87,6.35 L 31,40.75 27.13,37.84 c -2.061665,-1.537441 -3.448484,-3.812971 -3.87,-6.35 z"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}}
                            clipPath="url(#clipPath858)" />
                        <rect
                            id="Rectangle-path"
                            height="5"
                            rx="1"
                            width="6"
                            x="28"
                            y="55"
                            style={{strokeWidth: '1.47921918', fill: this.props.type, fillOpacity: '1', stroke: '#000000', strokeOpacity: '1', strokeMiterlimit: '4', strokeDasharray: 'none'}}
                            clipPath="url(#clipPath854)" />

                    <text
                        xmlSpace="preserve"
                        style={{fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal', fontSize: '20px', lineHeight: '25', fontFamily: 'Century Gothic', letterSpacing: '1px', strokeWidth:'0.036236'}}
                        x="1"
                        y="1"
                        id={`text-${'s'}`}><tspan
                        id={`span-squad`}
                        x="1"
                        y="100"
                        style={{fill: '#111111', fontStyle: 'normal', fontVariant: 'normal', fontWeight: 'bold', fontStretch: 'normal',  fontFamily: 'Century Gothic', strokeWidth:'0.036236'}}>{this.props.quan}</tspan></text>

                </g>
            </>
            )
        }
    }
}

export default Squad;