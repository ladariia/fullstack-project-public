import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Button from '../components/UI/button/Button';
import { MAINPAGE_ROUTE, REQUEST_ROUTE, COURSES_ROUTE, PAGE404_ROUTE } from '../utils/consts';
import { fetchCourse } from '../http/courseAPI';
import '../styles/CoursePage.css';
import { baseURL } from "../utils/consts"
import Spinner from 'react-bootstrap/Spinner';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CoursePage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [course, setCourse] = useState({ course_module: [], course_shedule: [], format: [], type: [], document: [], subjects: [] })
    const { course_id } = useParams()
    useEffect(() => {
        try {
            fetchCourse(course_id).then(data => {
                setCourse(data)
                setIsLoading(false)
                if (data == null) {
                    navigate(PAGE404_ROUTE)
                }
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])
    const navigate = useNavigate()

    function declination(number, txt) {
        var cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function timeRus(amount, timename) {
        let problem_of_teen = amount % 100
        if (timename == 'часы') {
            var base = 'час';
            var endings = new Array('ов', 'ов', '', 'а');
        }
        if (problem_of_teen >= 11 && problem_of_teen <= 19) {
            return amount + " " + base + endings[0];
        }
        let problem_of_numerals = amount % 10;
        if (problem_of_numerals == 0 || (problem_of_numerals >= 5 && problem_of_numerals <= 9)) {
            return amount + " " + base + endings[1];
        }
        if (problem_of_numerals == 1) {
            return amount + " " + base + endings[2];
        }
        if (problem_of_numerals >= 2 && problem_of_numerals <= 4) {
            return amount + " " + base + endings[3];
        }
    }

    return (
        <main>
            {
                isLoading ?
                    <Spinner className="spinner-grow d-flex m-auto mb-5 mt-5" animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                    :
                    <div className="coursePage">
                        <Breadcrumbs
                            className="breadcrumb"
                            separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                            aria-label="breadcrumb">
                            <Link to={MAINPAGE_ROUTE}>
                                Главная
                            </Link>
                            <Link
                                to={COURSES_ROUTE}
                            >
                                Каталог программ
                            </Link>
                            <Typography className="typography" color="text.primary">{course.course_name}</Typography>
                        </Breadcrumbs>
                        <div className="about">
                            <div className="type">
                                <p>
                                    {course.type.type_name}
                                </p>
                            </div>
                            <h1>{course.course_name}</h1>
                            <Button onClick={() => navigate(REQUEST_ROUTE)}>Подать заявку</Button>
                        </div>
                        <div className="courseInfo">
                            <div className="courseInfo__item">
                                <p className="key">Формат</p>
                                <p className="value">{course.format.format_name}</p>
                            </div>
                            <div className="courseInfo__item">
                                <p className="key">Стоимость</p>
                                <p className="value">{course.course_price + declination(course.course_price, [' рубль', ' рубля', ' рублей'])}</p>
                            </div>
                            <div className="courseInfo__item">
                                <p className="key">Продолжительность</p>
                                <p className="value">{timeRus(course.course_duration, 'часы')}</p>
                            </div>
                            <div className="courseInfo__item">
                                <p className="key">Даты</p>
                                {course.course_shedule.map(shedule =>
                                    <p className="value" key={shedule.shedule_id}>
                                        {shedule.shedule_dateofstart} - {shedule.shedule_dateoffinish}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="faq">
                            <h2>Модули</h2>
                            <div className="faqList">
                                {course.course_module.map(module =>
                                    <div className="listItem" key={module.module_id}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="item"></div>
                                                <h3> {module.module_name}</h3>
                                            </div>
                                            {/*  <ul key="module.module_id" className="descr">
                                        {module.subjects.map(subject =>
                                            <li key={subject.subject_id}>
                                                {subject.subject_name}
                                            </li>
                                        )}
                                    </ul> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="document document--null">
                            <div className="container">
                                <h2>Учебный план</h2>
                                <a className="aContainer" href={baseURL + course.course_pdf} target="_blank">
                                    <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.00008 3.33398C3.15841 3.33398 1.68342 4.82565 1.68342 6.66732L1.66675 33.334C1.66675 35.1757 3.14175 36.6673 4.98341 36.6673H25.0001C26.8417 36.6673 28.3334 35.1757 28.3334 33.334V13.334L18.3334 3.33398H5.00008ZM28.3334 13.334C22.8106 13.334 18.3334 8.85683 18.3334 3.33398L28.3334 13.334Z" fill="#BFC3C8" />
                                        <path d="M28.3334 13.334L18.3334 3.33398C18.3334 8.85683 22.8106 13.334 28.3334 13.334Z" fill="#BFC3C8" />
                                        <path d="M28.3333 13.334L18.3333 3.33398V11.334C18.3333 12.4386 19.2287 13.334 20.3333 13.334H28.3333Z" fill="#79818C" />
                                    </svg>
                            Скачать PDF
                        </a>
                            </div>
                        </div>
                        <div className="document">
                            <div className="container">
                                <h2>Документ</h2>
                                <p>{course.document.document_name} при успешном завершении обучения.</p>
                            </div>
                        </div>
                    </div>
            }
        </main >
    );
};

export default CoursePage;