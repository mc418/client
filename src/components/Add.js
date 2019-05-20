import React from 'react';
import '../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            sex: '',
            age: '',
            password: '',
            repeat: '',
            redirectToReferrer: false
        }
    }

    handleFirstName = e => {
        this.setState({firstname: e.target.value});
    }

    handleLastName = e => {
        this.setState({lastname: e.target.value});
    }

    handleSex = e => {
        this.setState({sex: e.target.value});
    }

    handleAge = e => {
        this.setState({age: e.target.value});
    }

    handlePassword = e => {
        this.setState({password: e.target.value});
    }

    handleRepeat = e => {
        this.setState({repeat: e.target.value});
    }

    handleSubmit = e => {
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/putData',
            data: {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                age: this.state.age,
                sex: this.state.sex,
                password: this.state.password,
                id: this.props.match.params.userId
            }    
        })
        .then(response => {
            this.setState({
                firstname: '',
                lastname: '',
                sex: '',
                age: '',
                password: '',
                repeat: '',
                redirectToReferrer: true
            });
        })
        .catch(err => {
            console.log(err);
        })
        e.preventDefault();
    }

    render() {
        const { firstname, lastname, age, sex, password, repeat, redirectToReferrer} = this.state;
        const disabled = !(firstname !== '' 
                            && lastname !== '' 
                            && age !== '' 
                            && sex !== '' 
                            && password !== '' 
                            && repeat !== '' 
                            && password === repeat);
        if (redirectToReferrer) {
            return <Redirect to='/' />
        } else {
            return (
                <div className="container">
                    <h1>Create New User</h1>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <label>First Name:</label>
                            <input 
                                type="text" 
                                name="firstname" 
                                onChange={this.handleFirstName}  
                            />
                        </p>
                        <br/>
                        <p>
                            <label>Last Name:</label>
                            <input 
                                type="text"
                                name="lastname"
                                onChange={this.handleLastName}
                            />
                        </p>
                        <br/>
                        <p>
                            <label>Age:</label>
                            <input 
                                type="text" 
                                name="age" 
                                onChange={this.handleAge} 
                            />
                        </p>
                        <br/>
                        <p>
                            <label>Sex:</label>
                            <input 
                                type="text" 
                                name="sex" 
                                onChange={this.handleSex} 
                            />
                        </p>
                        <br/>
                        <p>
                            <label>Password:</label> 
                            <input 
                                type="password" 
                                name="password" 
                                onChange={this.handlePassword} 
                            />
                        </p>
                        <br/>
                        <p>
                            <label>Repeat:</label> 
                            <input 
                                type="password" 
                                name="repeat" 
                                onChange={this.handleRepeat} 
                            />
                            <p style={
                                {display:(password===repeat || password==='' || repeat==='') 
                                ? 
                                "none" : "inline-block"}
                                }
                            >Doesn't match</p>
                        </p>
                        <br/>
                        <input type="submit" value="Submit" disabled={disabled} />
                    </form>
                </div>
            )
        }                 
    }
}

export default Add;