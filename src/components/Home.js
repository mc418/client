import React from 'react';
// import Search from './Search';
import '../App.css';
import axios from 'axios';
import Display from './Display';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            idToAdd: 0,
            // reload: false
        }
    }
    

    componentDidMount() {
        let id = 0;
        axios({method: 'get', url: 'http://localhost:3001/api/getData'})
        .then(response => {
            this.setState({data: response.data.data});
            let curId = this.state.data.map(user => user.id);
            while (curId.includes(id)) {
                ++id;
            }
            this.setState({idToAdd: id});
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <h1>USERS</h1>
                <Display list={this.state.data} />
                <a className="add" href={`/add/${this.state.idToAdd}`}><i className="fas fa-user-plus"> Create New User</i></a>
            </div>
        )
    }
}

export default Home;