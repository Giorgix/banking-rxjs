import React, {useState} from 'react';
import { isEmpty } from 'ramda';

export default ({signUpMethod}) => {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const isInvalid =   isEmpty(username) ||
                        isEmpty(firstName) ||
                        isEmpty(lastName) ||
                        isEmpty(email) ||
                        isEmpty(password) ||
                        isEmpty(secondPassword) ||
                        password !== secondPassword;

    const onSubmit = event => {
        event.preventDefault();
        signUpMethod({email, password, username, firstName, lastName})
    }

    return(
        <div className="row">
            <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} id="first_name" type="text" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input placeholder="Last Name" id="last_name" type="text" onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input placeholder="Username" id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input placeholder="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input placeholder="Repeat Password" id="secondPassword" type="password" onChange={(e) => setSecondPassword(e.target.value)} />
                        <label htmlFor="secondPassword">Repeat Password</label>
                    </div>
                </div>
                <button disabled={isInvalid} class="btn waves-effect waves-light" type="submit" name="action">Sign Up
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}