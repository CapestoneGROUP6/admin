import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import API from 'services/APIService';
import { Book } from '../types';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';
import { Pencil, Eye } from 'react-bootstrap-icons';


export default function AdminProductsList({ categoryId = '' }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const fetchProducts = async (categoryId) => {
        try {
            let url = "/products"
            if (categoryId) {
                url += '?categoryId=' + categoryId
            }
            const response = await API.getInstance().get<Book[]>(url);
            const { data } = response;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching Products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(categoryId);
    }, [categoryId]);

    const handleEdit = (productId) => {
        navigate("/editproduct/" + productId)
    };

    const handleDelete = async (productId) => {
        console.log(`Delete product with ID: ${productId}`);
        try {
            const response = await API.getInstance().delete("/products/" + productId);
            const { data } = response;
            if (data.status) {
                fetchProducts(categoryId)
            }
        } catch (error) {
            console.error('Error fetching Products:', error);
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                {products?.map((product) => (
                    <Col key={product.ID} md={4} className="mb-4">
                        <Card style={{ height: '100%', width: '20rem' }}>
                            <Card.Img
                                variant="top"
                                src={process.env.REACT_APP_BASE_URL + "/uploads/" + product.Image}
                                alt={product.NAME}
                                style={{ maxHeight: '20rem' }}
                            />
                            <Card.Body>
                                <div style={{ minHeight: '6rem', maxHeight: '6rem' }}>
                                    <Card.Title>{product.NAME}</Card.Title>
                                    <Card.Text >{product.Description}</Card.Text>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button color="primary" onClick={() => navigate("/productdetails/" + product.ID)}>
                                        <Eye size={20}></Eye> View
                                    </Button>&nbsp;&nbsp;
                                    <Button color="error" onClick={() => handleEdit(product.ID)}>
                                        <Pencil size={20}></Pencil> Edit
                                    </Button>&nbsp;&nbsp;
                                    <Button className='btn btn-outline btn-danger' onClick={() => handleDelete(product.ID)}>
                                        <Trash size={20}></Trash> Delete
                                    </Button>&nbsp;&nbsp;
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
