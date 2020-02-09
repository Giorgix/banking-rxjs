import React, {useState} from 'react';

export default ({loginMethod}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const isInvalid = user.trim() === '' || password.trim() === '';

    const onSubmit = event => {
        event.preventDefault();
        loginMethod({user, password})
    }

    return(
        <form onSubmit={onSubmit}>
            <input placeholder="Username or Email" type="text" onChange={(e) => setUser(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button disabled={isInvalid} class="btn waves-effect waves-light" type="submit" name="action">Log In
                <i class="material-icons right">send</i>
            </button>
        </form>
    )
}