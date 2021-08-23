import React, {Component} from 'react';

class Tutorial extends Component {
    constructor() {
        super();
        this.state = {

        }

        this.spliterText = this.spliterText.bind(this)
    }

    spliterText() {
        let arr = this.props.text.split(';')
        let index = 0
        return arr.map((e) => <span key={index++}><br/>{e}</span>)
    }

    render() {
        return (
            <div className='modal-blur' hidden={this.props.hide}>
                <div className='tutorial__text'>{this.spliterText()}</div>
                <button onClick={this.props.quit} className='tutorial-quit modal-quit'>&#215;</button>
            </div>
        );
    }
}

export default Tutorial;