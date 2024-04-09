import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import API from 'services/APIService';
import { Book } from '../types';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';
import { Pencil, Eye } from 'react-bootstrap-icons';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <>
            <Grid container direction='column' spacing={2} justifyContent='center'>
                <Grid item>
                    <h2 className='text-center'>All Books</h2>
                </Grid>
                <Grid item container justifyContent='center' spacing={2}>
                    {
                        products?.map(product => {
                            return <Grid item key={product.ID} xs={6} md={3} style={{marginTop: '2rem'}}>
                                <Paper elevation={10}>
                                    <Grid container direction='column' spacing={2}>
                                        <Grid item display={'flex'} justifyContent='center'>
                                            <img style={{
                                                width: '10rem',
                                                height: '10rem',
                                                objectFit: 'contain',
                                                cursor: 'pointer'
                                            }} onClick={() => navigate("/productdetails/" + product.ID)} alt={product.NAME} src={process.env.REACT_APP_BASE_URL + "/uploads/" + product.Image} />
                                        </Grid><br />
                                        <Grid item display='flex' flexDirection='column' gap={2}>
                                            <Typography variant='h5'>{product.NAME}</Typography>
                                            <Typography>Price: ${product.PRICE}</Typography>
                                        </Grid>
                                        <Grid item display='flex' alignItems='center' gap={1}>
                                            <IconButton onClick={() => navigate("/productdetails/" + product.ID)}><VisibilityIcon  color='primary'/></IconButton>
                                            <IconButton onClick={() => handleEdit(product.ID)}><EditIcon color='primary'/></IconButton>
                                            <IconButton onClick={() => handleDelete(product.ID)}><DeleteIcon color='error'/></IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>

        </>

    );
}
