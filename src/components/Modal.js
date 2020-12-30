import React from 'react'
import ReactDOM from 'react-dom'


const Modal = props => {
    const renderTitle = () => {
        if (!props.title) return null;

        return (
            <div className="header">{props.title}</div>
        );
    };

    const renderContent = () => {
        if (!props.content) return null;

        return (
            <div className="content">{props.content}</div>
        );
    };


    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">

            <div onClick={e => e.stopPropagation()}
                className="ui standard modal visible active">
                {renderTitle()}
                {renderContent()}
                <div className="actions">{props.actions}
                </div>
            </div>
        </div >,
        document.querySelector('#modal')
    );
};

export default Modal;