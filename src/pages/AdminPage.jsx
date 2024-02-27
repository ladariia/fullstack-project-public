import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { fetchCourses, deleteCourse, fetchTypes, fetchFormats, fetchDocuments } from '../http/courseAPI';
import CreateCourse from '../components/modals/CreateCourse';
import { CourseADMIN_ROUTE } from '../utils/consts';

const Admin = observer(() => {
    const navigate = useNavigate()
    const { course } = useContext(Context)
    const [courseVisible, setCourseVisible] = useState(false)

    useEffect(() => {
        try {
            fetchCourses(null).then(data => {
                course.setCourses(data)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const delCourse = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление курса")
            if (isBoss) {
                await deleteCourse(id).then(data => fetchCourses(null).then(data => {
                    course.setCourses(data)
                }))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="mt-5 mb-5 adminPage">
            <h1 className="mb-3">Курсы</h1>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {course.courses.map(course =>
                        <tr key={course.course_id}>
                            <td>{course.course_name}</td>
                            <td>
                                <Button onClick={() => delCourse(course.course_id)} variant="danger">Удалить</Button>
                            </td>
                            <td>
                                <Button onClick={() => navigate(CourseADMIN_ROUTE + '/course/' + course.course_id)} variant="secondary">Подробнее</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Button onClick={() => setCourseVisible(true)} variant="dark" className="mb-5">Добавить новый курс</Button>
            <CreateCourse show={courseVisible} onHide={() => setCourseVisible(false)} />
        </Container>
    );
});

export default Admin;