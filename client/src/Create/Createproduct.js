import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../GlobalState';
import './Createproduct.css'
const CreateProduct = () => {
    const state = useContext(GlobalState)
    let token = state.token[0]
    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: '',
        description: '',
        content: '',
        images: '',
        category: ''
    });

    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', image);

        const res = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        });
        return res.data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const imageUploadData = await uploadImage();
            const res = await axios.post('/api/product', {
                ...product,
                images: {
                    public_id: imageUploadData.public_id,
                    url: imageUploadData.url
                }
            }, {
                headers: {
                    'Authorization': token
                }
            });
            console.log('Product created:', res.data);
        } catch (err) {
            setError('Failed to create product');
        }
    };

    return (
        <div className="create-product-container">
            <form onSubmit={handleSubmit} className="create-product-form">
                <h2>Create Product</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="product_id">Product ID:</label>
                    <input
                        type="text"
                        id="product_id"
                        name="product_id"
                        value={product.product_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={product.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="images">Images:</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
