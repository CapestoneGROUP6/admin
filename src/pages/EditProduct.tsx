import Categories from 'components/Categories';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import API from '../services/APIService';
import { useParams } from 'react-router-dom';
import { Book } from 'types';

export default function EditProduct() {

    const { id } = useParams()

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        file: null,
        category_id: '',
        id: -1,
        existingImage: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        price: '',
        description: '',
        file: '',
        category_id: ''
    });


    const getPRoductDEtails = async () => {
        try {
            const response = await API.getInstance().get<Book>("/products/" + id);
            const { data } = response;
            if (data) {
                const { Category_ID, Description, ID, Image, IsAdminApproved, NAME, PRICE, User_ID } = data
                setFormData({
                    name: NAME || '',
                    price: PRICE || '',
                    description: Description || '',
                    file: Image,
                    category_id: Category_ID + "",
                    id: ID,
                    existingImage: Image
                })
            }
        } catch (error) {
            console.error('Error fetching Products:', error);
        }
    }

    useEffect(() => {
        if (id) {
            getPRoductDEtails()
        }
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file,
        });
        // setErrors({
        //     ...errors,
        //     file: file ? '' : 'File is required',
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {} as any;
        Object.keys(formData).forEach((key) => {
            if (formData[key] === '') {
                newErrors[key] = `${key} is required`;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const form = new FormData();
            form.append("name", formData.name)
            form.append("description", formData.description)
            form.append("price", formData.price)
            form.append("file", formData.file)
            form.append("category_id", formData.category_id)
            form.append("id", formData.id + "")

            try {
                const response = await API.getInstance().put("/products", form);
                const { status } = response.data
                if (status) {
                    alert("Product Edited Successfully!!!")
                    getPRoductDEtails()
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
    };


    return (
        <Container className="mt-4">
            <Card>
                <Card.Header>
                    <Card.Title>Edit Product</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>
                        {
                            formData.existingImage && <>
                                <img
                                    style={{ maxHeight: '20rem' }}
                                    src={process.env.REACT_APP_BASE_URL + "/uploads/" + formData.existingImage}
                                    alt='Product IMage' />
                            </>
                        }
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formName" className='mb-3'>
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10" className='d-flex flex-column align-items-start'>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <Form.Text className="text-danger">{errors.name}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPrice" className='mb-3'>
                            <Form.Label column sm="2">
                                Price
                            </Form.Label>
                            <Col sm="10" className='d-flex flex-column align-items-start'>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                                <Form.Text className="text-danger text-left">{errors.price}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formDescription" className='mb-3'>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10" className='d-flex flex-column align-items-start'>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter product description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                                <Form.Text className="text-danger text-left">{errors.description}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Categories
                            defaultValue={formData.category_id}
                            onChange={(value) => handleInputChange({
                                target: {
                                    name: 'category_id',
                                    value
                                }
                            })}
                            showError={!!errors.category_id} />

                        <Form.Group as={Row} controlId="formFile" className='mb-3'>
                            <Form.Label column sm="2">
                                File
                            </Form.Label>
                            <Col sm="10" className='d-flex flex-column align-items-start'>
                                <Form.Control
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                />
                                <Form.Text className="text-danger text-left">{errors.file}</Form.Text>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
