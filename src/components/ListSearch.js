import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
class ListSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearchQuery: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.updateParent = this.updateParent.bind(this);
    }

    handleChange(e) {

        //Do not change value when the field is only spaces.
        if (e.target.value.length === 0 || e.target.value.trim().length !== 0) {
            this.setState({ currentSearchQuery: e.target.value }, this.updateParent);
        }
    }

    updateParent() {
        this.props.handler(this.state.currentSearchQuery);
    }
    clearSelection() {
        this.setState({ currentSearchQuery: '' }, this.updateParent);
    }





    render() {
        const { currentSearchQuery } = this.state;
        return (
            <div className="listSearch">
                <div className="listSearchBar">
                    <div>
                        <SearchIcon />
                    </div>

                    <input onChange={this.handleChange} value={this.state.currentSearchQuery} placeholder={"Search by " + this.props.column} name="currentSearchQuery" className="listSearchInput" />
                </div>
                {currentSearchQuery !== '' ? <button className="listSearchClose" onClick={this.clearSelection}><CloseIcon /></button>
                    : null}

            </div>
        )
    }
}

export default ListSearch;