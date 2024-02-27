import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import { fetchTypes, fetchAllServices, createService } from '../../http/serviceAPI';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";

const CreateService = observer(({ show, onHide }) => {
    const { service1 } = useContext(Context)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [option, setOption] = useState([])

    useEffect(() => {
        fetchTypes().then(data => service1.setTypes(data))
    }, [])

    const changeOption = (key, value, option_id) => {
        setOption(option.map(i => i.option_id === option_id ? { ...i, [key]: value } : i))
    }

    const removeOption = (option_id) => {
        setOption(option.filter(i => i.option_id !== option_id))
    }

    const addOption = () => {
        setOption([...option, { option_id: Date.now(), option_name: '' }])
    }

    const addService = async () => {
        try {
            const formData = new FormData()
            formData.append('service_title', name)
            formData.append('service_optionTitle', title)
            formData.append('service_description', descr)
            formData.append('typeofserviceTypeofserviceId', service1.selectedType.typeofservice_id)
            formData.append('service_option', JSON.stringify(option))
            await createService(formData).then(data => fetchAllServices().then(data => {
                service1.setServices(data)
                onHide()
                setName('')
                setTitle('')
                setDescr('')
                setOption([])
            }))
        }
        catch (error) {
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
                    Добавить услугу
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="light">
                        {service1.selectedType.typeofservice_title || "Выберите тип"}
                        <Dropdown.Menu>
                            {service1.types.map(type =>
                                <Dropdown.Item onClick={() => service1.setSelectedType(type)} key={type.typeofservice_id}>{type.typeofservice_title}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown.Toggle>
                </Dropdown>
                <p className="label mt-4 mb-1">Название</p>
                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <p className="label mt-2 mb-1">Заголовок</p>
                <Form.Control
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <p className="label mt-2 mb-1">Описание</p>
                <Form.Control
                    as="textarea" rows={3}
                    value={descr}
                    onChange={e => setDescr(e.target.value)}
                    className="mt-2"
                />
                <hr />
                <Button onClick={addOption} variant="outline-dark">Добавить опцию</Button>
                {
                    option.map(i =>
                        <Row className="mt-2" key={i.option_id}>
                            <Col md={9}>
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
                <Button variant="dark" onClick={addService}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateService;