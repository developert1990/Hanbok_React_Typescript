import React from 'react';
import { useLocation } from 'react-router-dom';
import { productType } from '../../types';
export const ProductDetailPage = () => {

    const location = useLocation();

    console.log('location: ', location.state);
    const { state } = location;
    const typedState = state as productType;

    return (
        <div>
            <h2>Detail</h2>
            <div>

                <div>{typedState.image}</div>
                <div>
                    <h4>{typedState.name}</h4>
                    <h4>{typedState.price}</h4>

                    <label>Size: </label>
                    <select name="" id="">
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                    </select>
                    <button>Add to Cart</button>
                </div>
            </div>

            <h2>Description</h2>
            <div>

                {typedState.description}
            </div>
        </div>
    )
}