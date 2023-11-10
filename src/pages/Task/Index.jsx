import React, { useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Placeholder, Row } from 'react-bootstrap';
import ModalTask from '../../components/Task/ModalTask';
import { modalContext } from '../../hooks/modalContext';
import { offCanvasContext } from '../../hooks/offCanvasContext';
import { useEffect } from 'react'; import OffCanvasC from '../../components/Task/OffCanvasC';
import { taskSelectedContext } from '../../hooks/taskSelectedContext';
import { modalContextEdit } from '../../hooks/modalContextEdit';
import ModalTaskEdit from '../../components/Task/ModalTaskEdit';



export default function Index() {
  //Se ejecuta al cargar el componente index
  useEffect(() => {
    pageLoad();
  }, [])
  const [valuesTask, setValuesTask] = useState();
  const pageLoad = () => {
    const data = localStorage.getItem('task');
    if (data) {
      handleClickFilter(nameFilter);
      //setValuesTask(JSON.parse(data));
    }
  }
  //Mostrar la modal de crear nueva tarea
  const [show, setShow] = useState(false);
  const value = { show, setShow };
  const handleShowModal = () => setShow(true);
  useEffect(() => {
    pageLoad();
  }, [show])
  //Mostrar el canvas de la tarea
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const valueCanvas = { showOffCanvas, setShowOffCanvas };

  const [taskSelected, setTaskSelected] = useState();
  const valueFiterTask = { taskSelected, setTaskSelected };
  
  const handleShowOffCanvas = (e) => {
    const index = e.target.getAttribute('taskid');
    setTaskSelected(valuesTask.filter(e => e.id === index)[0]);
    setShowOffCanvas(true);
  };

  useEffect(() => {
   pageLoad();
  }, [showOffCanvas])

  //Filtros
  const [nameFilter, setNameFilter] = useState('Todos');
  const handleClickFilter = (filter) => {
    setNameFilter(filter);
    const data = JSON.parse(localStorage.getItem('task'));
    if(filter !== 'Todos'){
      const progress = filter === 'Completada' ? true : false;
      const dataSave = data.filter(task=> task.progresFinish === progress);
      setValuesTask([...dataSave]);
    }else{
      setValuesTask([...data]);
    }
    
  }
  //Mostrar la modal de editar tarea
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    pageLoad();
  }, [showEdit])
  const valueEdit = { showEdit, setShowEdit };
  const [dataEdit, setDataEdit] = useState();
  const handleShowModalEdit = (e) => {
    const id = e.target.getAttribute('taskid');
    const index = valuesTask.filter(task => task.id === id);
    setDataEdit(index);
    setShowEdit(true)
  };
  //Elimina la tarea
  const handleShowModalDelet = (e) => {
    const id = e.target.getAttribute('taskid');
    const data = JSON.parse(localStorage.getItem('task'));
    const newTasks = data.filter(value => value.id !== id);
    localStorage.setItem('task',JSON.stringify(newTasks))
    pageLoad()
  }
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} className='mt-3 text-center'>
            <h3>{nameFilter}</h3>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Filtros
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {nameFilter !== 'Completada' && <Dropdown.Item onClick={() => handleClickFilter('Completada')}>Completada</Dropdown.Item>}
                {nameFilter !== 'No Completada' && <Dropdown.Item onClick={() => handleClickFilter('No Completada')}>No Completada</Dropdown.Item>}
                {nameFilter !== 'Todos' && <Dropdown.Item onClick={() => handleClickFilter('Todos')}>Todos</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {valuesTask && valuesTask.map(({ descriptionTask, id, nameTask, progresFinish, subTask }) =>
            <Col key={id} lg={4} md={6} xs={12} className='mb-3'>
              <Card className='mt-3 h-100'>
                <Card.Header>
                  <span className='fw-bold'>
                    {nameTask}
                  </span>
                </Card.Header>
                <Card.Body>
                  <div className={progresFinish ? 'bg-success progress progressText' : 'bg-warning progress progressText'} >
                    {progresFinish ? 'Completada' : 'No completada'}
                  </div>
                  <Card.Text>
                    {descriptionTask}
                  </Card.Text>
                  <Button variant={'primary'} className='text-white' taskid={id} onClick={handleShowOffCanvas}>
                    Ver
                  </Button>
                  {!progresFinish && <Button variant={'secondary'} className='text-white ms-2' taskid={id} onClick={handleShowModalEdit}>
                    Editar
                  </Button>}
                  {!progresFinish && <Button variant={'danger'} className='text-white ms-2' taskid={id} onClick={handleShowModalDelet}>
                    Eliminar
                  </Button>}
                </Card.Body>
              </Card>
            </Col>
          )}
          <Col lg={4} md={6} xs={12} className='mb-3'>
            <Card className='mt-3 h-100'>
              <Card.Header>
                <span className='fw-bold'>
                  Nuevo Tarea!
                </span>
              </Card.Header>
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} />
                </Placeholder>
                <Button variant="primary" xs={6} onClick={handleShowModal}>Agregar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {taskSelected &&
        <offCanvasContext.Provider value={valueCanvas}>
          <taskSelectedContext.Provider value={valueFiterTask}>
            <OffCanvasC />
          </taskSelectedContext.Provider>
        </offCanvasContext.Provider>
      }

      <modalContext.Provider value={value}>
        <ModalTask />
      </modalContext.Provider>

      <modalContextEdit.Provider value={valueEdit}>
        {dataEdit && <ModalTaskEdit data={dataEdit} />}
      </modalContextEdit.Provider>


    </>
  )
}
