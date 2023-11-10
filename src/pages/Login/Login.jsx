import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Info from '../../components/Login/Info';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [validated, setValidated] = useState(false);
    //const [validatedUser, setValidatedUser] = useState(false);
    const history = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.persist();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            const users = localStorage.getItem('users');
            if (users) {
                const usersAll = [...JSON.parse(users)];
                const { email, pass } = values;
                let resp = false;
                usersAll.forEach(({ email: emailAll, pass: passAll }) => {
                    if (email === emailAll && pass === passAll) {
                        resp = true
                        history("/task");
                    }
                });
                !resp && alert('Usuario o contraseña incorrecta');

            } else {
                alert('Por favor registre un usuario');
            }
        }
        setValidated(true);
    };
    const [values, setValues] = useState({});
    const onFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
    };



    return (
        <>
            <Container>
                <Row className='min-vh-100'>
                    <Col className='text-center py-4'>
                        <Info />
                    </Col>
                    <Col className='py-4'>
                        <div className='border h-100 px-4 pt-5 rounded-4 shadow-lg'>
                            <div className='text-center'>
                                <h4>
                                    Iniciar Sesión
                                </h4>
                            </div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Correo: <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" name='email' onChange={onFormChange} required />
                                    <Form.Control.Feedback type="invalid">El correo es requerido.</Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Contraseña: <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" name='pass' onChange={onFormChange} required />
                                    <Form.Control.Feedback type="invalid">La contraseña es requerida.</Form.Control.Feedback>

                                </Form.Group>

                               

                                <div className='text-center'>
                                    <Button type='submit' className='me-3'>
                                        Ingresar
                                    </Button>
                                    <Link to="/register">
                                        <Button className='btn-warning text-white'>
                                            Registrate
                                        </Button>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
