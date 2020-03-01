import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout';

// Ramda
import { compose, prop, isEmpty } from 'ramda';

// Components
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';
import NotFound from '../../../components/NotFound';
import ProductItem from '../../../components/ProductItem';
import AddProductForm from '../../../components/AddProductForm';

// HOC
import {
  branch,
  toList,
  withConnectedActions,
  withAuthorization,
  withConnectedProps
} from '../../../hoc';


const enhanceProductList = compose(
  withConnectedProps(['availableProducts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({availableProducts, isFetching}) => !isFetching && isEmpty(availableProducts), NotFound),
  toList({className: 'products-list collection'}, 'availableProducts'),
);

const AvailableProducts = enhanceProductList(ProductItem);

const AddProduct = ({user, requestAvailableProducts, addProduct}) => {

  const [productToAdd, setProductToAdd] = useState({});

  useEffect(() => {
    user && requestAvailableProducts(user.id);
}, [requestAvailableProducts, user]);

  const openModal = () => {
    const modal = document.querySelector('.modal');
    window.M.Modal.init(modal);
    var instance = window.M.Modal.getInstance(modal);
    instance.open();
  }

  const openAddProductModal = ({name, img, id}) => {
    console.log(name, img, id)
    openModal();
    setProductToAdd({name, img, id})
  }

  return (
    <Layout>
        <div className="add-product">
          {user &&
            <main>
              <h2>Add product</h2>
              <AvailableProducts onItemClick={openAddProductModal} />
              <Modal>
                <div style={{ textAlign: "center" }}>
                  <img width="50" alt={productToAdd.name} src={productToAdd.img}></img>
                  <h4>Add your {productToAdd.name} products</h4>
                </div>
                <AddProductForm userId={user.id} productId={productToAdd.id} addProductMethod={addProduct} />
              </Modal>
            </main>
          }
        </div>
    </Layout>
  )
};

const enhanceAddProduct = compose(
  withAuthorization(true),
  withConnectedProps(['user']),
  withConnectedActions(['requestAvailableProducts', 'addProduct']),
)(AddProduct)

enhanceAddProduct.getInitialProps = async ({ store, isServer }) => {
    return { isServer }
}

export default enhanceAddProduct;