import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import API from 'services/APIService';
import { Book } from '../types';
import { Eye, Check } from 'react-bootstrap-icons';

export default function ApproveRejectProducts() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await API.getInstance().get<Book[]>("/products/admin/pendingapproval");
            const { data } = response;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching Products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleApprove = async (productId: number) => {
        console.log(`Approve product with ID: ${productId}`);
        try {
            const response = await API.getInstance().get("/products/admin/approval/" + productId);
            const { data } = response;
            if (data?.status) {
                alert("Product Approved")
                fetchProducts();
            }
        } catch (error) {
            alert("failed to approve product")
        }

    };

    const handleReject = async (productId: number) => {
        console.log(`Reject product with ID: ${productId}`);
        try {
            const response = await API.getInstance().get("/products/admin/reject/" + productId);
            const { data } = response;
            if (data?.status) {
                alert("Product Rejected")
                fetchProducts();
            }
        } catch (error) {
            alert("failed to approve product")
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                {products?.map((product) => (
                    <Col key={product.ID} md={6} xs={12} lg={4} className="mb-4">
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
                                    <Button variant="primary" onClick={() => {
                                        window.open(process.env.REACT_APP_BASE_URL + "/uploads/" + product.BookFile)
                                    }}>
                                        <Eye size={20}/> View
                                    </Button>&nbsp;
                                    <Button variant="primary" onClick={() => handleApprove(product.ID)}>
                                        <Check size={20}/> Approve
                                    </Button>&nbsp;
                                    <Button
                                        variant="danger"
                                        className="ml-2"
                                        onClick={() => handleReject(product.ID)}
                                    >
                                        X&nbsp;Reject
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
