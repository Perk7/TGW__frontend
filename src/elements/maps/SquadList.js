import React, {Component} from 'react';
import Squad from "./Squad";
import colorSquad from "../../colorSquad";
import coordsSquadMap from "../../coordsSquadMap";
import {getVassals, getSquads, getWars, getAlliance} from "../../otherFunctions";
import {connect} from "react-redux";
import {mapStateToProps} from "../../storage/reduxGet";
import {create_game} from "../../storage/actions";

class SquadList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                changer: this.props.rend
            }

            this.getSquads = this.getSquads.bind(this)
        }

        componentDidMount() {
            if (this.props.rend !== this.state.changer) {
                this.setState({
                    changer: this.props.rend
                })
            }
        }

        getQuan(i) {
            return  i.archer_quan + i.cavallery_quan + i.catapult_quan*20 + i.pechot_quan
        }

        getSquads() {
            let arr = []
            let setted = []
            this.props.store.createGame.squad.map(e => {
                setted.push(e.place)
                arr.push(( <Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} owner={true} ident={e.id} quan={this.getQuan(e)} type={colorSquad.own} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} /> ))
            } )

            getVassals(this.props.store.createGame, this.props.store.createGame.country.name).map(el => {
                getSquads(this.props.store.createGame, el.ident).map(e => {
                    if (setted.indexOf(e.place) === -1) {
                        setted.push(e.place)
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} type={colorSquad.alliance} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    } else {
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} double={true} type={colorSquad.alliance} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    }
                })
            })

            getWars(this.props.store.createGame, this.props.store.createGame.country.name).map(el => {
                getSquads(this.props.store.createGame, el.ident).map(e => {
                    if (setted.indexOf(e.place) === -1) {
                        setted.push(e.place)
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} type={colorSquad.enemy} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    } else {
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} double={true} type={colorSquad.enemy} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    }
                })
            })

            getAlliance(this.props.store.createGame, this.props.store.createGame.country.name).map(el => {
                getSquads(this.props.store.createGame, el.ident).map(e => {
                    if (setted.indexOf(e.place) === -1) {
                        setted.push(e.place)
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} type={colorSquad.alliance} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    } else {
                        arr.push((<Squad key={`${e.id}-${e.country}`} country={e.country} place={e.place} quan={this.getQuan(e)} owner={false} ident={e.id} double={true} type={colorSquad.alliance} xC={coordsSquadMap[e.place].left} yC={coordsSquadMap[e.place].top} />))
                    }
                })
            })

            return arr
    }
    
    render() {
        return (
            <>
                {this.getSquads()}
            </>
        );
    }
}

export default connect(mapStateToProps, { create_game })(SquadList);