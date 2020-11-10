import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close';
import Button from './Button';
/** 
Generates a Table

Props: 
@param {String} headline REQUIRED - Headline text
@param {JSX} content REQUIRED - Content to be shown in the popup (can be loaders etc)
@param {Array} [actions] Each action is an object defining the Button parameters - icon (optional), onClick (function), text and buttonType.
@param {Object} cancelAction Two properties - "show" - whether to show the close icon, and "onClick" - the parent function which hides the popup
@param {String} color Can be "red", "darkBlue", "pink", "grey" and "white" 
*/
const Popup = props => {

    const { headline, content, actions, cancelAction, color } = props

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    })
    return (
        <div className="popup">
            <div className="popup-inner">
                <div className={"popup-header popup-header-" + color}>
                    <h3>{headline}</h3>
                    {cancelAction.show ?
                        <button className="popup-cancel-button" onClick={cancelAction.onClick}><CloseIcon /></button>
                        : null}
                </div>
                <div className="popup-content">
                    {content}
                </div>
                {actions.length > 0 ?
                    <div className="popup-actions">
                        {actions.map((action) => <Button text={action.text} icon={action.icon} onClick={action.onClick} type={action.buttonType} />)}
                    </div>
                    : null}
            </div>
        </div>
    )
}

Popup.propTypes = {
    /** Headline text */
    headline: PropTypes.string.isRequired,
    /** Content to be shown in the popup (can be loaders etc) - JSX */
    content: PropTypes.element.isRequired,
    /** Each action is an object defining the Button parameters - icon (optional), onClick (function), text and buttonType. */
    actions: PropTypes.array,
    /** Two properties - "show" - whether to show the close icon, and "onClick" - the parent function which hides the popup */
    cancelAction: PropTypes.object.isRequired,
    /** Can be "red", "darkBlue", "blue", "grey" and "white" */
    color: PropTypes.oneOf(["red", "darkBlue", "pink", "grey", "white"])
}

export default Popup
