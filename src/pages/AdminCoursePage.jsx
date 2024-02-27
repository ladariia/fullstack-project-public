import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Table, Button, Col, Row, Form, Dropdown } from 'react-bootstrap';
import { fetchShedules, deleteShedule, fetchCourseUpd, updateCourse, fetchModules, deleteModule } from '../http/courseAPI';
import { useParams } from 'react-router-dom';
import { Context } from "../index";
import CreateShedule from '../components/modals/CreateShedule';
import CreateModule from '../components/modals/CreateModule';
import { baseURL } from "../../../dvunc-app/src/utils/consts";

const AdminCoursePage = observer(() => {
    const { module, shedule, course } = useContext(Context)
    const [name, setName] = useState('')
    const [duration, setDuration] = useState(0)
    const [price, setPrice] = useState(0)
    const { course_id } = useParams()
    const [file, setFile] = useState(null)
    const [pdf, setPdf] = useState(null)

    useEffect(() => {
        try {
            fetchCourseUpd(course_id).then(data => [course.setSelectedType(data.type), course.setSelectedFormat(data.format), course.setSelectedDocument(data.document), setName(data.course_name), setDuration(data.course_duration), setPrice(data.course_price), setPdf(data.course_pdf)])
            fetchShedules(course_id).then(data => shedule.setShedules(data))
            fetchModules(course_id).then(data => module.setModules(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const delShedule = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление даты")
            if (isBoss) {
                await deleteShedule(id).then(data => fetchShedules(course_id).then(data => shedule.setShedules(data)))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delModule = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление модуля")
            if (isBoss) {
                await deleteModule(id).then(data => fetchModules(course_id).then(data => module.setModules(data)))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const [sheduleVisible, setSheduleVisible] = useState(false)
    const [moduleVisible, setModuleVisible] = useState(false)

    const updCourse = () => {
        const formData = new FormData()
        formData.append('course_name', name)
        formData.append('typeTypeId', course.selectedType.type_id)
        formData.append('documentDocumentId', course.selectedDocument.document_id)
        formData.append('course_duration', `${duration}`)
        formData.append('course_pdf', file)
        formData.append('formatFormatId', course.selectedFormat.format_id)
        formData.append('course_price', `${price}`)
        for (let key of formData.keys()) {
            console.log(`${key}: ${formData.get(key)}`);
        }
        updateCourse(formData, course_id).then(alert('Данные курса успешно обновлены'))
    }

    return (
        <Container className="adminCourse mt-5 mb-5">
            <Row className="pb-5 justify-content-center">
                <Col md={6}>
                    <h2>Информация</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="light">
                            {course.selectedType.type_name || "Не выбрано"}
                            <Dropdown.Menu>
                                {course.types.map(type =>
                                    <Dropdown.Item onClick={() => course.setSelectedType(type)} key={type.type_id}>{type.type_name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle variant="light" className="w-5">
                            {course.selectedFormat.format_name || "Не выбрано"}
                            <Dropdown.Menu>
                                {course.formats.map(format =>
                                    <Dropdown.Item onClick={() => course.setSelectedFormat(format)} key={format.format_id}>{format.format_name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle variant="light" className="w-5">
                            {course.selectedDocument.document_name || "Не выбрано"}
                            <Dropdown.Menu>
                                {course.documents.map(document =>
                                    <Dropdown.Item onClick={() => course.setSelectedDocument(document)} key={document.document_id}>{document.document_name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                    <p className="label mt-4 mb-1">Название</p>
                    <Form.Control
                        as="textarea" rows={3}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <p className="label mt-2 mb-1"> Длительность</p>
                    <Form.Control
                        value={duration}
                        onChange={e => setDuration(Number(e.target.value))}
                        type="number"
                    />
                    <p className="label mt-2 mb-1">Стоимость</p>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-2"
                        type="number"
                    />
                    <p className="label mt-2 mb-1">Учебный план</p>
                    <Row className="d-flex align-items-end">
                        <Col md={1}>
                            {console.log(pdf)}
                            <a className="aContainer" href={baseURL + pdf} target="_blank">
                                <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.00008 3.33398C3.15841 3.33398 1.68342 4.82565 1.68342 6.66732L1.66675 33.334C1.66675 35.1757 3.14175 36.6673 4.98341 36.6673H25.0001C26.8417 36.6673 28.3334 35.1757 28.3334 33.334V13.334L18.3334 3.33398H5.00008ZM28.3334 13.334C22.8106 13.334 18.3334 8.85683 18.3334 3.33398L28.3334 13.334Z" fill="#BFC3C8" />
                                    <path d="M28.3334 13.334L18.3334 3.33398C18.3334 8.85683 22.8106 13.334 28.3334 13.334Z" fill="#BFC3C8" />
                                    <path d="M28.3333 13.334L18.3333 3.33398V11.334C18.3333 12.4386 19.2287 13.334 20.3333 13.334H28.3333Z" fill="#79818C" />
                                </svg>
                            </a>
                        </Col>
                        <Col md={11}>
                            <Form.Control
                                onChange={selectFile}
                                className="mt-2"
                                type="file"
                            />
                        </Col>
                    </Row>
                    <Button onClick={updCourse} variant="dark" className="mt-3">Обновить</Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5 pb-5">
                <Col md={6}>
                    <h2>Расписание</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shedule.shedules.map(shedule =>
                                <tr key={shedule.shedule_id}>
                                    <td>
                                        <table>
                                            <tbody className="value">
                                                <tr>
                                                    <td>{shedule.shedule_dateofstart}</td>
                                                    <td> - </td>
                                                    <td>{shedule.shedule_dateoffinish}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </td>
                                    <td>
                                        <Button onClick={() => delShedule(shedule.shedule_id)} variant="danger">Удалить</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={() => setSheduleVisible(true)} variant="dark" className="mb-5">Добавить расписание</Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2>Модули</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Модуль</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {module.modules.map(module =>
                                <tr key={module.module_id}>
                                    <td>
                                        <table>
                                            <tbody className="value">
                                                <tr>
                                                    <td>{module.module_name}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </td>
                                    <td>
                                        <Button onClick={() => delModule(module.module_id)} variant="danger">Удалить</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={() => setModuleVisible(true)} variant="dark" className="mb-5">Добавить модуль</Button>
                </Col>
            </Row>
            <CreateShedule show={sheduleVisible} onHide={() => setSheduleVisible(false)} />
            <CreateModule show={moduleVisible} onHide={() => setModuleVisible(false)} />
        </Container>
    );
});

export default AdminCoursePage;