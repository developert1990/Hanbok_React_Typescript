import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { NavBar, Footer, UserManagement } from '../components/index';
import { ProductsPage, MainPage, AboutPage, ProductDetailPage, ProductAdminPage } from '../pages/index';
import { SignInPage } from '../pages/signInPage/SignInPage';
import { SignUpPage } from '../pages/signUpPage/SignUpPage';
import Cookie from 'js-cookie';
import { productType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../reducers/combineReducer';
import { fetchProductsList } from '../actions/actionCreators';





// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [products, setProducts] = useState<productType[]>([]);
    const cookie = Cookie.getJSON("userInfo");

    const { data, isLoading } = useSelector((state: initialAppStateType) => state.hanbokStore);
    const dispatch = useDispatch();

    // console.log('products', products)

    useEffect(() => {
        dispatch(fetchProductsList());
        setProducts(data);
    }, []);


    return (
        <BrowserRouter>
            <NavBar signedIn={signedIn} setSignedIn={setSignedIn} cookie={cookie} />
            <Route exact path="/" component={MainPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/products/:id" component={ProductDetailPage} />
            <Route exact path="/products" component={ProductsPage} />
            <Route path="/login" render={() => (
                <SignInPage setSignedIn={setSignedIn} />
            )} />
            <Route path="/signup" component={SignUpPage} />
            {/* render로 주는거랑 그냥 set 프롭스를 주는 거랑 차이가 뭔지..;; */}
            <Route path="/admin" render={() => (
                <ProductAdminPage products={products} setProducts={setProducts} />
            )} />
            <Route path="/userManagement" component={UserManagement} />
            <Footer />
        </BrowserRouter>
    )
}