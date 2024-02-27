import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Table, Button, Col, Row, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../index";
import { fetchService, deleteOption, fetchOption, updateService } from '../http/serviceAPI';
import { useParams } from 'react-router-dom';
import CreateOption from '../components/modals/CreateOption';

const AdminServicePage = observer(() => {
    const { service1 } = useContext(Context)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [option, setOption] = useState([])
    const { service_id } = useParams()
    useEffect(() => {
        try {
            fetchService(service_id).then(data => [service1.setSelectedType(data.typeofservice), setName(data.service_title), setTitle(data.service_optionTitle), setDescr(data.service_description), setOption(data.service_option)])
            fetchOption(service_id).then(data => [setOption(data)])
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const delOption = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление опции")
            if (isBoss) {
                await deleteOption(id).then(data => fetchService(service_id).then(data => [setOption(data.service_option)]))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const updOption = async () => {
        try {
            const formData = new FormData()
            formData.append('service_title', name)
            formData.append('service_optionTitle', title)
            formData.append('service_description', descr)
            formData.append('typeofserviceTypeofserviceId', service1.selectedType.typeofservice_id)
            formData.append('service_option', JSON.stringify(option))
            await updateService(formData, service_id).then(alert('Данные услуги успешно обновлены'))
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }
    const [optionVisible, setOptionVisible] = useState(false)
    return (
        <Container className="adminCourse mt-5 mb-5">
            <Row className="pb-5 justify-content-center">
                <Col md={6}>
                    <h2>Информация</h2>
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
                    <Button onClick={updOption} variant="dark" className="mt-3">Обновить</Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2>Опции</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Опция</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {option.map(option =>
                                <tr key={option.option_id}>
                                    <td>
                                        <table>
                                            <tbody className="value">
                                                <tr>
                                                    <td>{option.option_name}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </td>
                                    <td>
                                        <Button onClick={() => delOption(option.option_id)} variant="danger">Удалить</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={() => setOptionVisible(true)} variant="dark" className="mb-5">Добавить опцию</Button>
                </Col>
            </Row>
            <CreateOption show={optionVisible} onHide={() => setOptionVisible(false)} onUpd={() => fetchOption(service_id).then(data => [setOption(data)])} />
        </Container>
    );
});

export default AdminServicePage;