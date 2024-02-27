import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form, Row, Col } from 'react-bootstrap';
import { Context } from "../../index";
import { fetchTypes, fetchFormats, createCourse, fetchDocuments, fetchCourses } from '../../http/courseAPI';
import { observer } from 'mobx-react-lite';

const CreateCourse = observer(({ show, onHide }) => {
    const { course } = useContext(Context)
    const [module, setModule] = useState([])
    const [shedule, setShedule] = useState([])
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [duration, setDuration] = useState()
    const [price, setPrice] = useState()

    useEffect(() => {
        try {
            fetchTypes().then(data => course.setTypes(data))
            fetchFormats().then(data => course.setFormats(data))
            fetchDocuments().then(data => course.setDocuments(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeModule = (key, value, module_id) => {
        setModule(module.map(i => i.module_id === module_id ? { ...i, [key]: value } : i))
    }

    const changeShedule = (key, value, shedule_id) => {
        setShedule(shedule.map(i => i.shedule_id === shedule_id ? { ...i, [key]: value } : i))
    }

    const removeModule = (module_id) => {
        setModule(module.filter(i => i.module_id !== module_id))
    }

    const removeShedule = (shedule_id) => {
        setShedule(shedule.filter(i => i.shedule_id !== shedule_id))
    }

    const addModule = () => {
        setModule([...module, { module_id: Date.now(), module_name: '' }])
    }

    const addShedule = () => {
        setShedule([...shedule, { shedule_id: Date.now(), shedule_dateofstart: '', shedule_dateoffinish: '' }])
    }

    const addCourse = async () => {
        try {
            const formData = new FormData()
            formData.append('course_name', name)
            formData.append('typeTypeId', course.selectedType.type_id)
            formData.append('documentDocumentId', course.selectedDocument.document_id)
            formData.append('course_duration', `${duration}`)
            formData.append('formatFormatId', course.selectedFormat.format_id)
            formData.append('course_pdf', file)
            formData.append('course_price', `${price}`)
            formData.append('course_module', JSON.stringify(module))
            formData.append('course_shedule', JSON.stringify(shedule))
            await createCourse(formData).then(data => fetchCourses(null).then(data => {
                course.setCourses(data)
                onHide()
                setModule([])
                setShedule([])
                setName('')
                setDuration()
                setPrice()
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
                    Добавить курс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="light">
                        {course.selectedType.type_name || "Выберите тип"}
                        <Dropdown.Menu>
                            {course.types.map(type =>
                                <Dropdown.Item onClick={() => course.setSelectedType(type)} key={type.type_id}>{type.type_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown.Toggle>
                </Dropdown>
                <Dropdown className="mt-2">
                    <Dropdown.Toggle variant="light" className="w-5">
                        {course.selectedFormat.format_name || "Выберите формат"}
                        <Dropdown.Menu>
                            {course.formats.map(format =>
                                <Dropdown.Item onClick={() => course.setSelectedFormat(format)} key={format.format_id}>{format.format_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown.Toggle>
                </Dropdown>
                <Dropdown className="mt-2">
                    <Dropdown.Toggle variant="light" className="w-5">
                        {course.selectedDocument.document_name || "Выберите документ"}
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
                <Form.Control
                    onChange={selectFile}
                    className="mt-2"
                    type="file"
                />
                <hr />
                <Button onClick={addModule} variant="outline-dark">Добавить новый модуль</Button>
                {
                    module.map(i =>
                        <Row className="mt-2" key={i.module_id}>
                            <Col md={9}>
                                <Form.Control
                                    as="textarea" rows={3}
                                    value={i.module_name}
                                    onChange={(e) => changeModule('module_name', e.target.value, i.module_id)}
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => removeModule(i.module_id)} variant={'outline-danger'}>
                                    Удалить
                                </Button>
                            </Col>
                            {/* <Col>
                                <Button onClick={addSubject} variant="outline-dark">+</Button>
                                {
                                    subject.map(j =>
                                        <div key={j.subject_id}>
                                            <Form.Control
                                                value={j.subject_name}
                                                onChange={(e) => changeSubject('subject_name', e.target.value, j.subject_id)}
                                                placeholder="Название"
                                            />
                                            <Button onClick={() => removeSubject(i.subject_id)} variant="outline-dark">-</Button>
                                        </div>
                                    )
                                }
                            </Col> */}
                        </Row>
                    )
                }
                <hr />
                <Button onClick={addShedule} variant="outline-dark">Добавить расписание</Button>
                {
                    shedule.map(i =>
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
                <Button variant="dark" onClick={addCourse}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateCourse;