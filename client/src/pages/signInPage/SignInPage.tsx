import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../actions/actionCreators';
import { initialAppStateType } from '../../reducers/combineReducer';
import { Link, useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';

export interface signInProps {
    setSignedIn: Dispatch<SetStateAction<boolean>>;
}



export const SignInPage: React.FC<signInProps> = ({ setSignedIn }) => {
    const { loginInfo, isLoading } = useSelector((state: initialAppStateType) => state.loginStore);

    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const userInfoFromCookie = Cookie.getJSON("userInfo") || null;

    console.log('userInfoFromCookie', userInfoFromCookie);



    const isInvalid = email === '' || password === '';


    useEffect(() => {
        if (userInfoFromCookie && userInfoFromCookie.status === 200) {
            setSignedIn(true);
            localStorage.setItem('signedInUser', JSON.stringify(userInfoFromCookie.token));
            history.push("/products");
        }
        if (userInfoFromCookie && userInfoFromCookie.status !== 200) {
            setErrorMsg(userInfoFromCookie.msg)
        }
        return;
    }, [userInfoFromCookie])

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }
    const handleSignIn = () => {

        dispatch(fetchLogin({
            email: email,
            password: password,
        }));
        if (userInfoFromCookie && userInfoFromCookie.status === 200) {
            setSignedIn(true);
            history.push("/products");
        }
        if (userInfoFromCookie && userInfoFromCookie.status !== 200) {
            setErrorMsg(userInfoFromCookie.msg)
        }
    }



    return (
        <div className="signin">
            <div className="form">
                <h1 className="form__title">Sign In</h1>
                {/* {error && <div className="form__error">{error}</div>} */}
                <div className="form__base">
                    <input className="form__input"
                        placeholder="Email Address"
                        onChange={handleEmail}
                        name="email" />
                    <input className="form__input"
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                        onChange={handlePassword}
                        name="password"
                        onKeyPress={event => event.key === 'Enter' ? handleSignIn() : null} />
                    {errorMsg === '' ? null : <div>{errorMsg}</div>}
                    <button onClick={handleSignIn} className="form__submit" disabled={isInvalid} type="submit">
                        Sign In
                            </button>
                </div>

                <div className="form__text">
                    New to Hong's Movie? <Link className="form__link" to="/signup">Sign up now.</Link>
                </div>
                <div className="form__smallText">
                    This page is protected by Canada to ensure you're not a bot. Learn more.
                    </div>


            </div>
        </div>
    )
}
