import React, { useEffect, useState, Dispatch, SetStateAction, } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppStateType } from '../../reducers/combineReducer';
import { fetchDeleteHanbokThunk, fetchProductsList } from '../../actions/actionCreators';
import { productType } from '../../types';
import { CreateNewProducts } from '../../components';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';

interface adminPageProps {
    products: productType[];
    setProducts: Dispatch<SetStateAction<productType[]>>;
}

export const ProductAdminPage: React.FC<adminPageProps> = ({ products, setProducts }) => {
    const productList = useSelector((state: initialAppStateType) => state.hanbokStore);
    const { data, isLoading } = productList;
    const deletedData = useSelector((state: initialAppStateType) => state.deleteHanbokStore);
    const dispatch = useDispatch();
    // console.log('productsFromDB_____data', productList.data);
    // console.log('deletedData', deletedData)
    const history = useHistory();
    // const [products, setProducts] = useState<productType[]>([]);
    const [editBtn, setEditBtn] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<productType>();
    const [showNewProduct, setShowNewProduct] = useState<boolean>(false);
    const isInvalid = false;
    const cookie = Cookie.getJSON("userInfo");



    const handleUserManageBtn = (e: React.MouseEvent) => {
        e.preventDefault();
        history.push("/userManagement")
    }

    const handleNewProductsBtn = (e: React.MouseEvent) => {
        e.preventDefault();
        // dispatch(fetchProducts());
        setEditBtn(false);
        setShowNewProduct(true);
    }

    const handleProductManageBtn = (e: React.MouseEvent) => {
        dispatch(fetchProductsList());
        setShowNewProduct(false);
    }

    const handleEdit = (data: productType) => {
        setShowNewProduct(true);
        setEditBtn(true);
        setSelectedData(data);
    }

    const handleDelete = (data: productType) => {
        console.log('제거할 data', data);
        dispatch(fetchDeleteHanbokThunk(data));
    }

    return (
        <div>
            {
                !cookie.admin ?
                    <>
                        {history.push("/products")}
                    </>
                    :
                    <div className="adminPage">

                        <Button variant="danger" onClick={handleUserManageBtn}>User Management</Button>
                        <Button variant="warning" onClick={handleNewProductsBtn}>Create New Products</Button>
                        <Button variant="primary" onClick={handleProductManageBtn}>Product Management</Button>


                        {
                            showNewProduct ?
                                editBtn ?
                                    <CreateNewProducts selectedData={selectedData} setProducts={setProducts} setShowNewProduct={setShowNewProduct} /> :
                                    <CreateNewProducts setProducts={setProducts} setShowNewProduct={setShowNewProduct} />
                                :
                                (
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Size</th>
                                                <th>Description</th>
                                                <th>Stock</th>
                                                <th>Control</th>
                                            </tr>
                                        </thead>
                                        {
                                            !isLoading ?
                                                data?.map((data: productType, index: number) => {
                                                    return (
                                                        <tbody key={data._id}>
                                                            <tr>
                                                                <td>{data._id}</td>
                                                                <td>{data.name}</td>
                                                                <td>{data.price}</td>
                                                                <td>{data.image}</td>
                                                                <td>{data.size}</td>
                                                                <td>{data.description}</td>
                                                                <td>{data.stock}</td>
                                                                <td>
                                                                    <button onClick={() => handleEdit(data)}>Edit</button>
                                                                    <button onClick={() => handleDelete(data)}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                                :
                                                <div>Loading...</div>
                                        }
                                    </Table>
                                )


                        }

                    </div>


            }
        </div>
    )
}
