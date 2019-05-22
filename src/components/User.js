import React from 'react';
import '../App.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }
    }

    render() {
        const { user } = this.props;
        return (
            <tr>
                <td>
                    <a className="edit" href={`/edit/${user._id}`}>
                        <i className="fas fa-user-edit"> Edit</i>
                    </a>
                </td>
                <td>
                    <button className="delete" onClick={() => this.props.handleDelete(user)}>
                        <i className="fas fa-user-slash"> Delete</i>
                    </button>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
            </tr>
        )
    }
}

export default User;