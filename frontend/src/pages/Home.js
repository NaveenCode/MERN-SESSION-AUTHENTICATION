import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

axios.defaults.withCredentials = true
const Home = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:5001/users')
            .then((res) => {
                if (res.data.valid) {
                    navigate('/')
                } else { navigate('/login') }
            })
            .catch((error) => console.log(error))
        axios.get('http://localhost:5001/users/details')
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => console.log(err))
    }, [navigate])

    return (
        <Container className='d-flex justify-content-center align-items-center'>

            <Row>

                <Col>
                    <table style={{}}>
                        <thead style={{ margin: '20px' }}>
                            <tr>
                                <th className='th'>Name</th>
                                <th className='th'>Image</th>
                                <th className='th'>Title</th>
                                <th className='th'>Desctiption</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='th'>{user.name}</td>
                                        <td className='th'><img src={user.image} alt="img" style={{ width: '150px', borderRadius: '20px' }} /></td>
                                        <td className='th'>{user.title}</td>
                                        <td className='th'>{user.description}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Col>

            </Row>

        </Container>

    )
}

export default Home


