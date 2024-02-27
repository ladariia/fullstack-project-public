import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { Context } from "../index";
import { fetchCourses, fetchRequests, fetchShedules } from '../http/courseAPI';
import { observer } from 'mobx-react-lite';
import { RequestADMIN_ROUTE } from '../utils/consts';
import ButtonBordered from '../components/UI/button/ButtonBordered';

const AdminRequest = observer(() => {
    const navigate = useNavigate()
    const { shedule } = useContext(Context)
    useEffect(() => {
        try {
            fetchCourses(null).then(data => shedule.setCourses(data))
            fetchShedules(shedule.selectedCourse.course_id).then(data => {
                shedule.setShedules(data)
            })
            fetchRequests(shedule.selectedShedule.shedule_id).then(data => {
                shedule.setRequests(data)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [shedule.selectedCourse])

    useEffect(() => {
        try {
            fetchRequests(shedule.selectedShedule.shedule_id).then(data => {
                shedule.setRequests(data)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [shedule.selectedShedule]);

    const cls = () => {
        shedule.setSelectedCourse([])
        shedule.setSelectedShedule([])
    }

    return (
        <Container className="adminRequest mb-5">
            <h1 className="mt-5 mb-3">Текущие заявки</h1>
            <Row>
                <Col md={5}>
                    <Dropdown>
                        <Dropdown.Toggle variant="light">
                            {shedule.selectedCourse.course_name || "Не выбрано"}
                            <Dropdown.Menu onClick={() => shedule.setSelectedShedule([])}>
                                {shedule.courses.map(selected_course =>
                                    <Dropdown.Item onClick={() => shedule.setSelectedCourse(selected_course)} key={selected_course.course_id}>{selected_course.course_name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                </Col>
                <Col md={5}>
                    <Dropdown>
                        <Dropdown.Toggle disabled={shedule.selectedCourse.course_name === undefined} variant="light">
                            {shedule.selectedShedule.shedule_dateofstart === undefined ? 'Не выбрано' : shedule.selectedShedule.shedule_dateofstart + '-' + shedule.selectedShedule.shedule_dateoffinish}
                            <Dropdown.Menu>
                                {shedule.shedules.map(selected_shedule =>
                                    <Dropdown.Item onClick={() => shedule.setSelectedShedule(selected_shedule)} key={selected_shedule.shedule_id}>{selected_shedule.shedule_dateofstart} - {selected_shedule.shedule_dateoffinish}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <Button disabled={shedule.selectedCourse.course_name === undefined && shedule.selectedShedule.shedule_dateofstart === undefined} variant="light" onClick={() => cls()}>
                        Сбросить фильтр
                    </Button>
                </Col>
            </Row>
            <Table className="mt-5" striped bordered>
                <thead>
                    <tr>
                        <th>Заявка №</th>
                        <th>Тип заявки (лицо)</th>
                        <th>Дата получения заявки</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {shedule.requests.map(request =>
                        <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{request.request_type === false ? 'Физическое' : 'Юридическое'}</td>
                            <td>{request.request_time}</td>
                            <td >
                                {request.request_type === false ?
                                    <Button onClick={() => navigate(RequestADMIN_ROUTE + '/request/' + request.request_id)} variant="secondary">Подробнее</Button>
                                    :
                                    <Button onClick={() => navigate(RequestADMIN_ROUTE + '/request_firm/' + request.request_id)} variant="secondary">Подробнее</Button>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container >
    );
});

export default AdminRequest;