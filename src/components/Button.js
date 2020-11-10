import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
/**
 * Renders a button with a onClick Handler
 * 
 * Props -
 * @param {String} [text] - The text to be displayed
 * @param {String|JSX} [icon] - The icon to be displayed
 * @param {Function} onClick - the handler [Required]
 * @param {String} link - link if button is used as a link
 * @param {String} [type=primary] - options: "primary", "secondary", "warning", "success", "disabled", "grey"
 * @augments {Component<Props, State>}
 */
class Button extends Component {

    static propTypes = {
        /** The type of button.
         * 
         * Can be "primary", "secondary", "warning", "success", "disabled"
         */
        type: PropTypes.oneOf(["primary", "secondary", "warning", "success", "disabled", "grey"]),
        /** The text to be shown in the button. */
        text: PropTypes.string,
        /** The icon to be shown in the button. */
        icon: PropTypes.string,
        /** The onClick handler of the button. */
        onClick: PropTypes.func,
        /** Link - if button is used as a Link */
        link: PropTypes.string
    }

    render() {
        const { text, type, onClick, icon, link } = this.props

        //Get the CSS class name
        let cssClass = this.getClassName(type, icon, text);

        if (link !== "") {
            return (
                <Link to={link} className="btn-link">
                    <button className={cssClass} disabled={type === "disabled"}>
                        {icon !== "" ?
                            <span className="icon-in-button">
                                {(typeof icon) === "string" ? <i className={icon}></i> : icon}
                            </span> : null}
                        <span className="text-in-button">{text}</span>
                    </button>
                </Link>
            );
        }
        return (
            <button className={cssClass} onClick={onClick} disabled={type === "disabled"}>
                {icon !== "" ?
                    <span className="icon-in-button">
                        {(typeof icon) === "string" ? <i className={icon}></i> : icon}
                    </span> : null}
                <span className="text-in-button">{text}</span>
            </button>
        );
    }

    /**
     * 
     * @param {String} type 
     * @param {String} icon 
     * @param {String} text 
     * @returns {String} Returns the CSS Class name of the button
     */
    getClassName(type, icon, text) {
        let cssClass = 'btn'
        switch (type) {
            case 'primary':
                cssClass = cssClass + ' btn-primary';
                break;
            case 'secondary':
                cssClass = cssClass + ' btn-secondary';
                break;
            case 'warning':
                cssClass = cssClass + ' btn-warning';
                break;
            case 'success':
                cssClass = cssClass + ' btn-success';
                break;
            case 'disabled':
                cssClass = cssClass + ' btn-disabled';
                break;
            case 'grey':
                cssClass = cssClass + ' btn-grey';
                break;
            default:
                cssClass = cssClass + ' btn-primary';
        }
        //If icon is present
        if (icon !== "") {
            //If text is present
            if (text !== "") {
                cssClass = cssClass + ' btn-icon';
            }
            else {
                //If text is not present (only icon)
                cssClass = cssClass + ' btn-only-icon';
            }

        }
        return cssClass;
    }
}

Button.defaultProps = {
    text: "",
    type: "primary",
    icon: "",
    link: ""
}

export default Button;