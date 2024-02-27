import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createShedule } from '../../http/courseAPI';
import { observer } from 'mobx-react-lite';
import { fetchShedules } from '../../http/courseAPI';
import { Context } from "../../index";

const CreateShedule = observer(({ show, onHide }) => {
    const { shedule } = useContext(Context)
    const [sheduleUpdate, setShedule] = useState([])

    const changeShedule = (key, value, shedule_id) => {
        setShedule(sheduleUpdate.map(i => i.shedule_id === shedule_id ? { ...i, [key]: value } : i))
    }

    const removeShedule = (shedule_id) => {
        setShedule(sheduleUpdate.filter(i => i.shedule_id !== shedule_id))
    }

    const addShedule = () => {
        setShedule([...sheduleUpdate, { shedule_id: Date.now(), shedule_dateofstart: '', shedule_dateoffinish: '' }])
    }
    const { course_id } = useParams()

    const add = async () => {
        try {
            const formData = new FormData()
            formData.append('course_shedule', JSON.stringify(sheduleUpdate))
            formData.append('courseCourseId', course_id)
            await createShedule(formData).then(data => fetchShedules(course_id).then(data => { shedule.setShedules(data) }))
            setShedule([])
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
                    Добавить расписание
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={addShedule} variant="outline-dark">+</Button>
                {
                    sheduleUpdate.map(i =>
                        <Row className="mt-2" key={i.shedule_id}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.shedule_dateofstart}
                                    onChange={(e) => changeShedule('shedule_dateofstart', e.target.value, i.shedule_id)}
                                    type="date"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.shedule_dateoffinish}
                                    onChange={(e) => changeShedule('shedule_dateoffinish', e.target.value, i.shedule_id)}
                                    type="date"
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => removeShedule(i.shedule_id)} variant={'outline-danger'}>
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

export default CreateShedule;