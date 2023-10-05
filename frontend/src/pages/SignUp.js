import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import bot from '../assets/bot.jpg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signup } from '../action/SignupAction';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // image upload status
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file.size >= 1048576) {
            return alert('Max file size should be 1mb');
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const uploadImage = async () => {
        try {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'arkv1rrh');
            setUploading(true);
            const response = await dispatch(signup(data));
            setUploading(false);
            if (response.payload && response.payload.url) {
                return response.payload.url;
            } else {
                throw new Error('Image upload failed.');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                return alert('Please select an image');
            }

            const imageUrl = await uploadImage();


            await axios.post('http://localhost:5001/users/signup', { name, email, password, image: imageUrl, title, description })
                .then((res) => {
                    if (res.data.success) {
                        navigate('/login');
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => console.log('Error:', err));
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={10} className='d-flex align-items-center justify-content-center flex-direction-column'>
                    <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSubmit}>

                        <div className='signup_pic_container'>
                            <img src={imagePreview || bot} alt="" className='signup_pic' />
                            <label htmlFor="image-upload" className='image-upload-label'>
                            </label>
                        </div>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='bg-info text-black' type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='bg-info text-black' type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control className='bg-info text-black' type={show ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <InputGroup.Text className='bg-dark text-white' id="basic-addon2" onClick={() => setShow(!show)}>
                                    {show ? "Hide" : "Show"}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="file" className='bg-secondary mb-3 text-white' id='image-upload' accept='image/png image/jpeg' onChange={handleImage} required />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-3" controlId="fromImageTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control className='bg-info text-black' type="text" placeholder="Enter Image Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </Form.Group>
                        <FloatingLabel controlId="floatingTextarea2" label="Description">

                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                value={description}
                                style={{ height: '100px', backgroundColor: 'aqua', color: 'black', marginBottom: '5px' }}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </FloatingLabel>

                        <Button variant="primary" type="submit">
                            {uploading ? 'Signing up....' : 'Sign Up'}
                        </Button>
                        <div className='py-4'>
                            <p className='text-center'>
                                Already have an account? <Link to={'/login'}>Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
}

export default Signup;
