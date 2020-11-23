import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productSizeType, productType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../../reducers/combineReducer';
import { fetchProductsList } from '../../actions/actionCreators';
import { hanbokInitialStateType } from '../../reducers/productReducer';

export const Products = () => {
    const productsFromStore = useSelector((state: initialAppStateType) => state.hanbokStore);
    const dispatch = useDispatch();
    const [products, setProducts] = useState<productType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchProductsList());
    }, []);

    useEffect(() => {
        setProducts(productsFromStore.data);
        setIsLoading(productsFromStore.isLoading);
    }, [dispatch, productsFromStore])



    return (
        <div className="products">
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    products?.map((data: productType) => {
                        return (
                            <div key={`${data._id}`}>
                                <Link to={{
                                    pathname: `/products/${data._id}`,
                                    state: {
                                        id: data._id,
                                        name: data.name,
                                        img: data.image,
                                        price: data.price,
                                        description: data.description,
                                        rating: data.rating,
                                        size: data.size,
                                    }
                                }
                                }>
                                    <div>
                                        <h3>{data.name}</h3>
                                        <h4>{data.image}</h4>
                                        <h4>{data.price}</h4>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
            }
        </div>
    )
}
