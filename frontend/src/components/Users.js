import React, { useState } from 'react'

const API = process.env.REACT_APP_API

export const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    }

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

            </div>
        </div>
    )
}
