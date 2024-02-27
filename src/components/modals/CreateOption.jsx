import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createOption, fetchOption } from '../../http/serviceAPI';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";

const CreateOption = observer(({ show, onHide, onUpd }) => {
    const { service1 } = useContext(Context)
    const [option, setOption] = useState([])

    const changeOption = (key, value, option_id) => {
        setOption(option.map(i => i.option_id === option_id ? { ...i, [key]: value } : i))
    }

    const removeOption = (option_id) => {
        setOption(option.filter(i => i.option_id !== option_id))
    }

    const addOption = () => {
        setOption([...option, { option_id: Date.now(), option_name: '' }])
    }
    const { service_id } = useParams()

    const add = async () => {
        try {
            const formData = new FormData()
            formData.append('service_option', JSON.stringify(option))
            formData.append('serviceServiceId', service_id)
            for (let key of formData.keys()) {
                console.log(`${key}: ${formData.get(key)}`);
            }
            await createOption(formData).then(data => {
                onUpd()
                setOption([])
                onHide()
            }
            )

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
                    Добавить опцию
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={addOption} variant="outline-dark">+</Button>
                {
                    option.map(i =>
                        <Row className="mt-2" key={i.option_id}>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea" rows={3}
                                    value={i.option_name}
                                    onChange={(e) => changeOption('option_name', e.target.value, i.option_id)}
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => removeOption(i.option_id)} variant={'outline-danger'}>
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

export default CreateOption;