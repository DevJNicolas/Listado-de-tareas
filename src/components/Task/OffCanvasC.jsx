import React, { useContext, useEffect, useState } from 'react'
import { ProgressBar, Form, Offcanvas, Row, Col } from 'react-bootstrap'
import { offCanvasContext } from '../../hooks/offCanvasContext'
import { taskSelectedContext } from '../../hooks/taskSelectedContext';

export default function OffCanvasC() {
    //Use context de la offcanva
    const { showOffCanvas, setShowOffCanvas } = useContext(offCanvasContext);
    const handleClose = () => setShowOffCanvas(false);
    //Use context de la tarea seleccionada
    const { taskSelected } = useContext(taskSelectedContext);

    //Renderiza el porcentaje de avance de la tarea
    const [color, setColor] = useState();
    const renderPorcen = () => {
        let subTask = taskSelected.subTask, lenghtTask = subTask.length, x = 0;
        subTask.forEach(({ check }) => {
            check && x++;
        });
        const porce = (x * 100) / lenghtTask;
        let colorAssing = '';
        if (porce <= 25) {
            colorAssing = 'danger'
        } else if (porce > 25 && porce <= 50) {
            colorAssing = 'warning'
        } else if (porce > 50 && porce <= 75) {
            colorAssing = 'info'
        } else if (porce > 75 && porce <= 100) {
            colorAssing = 'success'
        }
        setColor(colorAssing);
        return Math.round(porce)
    }
    //Cada vez que se abre el offcanvas se renderiza el porcentaje
    useEffect(() => {
        if (showOffCanvas) {
            const porce = renderPorcen()
            setNextP(porce);
        }
    }, [showOffCanvas])
    //Va aumentando el porcentaje en cada click del check
    const [netxP, setNextP] = useState(0);
    const handleCheck = (e) => {
        const name = e.target.name, checked = e.target.checked;
        let index = taskSelected.subTask.findIndex(subT => subT.name === name);
        taskSelected.subTask[index].check = checked;
        const porce = renderPorcen();
        if (porce >= 100) {
            taskSelected.progresFinish = true
        } else {
            taskSelected.progresFinish = false
        }


        const taskGlobal = JSON.parse(localStorage.getItem('task')), indexGlobal = taskGlobal.findIndex(task => task.id === taskSelected.id)
        taskGlobal[indexGlobal] = taskSelected;
        localStorage.setItem('task', JSON.stringify(taskGlobal));
        setNextP(porce);
    }

    return (

        <Offcanvas show={showOffCanvas} onHide={handleClose} className='rounded'>

            <div className={`${taskSelected.progresFinish ? 'bg-success' : 'bg-warning'}  text-white p-2`}>
                <h5>{taskSelected.progresFinish ? 'Completada' : 'No completada'}</h5>
            </div>

            <div className='text-center mt-3'>
                {taskSelected && <h4>{taskSelected.nameTask.toUpperCase()}</h4>}
            </div>
            <Offcanvas.Body>
                {<ProgressBar now={netxP} label={`${netxP}%`} variant={color} className='w-100 p-0' />}
                {taskSelected && taskSelected.descriptionTask}
                <Form>
                    {taskSelected && taskSelected.subTask.map(({ name, check }, index) =>
                        <Form.Check
                            key={index}
                            type="switch"
                            id={index}
                            label={name}
                            name={name}
                            defaultChecked={check}
                            onChange={handleCheck}
                        />
                    )}
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
