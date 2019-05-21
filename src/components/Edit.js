import React from 'react';
import '../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            sex: '',
            age: '',
            password: '',
            originPassword: '',
            redirectToReferrer: false
        }
    }

    componentDidMount() {
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/getUser',
            data: {
                id: this.props.match.params.userId
            }
        })
        .then(response => {
            console.log(response.data)
            this.setState({
                firstname: response.data.data.firstName,
                lastname: response.data.data.lastName,
                sex: response.data.data.sex,
                age: response.data.data.age,
                originPassword: response.data.data.password
            });
        })
        .catch(err => {
            console.log(err);
        })
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

    handleSubmit = e => {
        axios({
            method: 'post', 
            url: 'http://localhost:3001/api/updateData',
            data: {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                age: this.state.age,
                sex: this.state.sex,
                id: this.props.match.params.userId
            }    
        })
        .then(response => {
            this.setState({
                redirectToReferrer: true,
                firstname: '',
                lastname: '',
                sex: '',
                age: '',
                password: '',
            });
        })
        .catch(err => {
            console.log(err);
        })
        e.preventDefault();
    }

    render() {
        let regex = /^[A-Z][a-z]+$/;
        const { firstname, lastname, age, sex, password, originPassword, redirectToReferrer} = this.state;
        const disabled = firstname === '' 
            || lastname === '' 
            || age === '' 
            || sex === '' 
            || password === '' 
            || password !== originPassword
            || !regex.test(firstname)
            || !regex.test(lastname);
        if (redirectToReferrer) {
            return <Redirect to='/' />
        } else return (
            <div className="container">
                <h1>Edit User</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={this.handleFirstName}
                            value={firstname}  
                        />
                        <p style={
                                {display:(regex.test(firstname) || firstname==='') 
                                ? 
                                "none" : "inline", color: "red"}
                                }
                            >Incorrect form of first name</p>
                    </div>
                    <br/>
                    <div>
                        <label>Last Name:</label>
                        <input 
                            type="text"
                            name="lastname"
                            onChange={this.handleLastName}
                            value={lastname}
                        />
                        <p style={
                                {display:(regex.test(lastname) || lastname==='') 
                                ? 
                                "none" : "inline", color: "red"}
                                }
                            >Incorrect form of last name</p>
                    </div>
                    <br/>
                    <div>
                        <label>Age:</label>
                        <input 
                            type="number" 
                            name="age" 
                            onChange={this.handleAge} 
                            value={age}
                        />
                    </div>
                    <br/>
                    <div>
                        <label>Sex:</label>
                        <select value={this.state.sex} onChange={this.handleSex}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <label>Password:</label> 
                        <input 
                            type="password" 
                            name="password" 
                            onChange={this.handlePassword} 
                        />
                         <p style={
                                {display:(password===originPassword || password==='') 
                                ? 
                                "none" : "inline", color: "red"}
                                }
                            >Password doesn't match</p>
                    </div>
                    <br/>
                    <br/>
                    <input className="submit" type="submit" value="Submit" disabled={disabled} />
                </form>
            </div>
        )
    }
}

export default Edit;