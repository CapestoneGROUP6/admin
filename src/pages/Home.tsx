import React, { useEffect, useState } from 'react';
import ProductsList from './BooksList';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import API from 'services/APIService';
import ApproveRejectProducts from './ApproveRejectProducts';
import AdminProductsList from './AdminProductsList';
import banner from '../images/book.jpg';
import { useGlobalContext } from 'providers/GlobalProvider';


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
      <Container>
        <div>
          <h3>Products</h3>
          <hr></hr>
        </div>
        <Row>
          <Col md={12}>
            <Row>
              <Col
                xs={1}
                onClick={() => changeCat('')}
                className='homeCategoryDiv'
                style={{
                  cursor: 'pointer',
                  borderRadius: '5px 5px',
                  border: '1px solid #c4c4c4',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                }}
              >
                ALL
              </Col>
              {categories?.map(obj => (
                <Col
                  xs={1}
                  key={obj.ID}
                  onClick={() => changeCat(obj.ID)}
                  className='homeCategoryDiv'
                  style={{
                    cursor: 'pointer',
                    borderRadius: '5px 5px',
                    border: '1px solid #c4c4c4',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    backgroundColor: categoryId == obj.ID ? '#0d6efd': 'white',
                    color: categoryId == obj.ID ? '#ffffff': 'black'
                  }}
                >
                  {obj.NAME}
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={12}>
            <AdminProductsList categoryId={categoryId}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
