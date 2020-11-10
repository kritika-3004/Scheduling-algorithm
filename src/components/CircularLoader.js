import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Renders a circular infinite loader
 * @param {String} [text="Loading..."] - text to be shown under loader  
 * @param {Boolean} [fullPage]
 * @param {String} [color] - Color of the loader
 */
const CircularLoader = (props) => {

    let className = "centeredProgress " + props.color
    if (props.fullPage) {
        className = className + " full-page"
    }

    return (
        <div className={className}>
            <CircularProgress />
            <span>{props.text}</span>
        </div>
    );
}

CircularLoader.defaultProps = {
    text: "Loading...",
    fullPage: false,
    color: "blue"
}
export default CircularLoader
