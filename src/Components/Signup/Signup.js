import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { firebase } = useContext(FirebaseContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!username || !email || !phone || !password) {
            setError('All fields are required');
            return;
        }

        // Additional validation can be done for email format, phone format, etc.

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user.updateProfile({ displayName: username })
                    .then(() => {
                        firebase.firestore().collection('users').add({
                            id: result.user.uid,
                            username: username,
                            phone: phone,
                        }).then(() => {
                            navigate('/login');
                        })
                    })
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo} alt="Logo"></img>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <br />
                    <input
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        name="username"
                    />
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                    />
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <br />
                    <input
                        className="input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="phone"
                        name="phone"
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                    />
                    <br />
                    {error && <p className="error">{error}</p>}
                    <br />
                    <button>Signup</button>
                </form>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
