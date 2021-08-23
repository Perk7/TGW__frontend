import React, {Component} from 'react';

class EmptyActions extends Component {
    render() {
        return (
            <div className='empty-actions__block'>
                    <h2 className='empty-actions__block__header'>{this.props.text || 'У вас закончились очки действий на этом ходу'}</h2>
            </div>
        );
    }
}

export default EmptyActions;