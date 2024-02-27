import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import CourseList from '../components/CourseList';
import FaqList from '../components/FaqList';
import TypeBar from '../components/TypeBar';
import { fetchTypes, fetchCourses } from '../http/courseAPI';
import '../styles/CoursesPage.css';
import { observer } from 'mobx-react-lite';
import Spinner from 'react-bootstrap/Spinner';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';

const CoursesPage = observer(() => {
    const { course } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        try {
            fetchTypes().then(data => course.setTypes(data))
            fetchCourses(null).then(data => {
                course.setCourses(data)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    useEffect(() => {
        try {
            setIsLoading(true)
            fetchCourses(course.selectedType.type_id).then(data => {
                course.setCourses(data)
                setIsLoading(false)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [course.selectedType])

    return (
        <main>
            <div className="coursesPage">
                <Breadcrumbs
                    className="breadcrumb"
                    separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link
                        to={MAINPAGE_ROUTE}>
                        Главная
                    </Link>
                    <Typography color="text.primary">Каталог программ</Typography>
                </Breadcrumbs>
                <h2>Каталог программ</h2>
                <p>Все программы согласованы с ФСТЭК России.</p>
                <TypeBar />
                {
                    isLoading ?
                        <Spinner className="spinner-grow d-flex mb-5" animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                        :
                        <CourseList />
                }
                <div className="faq">
                    <h2>Часто задаваемые вопросы</h2>
                    <div className="faqList">
                        <FaqList />
                    </div>
                </div>
            </div>
        </main>
    );
});

export default CoursesPage;