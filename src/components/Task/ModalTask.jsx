import React, { useContext, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { modalContext } from '../../hooks/modalContext';
import { v4 as uuidv4 } from 'uuid'

export default function ModalTask() {
    //Use context de la modal
    const { show, setShow } = useContext(modalContext);
    const handleClose = () => setShow(false);
    //Evento de cada tecla en los campos nombre y descripción
    const [values, setValues] = useState({});
    const onFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
    };
    //Valores del campo tipo texto de agregar
    const [valuesSelect, setValuesSelect] = useState();
    const onFormChangeSelect = (e) => {
        const value = e.target.value;
        setValuesSelect(value);
    }
    //Botón agregar de la lista
    const [viewSubTask, setViewSubTask] = useState([]);
    const addTask = () => {
        setViewSubTask([...viewSubTask, valuesSelect]);
        setValuesSelect('');
    }

    //Guarda la tarea nueva
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            let itemsLocal = localStorage.getItem('task');
            let subTask = [], infoSave;
            viewSubTask.forEach(subTaskTemp => { subTask.push({ name: subTaskTemp, check: false, }) })
            if (itemsLocal) {
                itemsLocal = JSON.parse(itemsLocal);
                infoSave = [...itemsLocal, { ...values, id: uuidv4(), progresFinish: false, subTask }];
            } else {
                infoSave = [{ ...values, id: uuidv4(), progresFinish: false, subTask }];
            }
            localStorage.setItem('task', JSON.stringify(infoSave));
            setValuesSelect('');
            setViewSubTask([]);
            handleClose();
        }

        setValidated(true);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva tarea</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete='off'>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre de la tarea:</Form.Label>
                        <Form.Control type="text" placeholder="Lista de compras" name='nameTask' required onChange={onFormChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción de la tarea:</Form.Label>
                        <Form.Control as="textarea" placeholder='Compra de ropa' rows={3} name='descriptionTask' required onChange={onFormChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Sub Tareas :</Form.Label>
                        <Row>
                            <Col xs={11}>
                                <Form.Control type="text" placeholder="Lista de compras" name='nameSubTask' onChange={onFormChangeSelect} value={valuesSelect} />
                            </Col>
                            <Col xs={1} className='p-0'>
                                <Button variant="primary" className='pb-2' onClick={addTask}>
                                    <span style={{ fontSize: '12px' }}>
                                        <AiFillPlusCircle />
                                    </span>
                                </Button>
                                

                            </Col>
                            <Col xs={12} className='mt-3'>
                                <Form.Select aria-label="Default select example" multiple required={true}>
                                    {viewSubTask && viewSubTask.map((element, i) => (
                                        <option value={element} key={i}>{element}</option>
                                    ))}
                                </Form.Select>
                            </Col>

                        </Row>
                    </Form.Group>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit">Guardar</Button>

                </Modal.Footer>
            </Form>

        </Modal>
    )
}
