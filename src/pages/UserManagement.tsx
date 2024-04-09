import React, { useEffect, useState } from 'react';
import API from 'services/APIService';
import { Button, Container, Table, Tab, Tabs } from 'react-bootstrap';

export type User = {
    ID: number;
    NAME: string;
    EMAIL: string;
    MOBILE: string | null;
    ADDRESS: string | null;
    ZIPCODE: string | null;
    ROLE: string | null;
    disabled?: number; // 1 || 0
};

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [showDisabled, setShowDisabled] = useState(false);

    const fetchUsers = () => {
        API.getInstance().get("/admin/allusers").then((response) => {
            if (response.status === 200) {
                setUsers(response.data || []);
            }
        }).catch(console.log);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const enable = async (id: number) => {
        try {
            await API.getInstance().get("/admin/user/enable/" + id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const disable = async (id: number) => {
        try {
            await API.getInstance().get("/admin/user/disable/" + id);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleShowDisabled = () => {
        setShowDisabled((prevState) => !prevState);
    };

    const filteredUsers = users.filter(user => showDisabled ? user.disabled === 1 : user.disabled === 0);

    return (
        <Container>
            <h1 className="text-center">User Management</h1>
            <Tabs id="userTabs" defaultActiveKey="enable" onSelect={key => setShowDisabled(key === 'disable')}>
                <Tab eventKey="enable" title="Enable Users"></Tab>
                <Tab eventKey="disable" title="Disable Users"></Tab>
            </Tabs>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers?.map((user) => {
                        return (
                            <tr key={user.ID}>
                                <td>{user.NAME}</td>
                                <td>{user.EMAIL}</td>
                                <td>{user.MOBILE}</td>
                                <td>
                                    {user.disabled ? (
                                        <Button onClick={() => enable(user.ID)}>Enable</Button>
                                    ) : (
                                        <Button onClick={() => disable(user.ID)}>Disable</Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}
