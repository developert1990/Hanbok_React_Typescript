import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../../reducers/combineReducer';
import { fetchRegister } from '../../actions/actionCreators';


export const SignUpPage = () => {
    const { registerInfo, isLoading } = useSelector((state: initialAppStateType) => state.registerStore);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
    const isInvalid = firstName === '' || password === '' || email === '' || confirmPassword === '';
    //  || password !== confirmPassword
    const handleSignup = () => {
        if (password !== confirmPassword) {
            setPasswordConfirmError('Please Enter the same password');
        } else {
            dispatch(fetchRegister({
                name: firstName,
                email: email,
                password: password,
            }))
        }
    }



    return (
        <div className="signup">
            <div className="form">
                <h1 className="form__title">Sign Up</h1>
                {error && <div className="form__error">{error}</div>}

                <div className="form__base">
                    <input className="form__input"
                        placeholder="First Name"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)} />
                    <input className="form__input"
                        placeholder="Email address"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)} />
                    <input className="form__input"
                        type="password"
                        value={password}
                        autoComplete="off"
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)} />
                    <input className="form__input"
                        type="password"
                        value={confirmPassword}
                        autoComplete="off"
                        placeholder="Confirm Password"
                        onChange={({ target }) => setConfirmPassword(target.value)} />
                    {passwordConfirmError}
                    <button className="form__submit" disabled={isInvalid} onClick={handleSignup} type="submit">
                        Sign Up
                    </button>

                    <div className="form__text">
                        Already a user? <Link className="form__link" to="/login">Sign in now.</Link>
                    </div>

                    <div className="form__smallText">
                        This page is protected by Canada to ensure you're not a bot. Learn more.
                    </div>

                </div>
            </div>
        </div>
    )
}
