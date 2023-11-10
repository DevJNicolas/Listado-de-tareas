import React, { useContext, useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { modalContextEdit } from '../../hooks/modalContextEdit';

export default function ModalTaskEdit(props) {
    const { descriptionTask, id, nameTask, progresFinish, subTask } = props.data[0];
    //Use context de la modal
    const { showEdit, setShowEdit } = useContext(modalContextEdit);
    const handleClose = () => setShowEdit(false);
    //se ejecuta el Use Effect al momento que se actualiza el useState de la modal de editar  
    useEffect(() => {
        setValues({ id, nameTask, descriptionTask, progresFinish, subTask })
        let taskOption = [];
        subTask.forEach(task => {
            taskOption.push(task.name);
        })
        setViewSubTask(taskOption);
    }, [showEdit])
    //Evento de cada tecla en los campos nombre y descripción
    const [values, setValues] = useState({ id, nameTask, descriptionTask, progresFinish, subTask });
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
    //Guarda la tarea editado 
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            let itemsLocal = localStorage.getItem('task');
            let subTask = [];
            const valuesCheck = values.subTask;
            viewSubTask.forEach(subTaskTemp => {
                const checkTemp = valuesCheck.filter(({ name }) => name === subTaskTemp);
                subTask.push({ name: subTaskTemp, check: checkTemp.length > 0 ? checkTemp[0].check : false })
            })
            values.subTask = subTask;
            if (itemsLocal) {
                itemsLocal = JSON.parse(itemsLocal);
                let index = itemsLocal.findIndex(item => item.id === id);
                itemsLocal[index] = values;
                localStorage.setItem('task', JSON.stringify(itemsLocal));
            }
            handleClose();
        }
        setValidated(true);
    };


    return (
        <Modal show={showEdit} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar tarea</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete='off'>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre de la tarea:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Lista de compras"
                            name='nameTask'
                            defaultValue={nameTask}
                            required
                            onChange={onFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción de la tarea:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder='Compra de ropa'
                            rows={3} name='descriptionTask'
                            required
                            defaultValue={descriptionTask}
                            onChange={onFormChange}
                        />
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
                                <Form.Select aria-label="Default select example" multiple required={true} >
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
