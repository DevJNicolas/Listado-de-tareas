import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Info from '../../components/Login/Info';
import { Link } from 'react-router-dom';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.persist();
    event.stopPropagation();
    if (form.checkValidity() !== false) {
      const users = localStorage.getItem('users');
      if (users) {
        const usersAll = JSON.parse(users);
        usersAll.push(values);
        localStorage.setItem('users', JSON.stringify(usersAll));
      } else {
        localStorage.setItem('users', JSON.stringify([values]));
      }
      alert('Usuario registrado con exito');
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
        <Row className='mt-3'>
          <Col className='text-center'>
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
                  <Form.Label>Nombre Completo: <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="text" placeholder="Pepito Perez" name='name' onChange={onFormChange} required />
                  <Form.Control.Feedback type="invalid">El nombre es requerido.</Form.Control.Feedback>
                </Form.Group>

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
                    Registrarse
                  </Button>
                  <Link to="/*">
                    <Button className='btn-warning text-white'>
                      Iniciar Sesión
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
