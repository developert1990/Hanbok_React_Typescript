import React, { SetStateAction, Dispatch } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';

export interface CookieType {
    admin: boolean;
    email: string;
    name: string;
    result: string;
    status: number;
    token: string;
}

export interface NavProps {
    signedIn: boolean;
    setSignedIn: Dispatch<SetStateAction<boolean>>;
    cookie: CookieType;
}

export const NavBar: React.FC<NavProps> = ({ signedIn, setSignedIn, cookie }) => {
    const history = useHistory();
    const userInfoFromLS = localStorage.getItem("signedInUser");
    const userInfoFromCookie = Cookie.getJSON("userInfo");
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        alert('Logged out successfully');
        localStorage.removeItem("signedInUser");
        Cookie.remove("userInfo");
        setSignedIn(false);
        history.push("/products");
    }

    // 로그인을 한 다음 새로고침을 했을 경우에 루트 디렉토리의 index.tsx, app.tsx 부터 리랜더링 되기 때문에 로그인 인증이 필요하다 그래서 쿠키가 있다면 로그인이 유지가 되도록 해준것이다.
    if (cookie) {
        cookie.token && setSignedIn(true);
    }

    return (
        <div className="navbar">
            <div className="logo">
                Logo
            </div>
            <div className="nav">
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/products"><li>Hanbok</li></Link>
                </ul>
            </div>
            <div className="login">
                {
                    signedIn ?
                        <button onClick={handleLogout}>Log Out</button> :
                        <Link to="/login" >Login</Link>
                    // onClick={() => { Cookie.remove("userInfo") }}
                }
            </div>
            <div className="adminButton">
                {
                    userInfoFromCookie?.admin ?
                        <Link to="/admin">Admin</Link> :
                        null
                }
            </div>
        </div>
    )
}
