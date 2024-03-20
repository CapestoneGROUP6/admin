import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import API from 'services/APIService';

const CategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [editID, setEditID] = useState(-1);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories()
    }, [])

    const refetchDetails = () => {
        fetchCategories()
        setCategoryName('')
        setEditID(-1)
    }

    const fetchCategories = async () => {
        try {
            const response = await API.getInstance().get("/categories");
            const { data } = response;
            setCategories(data?.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addCategory = async () => {
        try {
            const response = await API.getInstance().post("/categories", {
                name: categoryName
            });
            const { data } = response;
            if (data?.status) {
                refetchDetails()
                alert("Added New Category")
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const ediCategory = async (id: number, name: string) => {
        try {
            const response = await API.getInstance().put("/categories", {
                id,
                name
            });
            const { data } = response;
            if (data?.status) {
                refetchDetails()
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const deleteFn = async (id: number) => {
        try {
            const response = await API.getInstance().delete("/categories/" + id);
            const { data } = response;
            if (data?.status) {
                refetchDetails()
                alert("Deleted Category Success")
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = () => {
        if (!categoryName.trim()) {
            setError('Category name cannot be empty');
            return;
        }
        setError('');

        if (editID !== -1) {
            ediCategory(editID, categoryName)
        } else {
            addCategory()
        }
    };

    const categoryEdit = (id: number, name: string) => {
        setCategoryName(name);
        setEditID(id);
    }

    return (
        <>
            <Table striped bordered hover style={{width: '70%', margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(category => (
                        <tr key={category.ID}>
                            <td>{category.NAME}</td>
                            <td>
                                <Button variant="primary" onClick={() => categoryEdit(category.ID, category.NAME)}>Edit</Button>&nbsp;
                                <Button variant="danger" onClick={() => deleteFn(category.ID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <input
                    className='form-control'
                    style={{width: '30%', margin: '10px auto'}}
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                />
                <button className='btn btn-primary' onClick={handleSubmit} disabled={!categoryName}>Submit</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </>

    );
};

export default CategoryForm;
