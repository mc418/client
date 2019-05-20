import React from 'react';
import User from './User';
import Pagination from './Pagination';
import '../App.css';
import axios from 'axios';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: [],
            firstName: 1,
            lastName: 1,
            sex: 1,
            age: 1,
            data: []
        }
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
            // this.setState({ reload: true });
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleSort = (input) => {
        console.log(this.state[input]);
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
        const { exampleItems } = this.props;
        // console.log(this.state.reload);
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th><button onClick={() => this.handleSort("firstName")}>First Name</button></th>
                            <th><button onClick={() => this.handleSort("lastName")}>Last Name</button></th>
                            <th><button onClick={() => this.handleSort("sex")}>Sex</button></th>
                            <th><button onClick={() => this.handleSort("age")}>Age</button></th>
                        </tr>
                        {this.state.pageOfItems.map(item => 
                            <User user={item} handleDelete={this.onClickDelete} />
                        )}
                    </tbody>
                </table>
                <Pagination items={this.state.data} onChangePage={this.onChangePage} />
            </div>
            
        )
    }
}

export default Display;