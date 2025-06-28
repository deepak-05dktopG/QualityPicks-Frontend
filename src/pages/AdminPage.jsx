import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [section, setSection] = useState('products');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchProduct, setSearchProduct] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    //product and product update state
    const [productUpdate, setProductUpdate] = useState({
        status: true,
        edit_id: "",
        edit_name: "",
        edit_price: "",
        edit_category: "",
        edit_image: "",
        edit_rating: "",
        edit_reviewCount: "",
        edit_description: "",
        edit_details: "",
        edit_affiliateLink: "",
        edit_affiliatefrom: "",
        edit_stock: "",
        edit_features: [],
        edit_research: [],
        edit_productimages: []
    });
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', category: '', image: '', rating: '', reviewCount: '', description: '', details: '', affiliateLink: '', affiliatefrom: '', stock: '', features: [], research: [], productimages: []
    });

    //category and category update state
    const [categoryInput, setCategoryInput] = useState({ name: '', image: '', description: '' });
    const [update, setUpdate] = useState({
        status: true,
        edit_id: "",
        edit_name: "",
        edit_image: "",
        edit_description: "",
    });

    //CRUD Operations and filtered Products
    const fetchProducts = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/items`);
        setProducts(res.data);
    };
    const addProduct = async () => {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, newProduct)
        alert("Product Added Successfully");
        setProductInput({ name: '', price: '', category: '', image: '', rating: '', reviewCount: '', description: '', details: '', affiliateLink: '', affiliatefrom: '', stock: '', features: [], research: [], edit_productimages: [] });
        fetchProducts();
    };
    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure want to delete ?")) {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/items/${id}`);
        }
        fetchProducts();
    };
    const updateProduct = async (id) => {
        setProductUpdate({ status: false, edit_id: id });
    }
    const confirmProductUpdate = () => {
        if (window.confirm(`Are you sure want to update ?`)) {
            setProductUpdate({ status: true })
            axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/items/${productUpdate.edit_id}`, {
                name: productUpdate.name,
                price: productUpdate.edit_price,
                category: productUpdate.edit_category,
                image: productUpdate.edit_image,
                rating: productUpdate.edit_rating,
                reviewCount: productUpdate.edit_reviewCount,
                description: productUpdate.edit_description,
                details: productUpdate.edit_details,
                affiliateLink: productUpdate.edit_affiliateLink,
                affiliatefrom: productUpdate.edit_affiliatefrom,
                features: productUpdate.edit_features,
                research: productUpdate.edit_research,
                stock: productUpdate.edit_stock,
                productimages: productUpdate.edit_productimages
            })
            fetchProducts();
            alert("Product Updated Successfully");
        }
        else {
            setProductUpdate({ status: true })
        }
    };
    const filteredProducts = products.filter(product => (
        product.name.toLowerCase().includes(searchProduct.toLowerCase()) || product.category.toLowerCase().includes(searchProduct.toLowerCase()) || product.description.toLowerCase().includes(searchProduct.toLowerCase()) || product.details.toLowerCase().includes(searchProduct.toLowerCase()) || product.research.some(research => research.toLowerCase().includes(searchProduct.toLowerCase())) || product.features.some(feature => feature.toLowerCase().includes(searchProduct.toLowerCase()))
    ));

    //CRUD Operations and Filtered Categories
    const fetchCategories = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories/category`);
        setCategories(res.data);
    };
    const addCategory = async () => {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, categoryInput);
        alert(`Category Added Successfully, you need to add this ${categoryInput.name} category in you add prodect categories section..`);
        setCategoryInput({ name: '', image: '', description: '' });
        fetchCategories();
    };
    const deleteCategory = async (id) => {
        if (window.confirm(`Are you sure want to delete ?`)) {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/categories/category/${id}`);
        }
        fetchCategories();
    };
    const updateCategory = async (id) => {
        setUpdate({ status: false, edit_id: id });
    }
    const confirmUpdate = () => {
        if (window.confirm(`Are you sure want to update ?`)) {
            setUpdate({ status: true })
            axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/categories/category/${update.edit_id}`, {
                name: update.edit_name,
                image: update.edit_image,
                description: update.edit_description
            });
            fetchCategories();
            alert("Category Updated Successfully");
        }
        else {
            setUpdate({ status: true })
        }
    }
    const filteredCategory = categories.filter(category =>
        category.name.toLowerCase().includes(searchCategory.toLowerCase())
    );


    //READ, DELETE and Reply to the Customer For Product Request
    const fetchRequests = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/requestproduct/all`);
        setRequests(res.data);
    };
    const deleteRequest = async (id) => {
        if (window.confirm(`Are you sure want to delete ?`)) {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/requestproduct/delete/${id}`);
        }
        fetchRequests();
    };

    const handleReplyProduct = async (message) => {

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/requestproduct/reply/${message._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: message.email,
                    name: message.name,
                    product: message.productName,
                }),
            });
            const data = await res.json();

            if (res.ok) {
                Swal.fire('✅ Message sent successfully!', data.message, 'success');
                fetchRequests();
            } else {
                Swal.fire('❌ Error', data.message, 'error');
            }

        } catch (error) {
            console.error('Reply failed:', error);
            Swal.fire('❌ Error', 'Something went wrong.', 'error');
        }

    };

    //READ, DELETE, Replay to the customer who contact us
    const fetchMessages = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/get`);
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    const handleDelete = async (id) => {

        if (window.confirm(`Are you sure want to delete ?`)) {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/contact/delete/${id}`);
        }
        fetchMessages();
    };
    const handleReply = async (message) => {
        const { value: replyText } = await Swal.fire({
            title: `Reply to ${message.name}`,
            input: 'textarea',
            inputLabel: 'Your Message',
            inputPlaceholder: `Type your reply here for "${message.message}"`,
            inputAttributes: { 'aria-label': 'Reply message' },
            showCancelButton: true,
        });

        if (replyText) {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/reply/${message._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: message.email,
                        name: message.name,
                        subject: message.subject,
                        reply: replyText,
                    }),
                });
                const data = await res.json();

                if (res.ok) {
                    Swal.fire('✅ Replied!', data.message, 'success');
                    fetchMessages();
                } else {
                    Swal.fire('❌ Error', data.message, 'error');
                }

            } catch (error) {
                console.error('Reply failed:', error);
                Swal.fire('❌ Error', 'Something went wrong.', 'error');
            }
        }
    };

    // getall users
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const getAllUsers = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/getAll`);
        setAllUsers(res.data);
    };
    //sending bulk message
    const handleMassMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/send-bulk-email`, { subject, message: body });
            alert("✅ Emails sent successfully!");
            setSubject('');
            setBody('');
        } catch (err) {
            alert("❌ Failed to send emails.");
        }
    };
    //Delete Particular User
    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/delete/${id}`);
                setAllUsers(prev => prev.filter(user => user._id !== id));
                alert('User deleted successfully!');
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Failed to delete user');
            }
        }
    };

    //fetching products, category and requests and contact messages on mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchRequests();
        fetchMessages();
        getAllUsers();
    }, []);



    //********************************************Frontend UI************************************************************************************************************************************************8
    return (
        <div style={{ padding: '0px', fontFamily: 'Arial' }}>
            {/* header sectipon */}

            <div className='d-flex justify-content-end'>
                <Link to={'/login'}>
                    <small className='btn btn-danger btn-sm rounded-0' onClick={() => localStorage.removeItem('isAdminLoggedIn')} >Logout</small>
                </Link>
            </div>
            <h1 className="mb-4 text-center fw-bold">Admin Dashboard</h1>

            <div className="d-flex justify-content-center mb-4 gap-3">
                <button
                    className={`btn btn-outline-primary${section === 'products' ? ' active' : ''}`}
                    onClick={() => setSection('products')}
                    type="button"
                >
                    Manage Products
                </button>
                <button
                    className={`btn btn-outline-success${section === 'categories' ? ' active' : ''}`}
                    onClick={() => setSection('categories')}
                    type="button"
                >
                    Manage Categories
                </button>
                <button
                    className={`btn btn-outline-warning${section === 'requests' ? ' active' : ''}`}
                    onClick={() => setSection('requests')}
                    type="button"
                >
                    Requested Products
                </button>
                <button
                    className={`btn btn-outline-danger ${section === 'messages' ? ' active' : ''}`}
                    onClick={() => setSection('messages')}
                    type="button"
                >
                    Contact Page Messages
                </button>
                <button
                    className={`btn btn-outline-info ${section === 'messages' ? ' active' : ''}`}
                    onClick={() => setSection('marketing')}
                    type="button"
                >
                    Manage Users and Marketing
                </button>
            </div>

            {/* products page admin */}
            {section === 'products' && (
                <div>
                    <div className='d-flex justify-content-between align-items-center '>
                        <span className='d-flex gap-3 justify-content-between align-items-center '>

                            <h1 className='fw-bold text-primary'>Products</h1>
                            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add New Product</button>
                        </span>
                        <span className='blur-bg'>
                            <form className=" container d-flex " >
                                <input
                                    className="form-control border border-secondary me-2"
                                    type="search"
                                    placeholder="Search products..."
                                    aria-label="Search"
                                    value={searchProduct}
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                />
                                <span className="btn btn-outline-dark ">
                                    <i className="fas fa-search"></i>
                                </span>
                            </form>
                        </span>
                    </div>
                    <div className="offcanvas offcanvas-end w-75    " data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div class="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Add New Product Here</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body w-100">
                            <form onSubmit={addProduct} className="container mt-4 bg-light rounded border">
                                <div className="row g-3">
                                    {/* Name */}
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" value={newProduct.name}
                                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                                    </div>

                                    {/* Price */}
                                    <div className="col-md-6">
                                        <label className="form-label">Price</label>
                                        <input type="number" className="form-control" value={newProduct.price}
                                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                    </div>

                                    {/* Category */}
                                    <div className="col-md-6">
                                        <label className="form-label" required>Category</label>
                                        <select
                                            className="form-select"
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        >
                                            <option value="">all</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="home-kitchen">Home-Kitchen</option>
                                            <option value="beauty">Beauty</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="sports">Sports</option>
                                            <option value="books">Books</option>
                                        </select>
                                    </div>


                                    {/* Image URL */}
                                    <div className="col-md-6">
                                        <label className="form-label">Image URL</label>
                                        <input type="text" className="form-control" value={newProduct.image}
                                            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} required />
                                    </div>

                                    {/* Product Images (comma separated) */}
                                    <div className="col-md-12">
                                        <label className="form-label">Product Images for corousel (comma separated)</label>
                                        <textarea className="form-control" rows={2}
                                            onChange={e => setNewProduct({ ...newProduct, productimages: e.target.value.split(',').map(f => f.trim()) })} required></textarea>
                                    </div>

                                    {/* Rating */}
                                    <div className="col-md-6">
                                        <label className="form-label">Rating</label>
                                        <input type="number" step="0.1" className="form-control" value={newProduct.rating}
                                            onChange={e => setNewProduct({ ...newProduct, rating: e.target.value })} required />
                                    </div>

                                    {/* Review Count */}
                                    <div className="col-md-6">
                                        <label className="form-label">Review Count</label>
                                        <input type="number" className="form-control" value={newProduct.reviewCount}
                                            onChange={e => setNewProduct({ ...newProduct, reviewCount: e.target.value })} required />
                                    </div>

                                    {/* Description */}
                                    <div className="col-md-12">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" rows={2} value={newProduct.description}
                                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required></textarea>
                                    </div>

                                    {/* Details */}
                                    <div className="col-md-12">
                                        <label className="form-label">Details</label>
                                        <textarea className="form-control" rows={2} value={newProduct.details}
                                            onChange={e => setNewProduct({ ...newProduct, details: e.target.value })} required></textarea>
                                    </div>

                                    {/* Features (comma separated) */}
                                    <div className="col-md-12">
                                        <label className="form-label">Features (comma separated)</label>
                                        <textarea className="form-control" rows={2}
                                            onChange={e => setNewProduct({ ...newProduct, features: e.target.value.split(',').map(f => f.trim()) })} required></textarea>
                                    </div>

                                    {/* Research (comma separated) */}
                                    <div className="col-md-12">
                                        <label className="form-label">Research (comma separated)</label>
                                        <textarea className="form-control" rows={2}
                                            onChange={e => setNewProduct({ ...newProduct, research: e.target.value.split(',').map(f => f.trim()) })} required></textarea>
                                    </div>

                                    {/* Affiliate Link */}
                                    <div className="col-md-12">
                                        <label className="form-label">Affiliate Link</label>
                                        <input type="text" className="form-control" value={newProduct.affiliateLink}
                                            onChange={e => setNewProduct({ ...newProduct, affiliateLink: e.target.value })} required />
                                    </div>

                                    {/* Affiliate From */}
                                    <div className="col-md-6">
                                        <label className="form-label" required>Affiliate From</label>
                                        <select
                                            className="form-select"
                                            value={newProduct.affiliatefrom}
                                            onChange={(e) => setNewProduct({ ...newProduct, affiliatefrom: e.target.value })}
                                        >
                                            <option value="">Select product's platform</option>
                                            <option value="/assets/amazonin-logo.jpg">Amazon</option>
                                            <option value="/assets/flipkart.svg">Flipkart</option>
                                            <option value="/assets/Meesho Logo.jpg">Meesho</option>
                                            <option value="/assets/myntra.svg">Myntra</option>
                                        </select>
                                    </div>


                                    {/* Stock */}
                                    <div className="col-md-4">
                                        <label className="form-label">Stock</label>
                                        <input type="number" className="form-control" value={newProduct.stock}
                                            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-12 mt-3">
                                        <button type="submit" className="btn btn-primary">➕ Add Product</button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>

                    <table className=" table table-bordered table-striped table-hover align-middle mt-2 product-table">
                        <thead className="table-dark">
                            <tr className='sticky-top'>
                                <th className='' style={{ width: '' }}>#</th>
                                <th >Name & Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Rating</th>
                                <th>Stock</th>
                                <th>BuyLink</th>
                                <th>ProductImages</th>
                                <th>ProductFrom</th>
                                <th>Description</th>
                                <th>Details</th>
                                <th>Research</th>
                                <th>Features</th>
                                <th>❌🔄</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.slice().reverse().map((p, idx) => (

                                productUpdate.status ? (
                                    <tr style={{ fontSize: '50px', wordBreak: '' }} className='' key={p._id}>
                                        <td className=''>{idx + 1}</td>
                                        <td>
                                            <strong>
                                                {p.name} <span className="text-success">{p.price}</span>
                                            </strong>
                                        </td>
                                        <td>
                                            <img src={p.image} alt={p.name} style={{ width: '80px' }} />
                                        </td>
                                        <td>{p.category}</td>
                                        <td>
                                            {p.rating} ({p.reviewCount} reviews)
                                        </td>
                                        <td>{p.stock}</td>
                                        <td style={{
                                            fontSize: '10px',
                                            wordBreak: 'break-all',   // only if you want to force break mid-URL
                                            // adjust width as needed
                                        }} >
                                            <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer">
                                                {p.affiliateLink}
                                            </a>
                                        </td>
                                        <td style={{ fontSize: '10px', wordBreak: 'break-all' }}>  {p.productimages.map(item => (<> <a href={item}>{item}</a> | </>))}</td>
                                        <td> <img src={p.affiliatefrom} alt="" width={50} /></td>
                                        <td>{p.description}</td>
                                        <td >{p.details}</td>
                                        <td>{p.research.map(research => (<>{research} | </>))}</td>
                                        <td>{p.features.map(feature => (<>{feature} | </>))}</td>
                                        <td className="">
                                            <button onClick={() => updateProduct(p._id)} className="btn btn-outline-warning btn-sm" >
                                                🔄
                                            </button>
                                            <button onClick={() => deleteProduct(p._id)} className="btn btn-outline-danger btn-sm mt-1">
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    p._id === productUpdate.edit_id ? (
                                        <tr className='bg-warning' key={p._id}>
                                            <td className=''>{idx + 1}</td>
                                            <td>
                                                <strong>
                                                    <input
                                                        type="text"
                                                        value={productUpdate.edit_name}
                                                        placeholder={p.name}
                                                        onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_name: e.target.value }))}
                                                    />
                                                    <span className="text-success">
                                                        <input
                                                            type="number"
                                                            value={productUpdate.edit_price}
                                                            placeholder={p.price}
                                                            onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_price: e.target.value }))}
                                                        />
                                                    </span>
                                                </strong>
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    value={productUpdate.edit_image}
                                                    placeholder={p.image}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_image: e.target.value }))}
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    value={productUpdate.edit_category}
                                                    placeholder={p.category}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_category: e.target.value }))}
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    value={productUpdate.edit_rating}
                                                    placeholder={p.rating}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_rating: e.target.value }))}
                                                /> (
                                                <input
                                                    type="number"
                                                    value={productUpdate.edit_reviewCount}
                                                    placeholder={p.reviewCount}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_reviewCount: e.target.value }))}
                                                /> reviews )
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    value={productUpdate.edit_stock}
                                                    placeholder={p.stock}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_stock: e.target.value }))}
                                                />
                                            </td>

                                            <td style={{ fontSize: '10px', wordBreak: 'break-all' }}>
                                                <input
                                                    type="text"
                                                    value={productUpdate.edit_affiliateLink}
                                                    placeholder={p.affiliateLink}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_affiliateLink: e.target.value }))}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    value={productUpdate.edit_productimages}
                                                    placeholder={p.productimages.join(', ')}
                                                    onChange={(e) =>
                                                        setProductUpdate(prev => ({
                                                            ...prev,
                                                            edit_productimages: e.target.value.split(',').map(f => f.trim())
                                                        }))
                                                    }
                                                />
                                            </td>
                                            {/* Affiliate From */}
                                            <div className="w-100 ">
                                                <select
                                                    className="form-select me-5"
                                                    value={productUpdate.edit_affiliatefrom}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_affiliatefrom: e.target.value }))}
                                                >
                                                    <option value="bg-warning">Select</option>
                                                    <option value="/assets/amazonin-logo.jpg">Amazon</option>
                                                    <option value="/assets/flipkart.svg">Flipkart</option>
                                                    <option value="/assets/Meesho Logo.jpg">Meesho</option>
                                                    <option value="/assets/myntra.svg">Myntra</option>
                                                </select>
                                            </div>
                                            <td>
                                                <textarea
                                                    value={productUpdate.edit_description}
                                                    placeholder={p.description}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_description: e.target.value }))}
                                                />
                                            </td>

                                            <td>
                                                <textarea
                                                    value={productUpdate.edit_details}
                                                    placeholder={p.details}
                                                    onChange={(e) => setProductUpdate(prev => ({ ...prev, edit_details: e.target.value }))}
                                                />
                                            </td>

                                            <td>
                                                <textarea
                                                    value={productUpdate.edit_research}
                                                    placeholder={p.research.join(', ')}
                                                    onChange={(e) =>
                                                        setProductUpdate(prev => ({
                                                            ...prev,
                                                            edit_research: e.target.value.split(',').map(f => f.trim())
                                                        }))
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <textarea
                                                    value={productUpdate.edit_features}
                                                    placeholder={p.features.join(', ')}
                                                    onChange={(e) =>
                                                        setProductUpdate(prev => ({
                                                            ...prev,
                                                            edit_features: e.target.value.split(',').map(f => f.trim())
                                                        }))
                                                    }
                                                />
                                            </td>

                                            <td className="">
                                                <button
                                                    onClick={() => confirmProductUpdate()}
                                                    className="btn btn-outline-warning btn-sm"
                                                >
                                                    💾
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(p._id)}
                                                    className="btn btn-outline-danger btn-sm mt-1"
                                                >
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>

                                    ) : (
                                        <tr className='' key={p._id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <strong>
                                                    {p.name} <span className="text-success">{p.price}</span>
                                                </strong>
                                            </td>
                                            <td>
                                                <img src={p.image} alt={p.name} style={{ width: '80px' }} />
                                            </td>
                                            <td>{p.category}</td>
                                            <td>
                                                {p.rating} ({p.reviewCount} reviews)
                                            </td>
                                            <td>{p.stock}</td>
                                            <td style={{
                                                fontSize: '10px',
                                                wordBreak: 'break-all',   // only if you want to force break mid-URL
                                                // adjust width as needed
                                            }} >
                                                <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer">
                                                    {p.affiliateLink}
                                                </a>
                                            </td>
                                            <td>{p.productimages.map(item => (<>{item}, </>))}</td>
                                            <td> <img src={p.affiliatefrom} alt="" width={50} /></td>
                                            <td>{p.description}</td>
                                            <td>{p.details}</td>
                                            <td>{p.research.map(research => (<>{research}, </>))}</td>
                                            <td>{p.features.map(feature => (<>{feature}, </>))}</td>
                                            <td className="">
                                                <button onClick={() => updateProduct(p._id)} className="btn btn-outline-warning btn-sm" >
                                                    🔄
                                                </button>
                                                <button onClick={() => deleteProduct(p._id)} className="btn btn-outline-danger btn-sm mt-1">
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ))}
                        </tbody>
                    </table>

                    <div className='text-center'>
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add New Product</button>
                    </div>


                </div>
            )}

            {/* category page admin */}
            {section === 'categories' && (
                <div>
                    <div className=' d-flex justify-content-between align-items-center'>
                        <div className='d-flex gap-3 align-items-center '>
                            <h1 className='fw-bold text-success'>Category</h1>
                            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add New Category</button>
                        </div>
                        <div className='blur-bg sticky-top py-2 '>
                            <form className=" container  d-flex mt-1" >
                                <input
                                    className="form-control border border-secondary me-2"
                                    type="search"
                                    placeholder="Search categories..."
                                    aria-label="Search"
                                    value={searchCategory}
                                    onChange={(e) => setSearchCategory(e.target.value)}
                                />
                                <span className="btn btn-outline-dark ">
                                    <i className="fas fa-search"></i>
                                </span>
                            </form>
                        </div>
                    </div>

                    <div class="offcanvas offcanvas-end w-75" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Add New Category Here</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">

                            <form onSubmit={addCategory} className="p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '500px' }}>
                                {/* Category Name */}
                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Category Name"
                                        value={categoryInput.name}
                                        onChange={(e) => setCategoryInput({ ...categoryInput, name: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Image URL */}
                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        className="form-control"
                                        placeholder="Image URL"
                                        value={categoryInput.image}
                                        onChange={(e) => setCategoryInput({ ...categoryInput, image: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        placeholder="Description"
                                        rows="4"
                                        value={categoryInput.description}
                                        onChange={(e) => setCategoryInput({ ...categoryInput, description: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary w-100">
                                    ➕ Add Category
                                </button>
                            </form>


                        </div>
                    </div>



                    <table className="table table-bordered table-striped table-hover align-middle mt-2 product-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredCategory.map((cat, idx) => (
                                update.status ? (
                                    <tr key={cat._id}>
                                        <td>{idx + 1}</td>
                                        <td><strong>{cat.name}</strong></td>
                                        <td className='text-center'>
                                            <img src={cat.image} alt={cat.name} style={{ width: '100px' }} />
                                        </td>
                                        <td>
                                            <div>{cat.description}</div>
                                        </td>
                                        <td className='text-center '>
                                            <button onClick={() => { updateCategory(cat._id) }} className="btn btn-outline-warning btn-sm">
                                                🔄
                                            </button>
                                            <button onClick={() => deleteCategory(cat._id)} className="btn btn-outline-danger btn-sm ms-1" >
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    cat._id === update.edit_id ? (
                                        <tr className='bg-warning' key={cat._id}>
                                            <td>{idx + 1}</td>
                                            <td><input onChange={(e) => setUpdate(prev => ({ ...prev, edit_name: (e.target.value) }))} value={update.edit_name} placeholder={cat.name} style={{ width: "100%" }} /></td>
                                            <td className='text-center'>
                                                <input onChange={(e) => setUpdate(prev => ({ ...prev, edit_image: (e.target.value) }))} placeholder={cat.image} type="text" style={{ width: "100%" }} />
                                            </td>
                                            <td>
                                                <textarea value={update.edit_description} onChange={(e) => setUpdate(prev => ({ ...prev, edit_description: (e.target.value) }))} placeholder={cat.description} style={{ width: "100%", height: "50px" }}></textarea>
                                            </td>
                                            <td className='text-center '>
                                                <button onClick={() => { confirmUpdate() }} className="btn btn-outline-warning btn-sm">
                                                    💾
                                                </button>
                                                <button onClick={() => deleteCategory(cat._id)} className="btn btn-outline-danger btn-sm ms-1" >
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={cat._id}>
                                            <td>{idx + 1}</td>
                                            <td><strong>{cat.name}</strong></td>
                                            <td className='text-center'>
                                                <img src={cat.image} alt={cat.name} style={{ width: '100px' }} />
                                            </td>
                                            <td>
                                                <div>{cat.description}</div>
                                            </td>
                                            <td className='text-center '>
                                                <button onClick={() => { updateCategory(cat._id) }} className="btn btn-outline-warning btn-sm">
                                                    🔄
                                                </button>
                                                <button onClick={() => deleteCategory(cat._id)} className="btn btn-outline-danger btn-sm ms-1">
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ))}

                        </tbody>
                    </table>

                    <div className='d-flex justify-content-center mb-3'>
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add New Category</button>
                    </div>
                </div>
            )}

            {/* request page admin */}
            {section === 'requests' && (
                <div>
                    <h1 className='fw-bold text-warning'>Requested Products</h1>
                    <table className="table table-bordered table-striped table-hover align-middle mt-2 product-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Requested By</th>
                                <th>Type</th>
                                <th>Urgency</th>
                                <th>Preferred Brands</th>
                                <th>Price Range</th>
                                <th>Description</th>
                                <th>Additional Info</th>
                                <th>Created At</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, idx) => (
                                <tr key={req._id}>
                                    <td>{idx + 1}</td>
                                    <td><strong>{req.productName}</strong></td>
                                    <td>
                                        {req.name}<br />
                                        <a className='text-dark' href={`mailto:${req.mail}`}>{req.email}</a>
                                    </td>
                                    <td>{req.productType}</td>
                                    <td>{req.urgency}</td>
                                    <td>{req.preferredBrands}</td>
                                    <td>₹{req.priceRange}</td>
                                    <td>{req.description}</td>
                                    <td>{req.additionalInfo}</td>
                                    <td>{new Date(req.createdAt).toLocaleString()}</td>
                                    <td className='bg-dar d-flex'>
                                        {req.replied ?
                                            <button className=" btn btn-outline-success btn-sm me-1" style={{ marginTop: '5px' }}>Added</button>
                                            :
                                            <button onClick={() => handleReplyProduct(req)} className=" btn btn-outline-danger btn-sm me-1" style={{ marginTop: '5px' }}> Pending</button>

                                        }
                                        <button onClick={() => deleteRequest(req._id)} className=" btn btn-outline-danger btn-sm" style={{ marginTop: '5px' }}>
                                            ❌
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* contact page admin */}
            {section === 'messages' && (
                <div>
                    <h1 className='fw-bold text-danger'>Requested Products</h1>
                    {messages.length === 0 ? (
                        <p>No messages found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((msg, idx) => (
                                        <tr key={msg._id}>
                                            <td>{idx + 1}</td>
                                            <td>{msg.name}</td>
                                            <td>{msg.email}</td>
                                            <td>{msg.subject}</td>
                                            <td>{msg.message}</td>
                                            <td>{new Date(msg.createdAt).toLocaleString()}</td>
                                            <td>
                                                {msg.replied ?
                                                    <button className="btn btn-sm btn-outline-success me-1" onClick={() => handleReply(msg)}>
                                                        ✅ Replied
                                                    </button>
                                                    :
                                                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleReply(msg)}>
                                                        ✉️ Reply
                                                    </button>
                                                }


                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(msg._id)}>
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* marketing page admin */}
            {/* Marketing Page Admin */}
            {section === 'marketing' && (
                <div>
                    <h1 className="fw-bold text-primary mb-4">📢 Marketing Dashboard</h1>

                    {/* Send message to all users */}
                    <div className="card mb-5 shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title text-secondary mb-3">Send Email to All Users</h5>
                            <form onSubmit={handleMassMessage}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter Message"
                                        rows={4}
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    📤 Send Message to All Users
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* All Users Table */}
                    <div className="table-responsive mb-5">
                        <h4 className="text-success mb-3">👥 All Registered Users</h4>
                        <table className="table table-striped table-hover border">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminPage;