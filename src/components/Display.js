import React from 'react';
import '../App.css';
import axios from 'axios';
import User from './User';
import Pagination from './Pagination';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchString: '',
            pageOfItems: [],
            firstName: 1,
            lastName: 1,
            sex: 1,
            age: 1,
            reload: false,
            data: []
        };
    }

    componentDidMount() {
        axios({method: 'get', url: 'http://localhost:3001/api/getData'})
        .then(response => {
            this.setState({
                data: response.data.data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSearch = (value) => {
            axios({
                method: 'get', 
                url: 'http://localhost:3001/api/getData',
                params: {
                    search: value
                }
            })
            .then(response => {
                this.setState(() => {
                    return {
                    searchString: value,
                    data: response.data.data,
                }}, () => {
                    console.log(this.state.searchString);
                    console.log(this.state.data);
                });
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangePage = pageOfItems => {
        this.setState({pageOfItems: pageOfItems});
    }

    onClickDelete = (user) => {
        var objectIdToDelete = user._id;
        axios({
            method: 'delete', 
            url: 'http://localhost:3001/api/deleteData',
            data: {
                id : objectIdToDelete
            }
        })
        .then(response => {
                axios({
                    method: 'get', 
                    url: 'http://localhost:3001/api/getData',
                })
                .then(response => {
                    this.setState({
                        data: response.data.data
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSort = (input) => {
        axios({
            method: 'get', 
            url: 'http://localhost:3001/api/sort',
            params: {
                field: input,
                option: this.state[input]
            }
        })
        .then(response => {
            this.setState({ 
                [input] : -1 * this.state[input],
                data: response.data.data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const { firstName, lastName, sex, age, data } = this.state;
        return (
            <div className="display">
                <div className="search">
                    <p>Search</p>
                    <input 
                        type="text" 
                        value={this.state.searchString} 
                        onChange={e => this.handleSearch(e.target.value)} 
                        placeholder="Type here..." 
                    />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>First Name
                                    <button className="sort-btn" onClick={() => this.handleSort("firstName")}>
                                    {firstName === 1 ? "⬆" : "⬇"}
                                    </button>
                                </th>
                                <th>Last Name
                                    <button className="sort-btn" onClick={() => this.handleSort("lastName")}>
                                    {lastName === 1 ? "⬆" : "⬇"}
                                    </button>
                                </th>
                                <th>Sex
                                    <button className="sort-btn" onClick={() => this.handleSort("sex")}>
                                    {sex === 1 ? "⬆" : "⬇"}
                                    </button>
                                </th>
                                <th>Age
                                    <button className="sort-btn" onClick={() => this.handleSort("age")}>
                                    {age === 1 ? "⬆" : "⬇"}
                                    </button>
                                </th>
                            </tr>
                            {this.state.pageOfItems.map((item, index) => 
                                <User key={index} user={item} handleDelete={this.onClickDelete} />
                            )}
                        </tbody>
                    </table>
                    <Pagination items={data} onChangePage={this.onChangePage} />
                </div>
            </div>
        )
    }
}

export default Display;