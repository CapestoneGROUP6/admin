import React, { useEffect, useState } from 'react';
import ProductsList from './BooksList';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import API from 'services/APIService';
import ApproveRejectProducts from './ApproveRejectProducts';
import AdminProductsList from './AdminProductsList';
import banner from '../images/book.jpg';
import { useGlobalContext } from 'providers/GlobalProvider';
import { Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([]);
  const {user} = useGlobalContext()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.getInstance().get("/categories");
        const { data } = response;
        setCategories(data?.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const changeCat = (id) => {
    setCategoryId(id)
  }

  return (
    <div>
      <div className="container-fluid p-0">
        <img
          src={banner}
          className="img-fluid"
          alt="Banner Image"
          style={{ width: '100%', objectFit: "cover", maxHeight: '30rem' }}
        />
        <div className="banner-content">
          <h1 style={{ textAlign: "center", margin: "3rem" }}>Welcome {user.NAME}</h1>
        </div>
      </div>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <h3 className='text-center'>Products</h3>
        </Grid>
        <Grid item container spacing={2} justifyContent='center' alignItems='center'>
          <Grid item xs={3} md={2}>
            <Paper className='d-flex justify-content-center' elevation={15} style={{ cursor: 'pointer', padding: '20', borderRadius: '10px', height: '3rem' }} onClick={() => changeCat('')}>
              <Grid container justifyContent='center' alignItems='center'>
                <Grid item>
                  ALL
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {
            categories?.map(obj => {
              return <Grid item key={obj.ID} xs={3} md={2}>
                <Paper className='d-flex justify-content-center' elevation={15} style={{
                  cursor: 'pointer', padding: '20', borderRadius: '10px', backgroundColor: categoryId == obj.ID ? '#0d6efd' : 'white',
                  color: categoryId == obj.ID ? '#ffffff' : 'black', height: '3rem'
                }} onClick={() => changeCat(obj.ID)} >
                  <Grid container justifyContent='center' alignItems='center'>
                    <Grid item>
                      {obj.NAME}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            })
          }
        </Grid>
        <Grid item xs={10} container justifyContent='center'>
          <Grid item xs={10}>
          <AdminProductsList categoryId={categoryId}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
