import React, { Component } from 'react';



class TabPanel extends Component {

    render() {

        const { tabs, selection } = this.props
        const style = {
            width: "calc(" + 100 / tabs.length + "% - 2px)"
        }

        return (
            <div className="tabContainer">

                {tabs.map((value, index) => {
                    return (
                        <button key={index} name={value} onClick={() => { this.props.handler(index) }} className={selection === index ? "active" : ""} style={style}>{value}</button>
                    )
                })}
            </div>
        );
    }
}
export default (TabPanel);