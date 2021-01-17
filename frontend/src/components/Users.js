import React, { useState, useEffect } from 'react'

const API = process.env.REACT_APP_API

export const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respond = await fetch(`${API}/users`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await respond.json();
        console.log(data);
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => { getUsers(); }, [])

    const editUser = (id) => {}

    const deleteUser = async (id) => {}

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={ handleSubmit } className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChanged={ e => setName(e.target.value) }
                            value={ name }
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            onChanged={ e => setEmail(e.target.value) }
                            value={ email }
                            className="form-control"
                            placeholder="E-mail"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            onChanged={ e => setPassword(e.target.value) }
                            value={ password }
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        Create
                    </button>
                </form>
            </div>

            <div className="col-md-8">
                <table className="table table-striped">
                    <thead className="table-primary">
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user) => (
                            <tr key={ user._id }>
                                <td>{ user.name }</td>
                                <td>{ user.email }</td>
                                <td>{ user.password }</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={ () => editUser(user._id) }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={ () => deleteUser(user._id) }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
