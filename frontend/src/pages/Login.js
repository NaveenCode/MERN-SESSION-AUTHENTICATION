import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:5001/users')
            .then((res) => {
                if (res.data.valid) {
                    navigate('/')
                } else { navigate('/login') }
            })
            .catch((error) => console.log(error))
    }, [navigate])
    const handleLogin = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5001/users/login', { email, password })
            .then((res) => {
                if (res.data.success) {
                    navigate('/')
                } else { alert(res.data.message) }
            })
            .catch((err) => console.log(err))
    }
    return (
        <Container>
            <Row>
                <Col md={5} className='login_bg'></Col>
                <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
                    <Form style={{ width: '80%', maxWidth: 500, }} onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='bg-info text-black' type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className='bg-info text-black' type={show ? 'text' : 'password'} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2" onClick={() => setShow(!show)}>
                                    {show ? "Hide" : "show"}</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className='py-4'>
                            <p className='text-center'>
                                don't have an accout ? <Link to={'/signup'}>Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Login
