import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListSearch from './ListSearch';
import PropTypes from 'prop-types'

// DeptTable.js
/** 
Generates a Table

Props: 
@param {Array} columns REQUIRED - Array of objects with name and selector
@param {Array} data REQUIRED - Array of objects with data fields
@param {Array} [actions] Each action has an icon (FA), trigger (function) or link (String) - to be appended by ID), text and buttonClass.
@param {String} [link] URL to be appended by ID (Used for View)
@param {Function} [sort] Callback - takes in selector (String) and order (String: ("asc", "desc"))
@param {Boolean} [disableSearch] - if true, search is disabled
@param {Boolean} [sendDataAsPropWithLink] - if true, the data is sent as a prop to the view Link
@augments {Component<Props, State>}
*/

class Table extends Component {

    static propTypes = {
        /** Array of objects with column name and data selector */
        columns: PropTypes.arrayOf(PropTypes.shape({
            /** Name of the column
             */
            name: PropTypes.string.isRequired,
            selector: PropTypes.string.isRequired
        })).isRequired,
        /** Array of objects with data to be displayed*/
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        /** Action - Array of objects with styling and link/trigger */
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            trigger: PropTypes.func,
            link: PropTypes.string,
            buttonClass: PropTypes.string,
            text: PropTypes.string
        })),
        /** Callback function for sorting (Params - selector and order) */
        sort: PropTypes.func,
        /** Link to view element (will be appended by ID) */
        link: PropTypes.string,
        /** Whether search is disabled or not */
        disableSearch: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            sorting: {
                selector: "",
                order: 0
            }
        }
    }

    searchHandler = (searchQuery) => {
        this.setState({ searchQuery: searchQuery });
    }

    componentDidMount() {
        this.setState({
            sorting: {
                selector: this.props.columns[0].selector,
                order: 0
            }
        })
    }

    //Change sorting
    changeSorting(selector) {
        if (this.state.sorting.selector === selector) {
            this.setState({
                sorting: {
                    selector: selector,
                    order: !this.state.sorting.order
                }
            }, () => {
                this.props.sort(this.state.sorting.selector, this.state.sorting.order ? "desc" : "asc")
            }
            )
        } else {
            this.setState({
                sorting: {
                    selector: selector,
                    order: 0
                }
            }, () => {
                this.props.sort(this.state.sorting.selector, this.state.sorting.order ? "desc" : "asc")
            })
        }
    }

    convertToProperLink = (link) => {
        if (link.substr(-1) === '/') {
            return link
        } else {
            return link + "/"
        }
    }

    getValueFromSelector = (item, selector) => {
        let sel = selector.split(".");
        // console.log(sel)
        let output = ""
        sel.forEach((value, key) => {
            if (key === 0) {
                output = item[value]
            } else {
                output = output ? output[value] : ""
            }
        })
        return output
    }


    // Table component logic and UI come here
    render() {

        const { searchQuery, sorting } = this.state;
        const { data, columns, link, sort, disableSearch, sendDataAsPropWithLink } = this.props;

        var rowLink = ""
        if (link !== undefined) {
            rowLink = this.convertToProperLink(link);
        }
        const filteredList = data.filter(
            (dataItem) => {
                return this.getValueFromSelector(dataItem, columns[0].selector).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
            }
        )

        if (data.length === 0) {

            return (<div className="empty-table">
                <i className="far fa-question-circle"></i>
                <h3>Nothing to show here. Add process to continue.</h3></div>)
        }
        return (

            <div className="tableContainer">
                {disableSearch ? null :
                    <ListSearch handler={this.searchHandler} column={columns[0].name.toLowerCase()} />
                }
                {filteredList.length === 0 ?
                    <div className="table-no-results">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>Sorry, we couldn't find anything related to <span className="bold">"{searchQuery}"</span>.</p>
                    </div>
                    :
                    <div>


                        <table className="table">

                            <thead>
                                <tr>
                                    {
                                        columns.map((item, index) => {
                                            return (
                                                <th key={index}>
                                                    {sort === undefined ? item.name :
                                                        <button onClick={() => { this.changeSorting(item.selector) }}>
                                                            <span>{item.name}</span>
                                                            {item.selector === sorting.selector ?
                                                                <i className={!sorting.order ? "fas fa-caret-up" : "fas fa-caret-down"}></i>
                                                                : null
                                                            }
                                                        </button>
                                                    }
                                                </th>
                                            )
                                        })
                                    }
                                    {
                                        this.props.actions !== undefined ?
                                            <th>Actions</th> : null
                                    }
                                </tr>

                            </thead>
                            <tbody>


                                {
                                    filteredList.map((item, key) =>
                                        <tr key={key}>
                                            {

                                                columns.map((column, index) => {

                                                    let val = this.getValueFromSelector(item, column.selector)
                                                    return (
                                                        <td key={index}>
                                                            {link !== undefined && item.id !== undefined ?


                                                                sendDataAsPropWithLink ? <Link to={{
                                                                    pathname: rowLink + item.id,
                                                                    state: {
                                                                        data: item
                                                                    }
                                                                }} className="row-link">{typeof val === "boolean" ?
                                                                    val ? "Yes" : "No"
                                                                    :
                                                                    val}</Link>

                                                                    :
                                                                    <Link to={rowLink + item.id} className="row-link">{typeof val === "boolean" ?
                                                                        val ? "Yes" : "No"
                                                                        :
                                                                        val}</Link>
                                                                :
                                                                typeof val === "boolean" ?
                                                                    val ? "Yes" : "No"
                                                                    :
                                                                    val
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }

                                            {
                                                this.props.actions !== undefined ?
                                                    <td className="action-td">
                                                        {this.props.actions.map((action, actionKey) => {

                                                            if (action.link !== undefined) {
                                                                var properLink = this.convertToProperLink(action.link);
                                                                return <Link to={properLink + item.id} className={action.buttonClass} key={actionKey}><i className={action.icon}></i> {action.text}</Link>

                                                            }
                                                            return <button onClick={() => { action.trigger(item.process) }} className={action.buttonClass} key={actionKey}><i className={action.icon}></i>  {action.text}</button>
                                                        }

                                                        )}
                                                    </td>
                                                    : null}
                                        </tr>)
                                }

                            </tbody>

                        </table>
                    </div>
                }
            </div>

        )
    }
}


export default Table;

Table.defaultProps = {
    disableSearch: false
}