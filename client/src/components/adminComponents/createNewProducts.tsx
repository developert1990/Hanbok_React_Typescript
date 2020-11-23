import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../../reducers/combineReducer';
import { fetchProductsList, fetchSaveHanbokThunk } from '../../actions/actionCreators';
import { productType, productSizeType, saveProductSuccessType, hanbokActionType } from '../../types';
import Cookie from 'js-cookie';
import { SetStateAction, Dispatch } from 'react';
export interface CreateNewProductType {
    selectedData?: productType;
    setProducts: Dispatch<SetStateAction<productType[]>>;
    setShowNewProduct: Dispatch<SetStateAction<boolean>>;
}
export const CreateNewProducts: React.FC<CreateNewProductType> = ({ selectedData, setProducts, setShowNewProduct }) => {
    const saveProduct = useSelector((state: initialAppStateType) => state.saveHanbokStore);

    const productList = useSelector((state: initialAppStateType) => state.hanbokStore);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [size, setSize] = useState<string>("");
    const [description, setDescription] = useState<string>('');
    const isInvalid = false

    useEffect(() => {
        setName(selectedData?.name as string);
        setPrice(selectedData?.price as number);
        setImage(selectedData?.image as string);
        setDescription(selectedData?.description as string);
        setStock(selectedData?.stock as number);
        setSize(selectedData?.size as string);
    }, [])

    const handleSaveBtn = () => {
        dispatch(fetchSaveHanbokThunk({
            _id: selectedData?._id,
            name: name,
            image: image,
            stock: stock,
            price: price,
            description: description,
            rating: 0,
            size: size ? size : productSizeType.SMALL,
        }));

        setShowNewProduct(false);
    }



    return (
        <div className="createNewProductsPage">
            <div className="signin">
                <div className="form">
                    <h1 className="form__title">{selectedData?._id ? "Update" : "Create"} Products</h1>
                    {/* {error && <div className="form__error">{error}</div>} */}
                    <div className="form__base">
                        <label>Name</label>
                        <input className="form__input"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            name="email" />
                        <label>Price</label>
                        <input className="form__input"
                            type="text"
                            autoComplete="off"
                            placeholder="Price"
                            value={price}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))}
                            name="password"
                            onKeyPress={event => event.key === 'Enter' ? handleSaveBtn() : null} />
                        <label>Image</label>
                        <input className="form__input"
                            type="text"
                            autoComplete="off"
                            placeholder="Image"
                            value={image}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
                            name="password"
                            onKeyPress={event => event.key === 'Enter' ? handleSaveBtn() : null} />
                        <label>Stock</label>
                        <input className="form__input"
                            type="text"
                            autoComplete="off"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(parseInt(e.target.value))}
                            name="password"
                            onKeyPress={event => event.key === 'Enter' ? handleSaveBtn() : null} />
                        <label>Size</label>
                        <select className="form__input" name="size" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSize(e.target.value)}>
                            <option value={productSizeType.SMALL}>{productSizeType.SMALL}</option>
                            <option value={productSizeType.MEDIUM}>{productSizeType.MEDIUM}</option>
                            <option value={productSizeType.LARGE}>{productSizeType.LARGE}</option>
                        </select>

                        <label>Description</label>
                        <input className="form__input"
                            type="text"
                            autoComplete="off"
                            placeholder="Description"
                            value={description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                            name="password"
                            onKeyPress={event => event.key === 'Enter' ? handleSaveBtn() : null} />

                        <button onClick={handleSaveBtn} className="form__submit" disabled={isInvalid} type="submit">
                            {selectedData?._id ? "Update" : "Create"}

                        </button>

                    </div>
                </div>
            </div>




        </div>
    )
}
