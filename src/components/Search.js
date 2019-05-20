import React from 'react';
import Display from './Display';
import '../App.css';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchString: ''
        };
    }

    handleChange = e => {
        this.setState({searchString: e.target.value});
    }

    render() {
        var { list } = this.props;
        var searchString = this.state.searchString.trim().toLowerCase();
        if (searchString.length > 0) {
            list = list.filter(user => {
                return (
                    user.firstName.toLowerCase().match(searchString)
                );
            });
        }
        return (
            <div className="display">
                <div className="search">
                    <p>Search</p>
                    <input 
                        type="text" 
                        value={this.state.searchString} 
                        onChange={this.handleChange} 
                        placeholder="Type here..." 
                    />
                </div>
                <Display exampleItems={list} />
            </div>
        )
    }
}

export default Search;