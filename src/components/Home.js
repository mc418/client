import React from 'react';
import '../App.css';
import Display from './Display';

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>USERS</h1>
                <Display />
                <a className="add" href="/add"><i className="fas fa-user-plus"> Create New User</i></a>
            </div>
        )
    }
}

export default Home;