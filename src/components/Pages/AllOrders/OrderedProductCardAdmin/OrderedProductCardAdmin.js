import React from 'react';
import './OrderedProductCardAdmin.css';

const OrderedProductCardAdmin = ({ order, updateOrders, setRender }) => {
    const { productId, status, price, img, name } = order;

    const handleDeleteOrder = () => {
        fetch(`http://localhost:5000/deleteorder/${productId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    updateOrders(productId);
                } else {
                    console.error('Something went wrong deleting the product');
                }
            });
    };

    const handleOrderStatusChange = () => {
        fetch(`http://localhost:5000/updateorderstatus/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'completed',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    console.log('Order status updated successfully');
                    const date = new Date().toTimeString();
                    setRender(date);
                }
            });
    };
    return (
        <div className="order-product-card">
            <img src={img} alt="" className="ordered-product-img" />
            <h2 className="ordered-product-name">{name}</h2>
            <h2 className="ordered-product-price">${price}</h2>
            <p className={('ordered-product-status ', status)}>
                {status.toUpperCase()}
            </p>
            <div className="ordered-product-btn-group">
                <button
                    onClick={() =>
                        window.confirm('Are you sure you want to delete this?')
                            ? handleDeleteOrder()
                            : null
                    }
                    className="ordered-product-cancel-btn"
                >
                    {' '}
                    <span>Delete Order</span>
                    <i class="fi fi-rr-trash"></i>
                </button>
                {status === 'pending' ? (
                    <button
                        onClick={handleOrderStatusChange}
                        className="ordered-product-complete-btn"
                    >
                        {' '}
                        <span>Mark as Completed</span>
                        <i class="fi fi-rr-shopping-cart-check"></i>
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default OrderedProductCardAdmin;