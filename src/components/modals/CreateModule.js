import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createModule, fetchModules } from '../../http/courseAPI';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";

const CreateModule = observer(({ show, onHide }) => {
    const { module } = useContext(Context)
    const [moduleUpdate, setModule] = useState([])

    const changeModule = (key, value, module_id) => {
        setModule(moduleUpdate.map(i => i.module_id === module_id ? { ...i, [key]: value } : i))
    }

    const removeModule = (module_id) => {
        setModule(moduleUpdate.filter(i => i.module_id !== module_id))
    }

    const addModule = () => {
        setModule([...moduleUpdate, { module_id: Date.now(), module_name: '' }])
    }
    const { course_id } = useParams()

    const add = async () => {
        try {
            const formData = new FormData()
            formData.append('course_module', JSON.stringify(moduleUpdate))
            formData.append('courseCourseId', course_id)
            for (let key of formData.keys()) {
                console.log(`${key}: ${formData.get(key)}`);
            }
            await createModule(formData).then(data => fetchModules(course_id).then(data => { module.setModules(data) }))
            setModule([])
            onHide()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Modal
            className="courseModal"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить модуль
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={addModule} variant="outline-dark">+</Button>
                {
                    moduleUpdate.map(i =>
                        <Row className="mt-2" key={i.module_id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.module_name}
                                    onChange={(e) => changeModule('module_name', e.target.value, i.module_id)}
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => removeModule(i.module_id)} variant={'outline-danger'}>
                                    Удалить
                            </Button>
                            </Col>
                        </Row>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={add}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateModule;