import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { Dropdown, Form, Spinner } from 'react-bootstrap';
import { fetchCourses, fetchShedules } from '../http/courseAPI';
import { observer } from 'mobx-react-lite';
import Button from '../components/UI/button/Button';
import { getMailsList, createRequest, createFirmRequest, createMailRequest } from '../http/requestAPI';
import '../styles/RequestPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Request from '../components/modals/Request';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE, COURSES_ROUTE } from '../utils/consts';
import { fetchPdn } from '../http/licenseAPI';
import { baseURL } from "../utils/consts";


const RequestPage = observer(() => {
    const { shedule } = useContext(Context)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    useEffect(() => {
        setIsLoading1(true)
        fetchCourses(null).then(data => {
            shedule.setCourses(data)
            setIsLoading1(false)
        }
        )
        setIsLoading2(true)
        fetchShedules(shedule.selectedCourse.course_id).then(data => {
            shedule.setShedules(data)
            setIsLoading2(false)
        })
    }, [shedule.selectedCourse])

    const [active, setActive] = useState(0)
    const [message, setMessage] = useState('')
    let activeName
    active ? activeName = "Юридическое лицо" : activeName = "Физическое лицо"

    const [personal, setPersonal] = useState({ personal_lastname: '', personal_name: '', personal_surname: '', personal_phone: '', personal_email: '' })
    const [personalDirty, setPersonalDirty] = useState({ personal_lastname: false, personal_name: false, personal_phone: false, personal_email: false })
    const [personalError, setPersonalError] = useState({ personal_lastname: 'Обязательное поле', personal_name: 'Обязательное поле', personal_phone: 'Обязательное поле', personal_email: 'Обязательное поле' })
    const [courseDirty, setCourseDirty] = useState(false)
    const [sheduleDirty, setSheduleDirty] = useState(false)
    const [courseError, setCourseError] = useState('Выберите курс')
    const [sheduleError, setSheduleError] = useState('Выберите дату')
    const [memberError, setMemberError] = useState('Заполните данные об обучаемых или удалите пустые строки')

    const [firm, setFirm] = useState({ firm_name: '', firm_represantivename: '', firm_phone: '', firm_email: '' })
    const [firmDirty, setFirmDirty] = useState({ firm_name: false, firm_represantivename: false, firm_phone: false, firm_email: false })
    const [firmError, setFirmError] = useState({ firm_name: 'Обязательное поле', firm_represantivename: 'Обязательное поле', firm_phone: 'Обязательное поле', firm_email: 'Обязательное поле' })

    const [memberDirty, setMemberDirty] = useState(false)
    const [member, setMember] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const addMember = (e) => {
        e.preventDefault()
        setMember([...member, { member_id: Date.now(), member_lastname: '', member_name: '', member_surname: '', member_jobtitle: '', member_email: '' }])
    }

    const removeMember = (member_id) => {
        setMember(member.filter(i => i.member_id !== member_id))
        setMemberDirty(false)
    }
    const changeMember = (key, value, member_id) => {
        setMember(member.map(i => i.member_id === member_id ? { ...i, [key]: value } : i))
    }


    const [pdn, setPdn] = useState('')
    useEffect(() => {
        fetchPdn(null).then(data => { setPdn(data[0].license_file) })
    }, [])

    const addRequest = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const formData = new FormData()
            formData.append('courseTg', shedule.selectedCourse.course_name)
            formData.append('request_type', active)
            formData.append('request_message', message)
            formData.append('request_type_name', activeName)
            formData.append('sheduleStart', shedule.selectedShedule.shedule_dateofstart)
            formData.append('sheduleFinish', shedule.selectedShedule.shedule_dateoffinish)
            if (shedule.selectedShedule.shedule_id === undefined) {
                alert('Выберите дату')
            } else {
                formData.append('sheduleSheduleId', shedule.selectedShedule.shedule_id)
                formData.append('request_personal', JSON.stringify(personal))
                await createRequest(formData).then(data => {
                    setRequestVisible(true)
                    setIsLoading(false)
                })
                createMailRequest(formData)
            }
        } catch (error) {
            alert(error.response.data.message)
            setIsLoading(false)
        }
    }

    const addFirmRequest = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const formData = new FormData()
            formData.append('courseTg', shedule.selectedCourse.course_name)
            formData.append('request_type', active)
            formData.append('request_message', message)
            formData.append('request_type_name', activeName)

            if (shedule.selectedShedule.shedule_id === undefined) {
                alert('Выберите дату')
                setIsLoading(false)
            } else {
                formData.append('sheduleSheduleId', shedule.selectedShedule.shedule_id)
                formData.append('sheduleStart', shedule.selectedShedule.shedule_dateofstart)
                formData.append('sheduleFinish', shedule.selectedShedule.shedule_dateoffinish)
                formData.append('request_firm', JSON.stringify(firm))
                formData.append('firm_member', JSON.stringify(member))
                const person = member.find(element => {
                    if (element.member_lastname === '' || element.member_name === '' || element.member_jobtitle === '' || element.member_email === '') {
                        return true;
                    }
                    return false;
                })
                if (person !== undefined) {
                    setMemberDirty(true)
                    setIsLoading(false)
                } else {
                    await createFirmRequest(formData).then(data => {
                        setRequestVisible(true)
                        setIsLoading(false)
                    })
                    createMailRequest(formData)
                }
            }

        } catch (error) {
            alert(error.response.data.message)
            setIsLoading(false)
        }
    }

    const [requestVisible, setRequestVisible] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const [formValidFirm, setFormValidFirm] = useState(false)

    useEffect(() => {
        if (personalError.personal_lastname || personalError.personal_name || personalError.personal_phone || personalError.personal_email) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [personalError, courseError, sheduleError])

    useEffect(() => {
        if (firmError.firm_name || firmError.firm_represantivename || firmError.firm_phone || firmError.firm_email) {
            setFormValidFirm(false)
        } else {
            setFormValidFirm(true)
        }
    }, [firmError, courseError, sheduleError])

    return (
        <main>
            <div className="requestPage">
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
                    <Typography className="typography" color="text.primary">Подать заявку</Typography>
                </Breadcrumbs>
                <h2>Записаться на программу</h2>
                <div className="form">
                    <div className="aboutCourse">
                        <h3>Данные о курсе</h3>
                        <div className="dropdowns">
                            <div className="dropdowns__course">
                                <p className="label notnull">Курс</p>

                                <Dropdown >
                                    <Dropdown.Toggle
                                        variant="light"
                                        onBlur={e => setCourseDirty(true)}
                                    >
                                        {shedule.selectedCourse.course_name || "Не выбрано"}

                                        <Dropdown.Menu onClick={() => {
                                            shedule.setSelectedShedule([])
                                        }}>
                                            {isLoading1 ?
                                                <Spinner className="spinner-grow" role="status">
                                                    <span className="visually-hidden">Загрузка...</span>
                                                </Spinner>
                                                :
                                                shedule.courses.map(selected_course =>
                                                    <Dropdown.Item onClick={() => {

                                                        shedule.setSelectedCourse(selected_course)
                                                        if (shedule.selectedCourse.course_name === undefined) {
                                                            setCourseError(true)
                                                        } else {
                                                            setCourseError('')
                                                        }
                                                    }}
                                                        key={selected_course.course_id}>{selected_course.course_name}</Dropdown.Item>
                                                )
                                            }
                                        </Dropdown.Menu>


                                    </Dropdown.Toggle>
                                </Dropdown>
                                {(courseDirty && courseError) && <div className="error">{courseError}</div>}
                            </div>
                            <div className="dropdowns__shedule">
                                <p className="label notnull">Расписание</p>
                                <Dropdown>
                                    <Dropdown.Toggle onBlur={e => setSheduleDirty(true)} disabled={shedule.selectedCourse.course_name === undefined} variant="light">
                                        {shedule.selectedShedule.shedule_dateofstart === undefined ? 'Не выбрано' : shedule.selectedShedule.shedule_dateofstart + '-' + shedule.selectedShedule.shedule_dateoffinish}
                                        <Dropdown.Menu>
                                            {isLoading2 ?
                                                <Spinner className="spinner-grow" role="status">
                                                    <span className="visually-hidden">Загрузка...</span>
                                                </Spinner>
                                                :
                                                shedule.shedules.map(selected_shedule =>
                                                    <Dropdown.Item onClick={() => {
                                                        shedule.setSelectedShedule(selected_shedule)
                                                        if (shedule.selectedShedule.shedule_dateofstart === undefined) {
                                                            setSheduleError(true)
                                                        } else {
                                                            setSheduleError('')
                                                        }
                                                    }}
                                                        key={selected_shedule.shedule_id}>{selected_shedule.shedule_dateofstart} - {selected_shedule.shedule_dateoffinish}</Dropdown.Item>
                                                )
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown.Toggle>
                                </Dropdown>
                                {(sheduleDirty && sheduleError) && <div className="error">{sheduleError}</div>}
                            </div>
                        </div>
                        <div className="switch__block">
                            <div className="switch">
                                <button className={active ? "switch__btn" : "switch__btn--active"} onClick={() => setActive(0)}>Физическое</button>
                                <button className={active ? "switch__btn--active" : "switch__btn"} onClick={() => setActive(1)}>Юридическое</button>
                            </div>
                        </div>
                        <div className="form">
                            {active === 0 &&
                                <Form className="personalForm">
                                    <h3>Данные об обучаемом</h3>
                                    <div className="personalForm__block">
                                        <div className="personalForm__item">
                                            <p className="label notnull">Фамилия</p>
                                            <Form.Control
                                                name="personal_lastname"
                                                className="formControl"
                                                placeholder="Фамилия"
                                                type="text"
                                                value={personal.personal_lastname}
                                                onBlur={e => setPersonalDirty({ ...personalDirty, personal_lastname: true })}
                                                onChange={
                                                    event => {
                                                        setPersonal({ ...personal, personal_lastname: event.target.value })
                                                        if (event.target.value.length < 1) {
                                                            setPersonalError({ ...personalError, personal_lastname: 'Обязательное поле' })
                                                        }
                                                        else if (event.target.value.length > 20) {
                                                            setPersonalError({ ...personalError, personal_lastname: 'Слишком длинное значение' })
                                                        } else {
                                                            setPersonalError({ ...personalError, personal_lastname: '' })
                                                        }
                                                    }
                                                }
                                            />
                                            {(personalDirty.personal_lastname && personalError.personal_lastname) && <div className="error">{personalError.personal_lastname}</div>}
                                        </div>
                                        <div className="personalForm__item">
                                            <p className="label notnull">Имя</p>
                                            <Form.Control
                                                name="personal_name"
                                                className="formControl"
                                                placeholder="Имя"
                                                type="text"
                                                onBlur={e => setPersonalDirty({ ...personalDirty, personal_name: true })}
                                                value={personal.personal_name}
                                                onChange={
                                                    event => {
                                                        setPersonal({ ...personal, personal_name: event.target.value })
                                                        if (event.target.value.length < 1) {
                                                            setPersonalError({ ...personalError, personal_name: 'Обязательное поле' })
                                                        }
                                                        else if (event.target.value.length > 20) {
                                                            setPersonalError({ ...personalError, personal_name: 'Слишком длинное значение' })
                                                        } else {
                                                            setPersonalError({ ...personalError, personal_name: '' })
                                                        }
                                                    }
                                                }
                                            />
                                            {(personalDirty.personal_name && personalError.personal_name) && <div className="error">{personalError.personal_name}</div>}
                                        </div>
                                        <div className="personalForm__item">
                                            <p className="label">Отчество</p>
                                            <Form.Control
                                                className="formControl"
                                                placeholder="Отчество"
                                                type="text"
                                                value={personal.personal_surname}
                                                onChange={event => setPersonal({ ...personal, personal_surname: event.target.value })}
                                            />
                                        </div>
                                        <div className="personalForm__item">
                                            <p className="label notnull">Номер телефона</p>
                                            <Form.Control
                                                name="personal_phone"
                                                className="formControl"
                                                placeholder="7 (XXX) XXX XXXX"
                                                type="text"
                                                value={personal.personal_phone}
                                                onBlur={e => setPersonalDirty({ ...personalDirty, personal_phone: true })}
                                                onChange={
                                                    event => {
                                                        setPersonal({ ...personal, personal_phone: event.target.value })
                                                        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
                                                        if (!re.test(String(event.target.value).toLowerCase())) {
                                                            setPersonalError({ ...personalError, personal_phone: 'Некорректный номер' })
                                                        } else {
                                                            setPersonalError({ ...personalError, personal_phone: '' })
                                                        }
                                                    }
                                                }
                                            />
                                            {(personalDirty.personal_phone && personalError.personal_phone) && <div className="error">{personalError.personal_phone}</div>}
                                        </div>
                                        <div className="personalForm__item">
                                            <p className="label notnull">Почта</p>
                                            <Form.Control
                                                name="personal_email"
                                                className="formControl"
                                                placeholder="Почта"
                                                type="text"
                                                value={personal.personal_email}
                                                onBlur={e => setPersonalDirty({ ...personalDirty, personal_email: true })}
                                                onChange={
                                                    event => {
                                                        setPersonal({ ...personal, personal_email: event.target.value })
                                                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                        if (!re.test(String(event.target.value).toLowerCase())) {
                                                            setPersonalError({ ...personalError, personal_email: 'Некорректный email' })
                                                        } else {
                                                            setPersonalError({ ...personalError, personal_email: '' })
                                                        }
                                                    }
                                                }
                                            />
                                            {(personalDirty.personal_email && personalError.personal_email) && <div className="error">{personalError.personal_email}</div>}
                                        </div>
                                    </div>
                                    <h3>Дополнительно</h3>
                                    <div className="firmForm__item">
                                        <p className="label">Комментарий к заявке</p>
                                        <Form.Control
                                            as="textarea" rows={4}
                                            className="formControl textarea"
                                            placeholder="Комментарий"
                                            type="text"
                                            value={message}
                                            onChange={event => setMessage(event.target.value)}
                                        />
                                    </div>
                                    <div className="myBtns">
                                        <div className="myBtnsBlock d-flex align-item-center justify-content-between">
                                            {isLoading ?
                                                <Spinner className="spinner" animation="border" role="status">
                                                    <span className="visually-hidden">Загрузка...</span>
                                                </Spinner>
                                                :
                                                <div></div>
                                            }
                                            <Button disabled={!formValid} onClick={addRequest}>Отправить</Button>
                                        </div>
                                        <p className="note">Нажимая на кнопку «Отправить», вы даете согласие на обработку персональных данных и ознакомлены с <Link to={baseURL + pdn} target="_blank">политикой конфиденциальности</Link>.</p>
                                    </div>
                                </Form>
                            }
                            {active === 1 && <form className="firmForm">
                                <h3>Данные о компании</h3>
                                <div className="firmForm__firm">
                                    <div className="firmForm__item">
                                        <p className="label notnull">Название компании</p>
                                        <Form.Control
                                            className="formControl"
                                            placeholder="Название компании"
                                            type="text"
                                            value={firm.firm_name}
                                            onBlur={e => setFirmDirty({ ...firmDirty, firm_name: true })}
                                            onChange={
                                                event => {
                                                    setFirm({ ...firm, firm_name: event.target.value })
                                                    if (event.target.value.length < 1) {
                                                        setFirmError({ ...firmError, firm_name: 'Обязательное поле' })
                                                    }
                                                    else if (event.target.value.length > 20) {
                                                        setFirmError({ ...firmError, firm_name: 'Слишком длинное значение' })
                                                    } else {
                                                        setFirmError({ ...firmError, firm_name: '' })
                                                    }
                                                }
                                            }
                                        />
                                        {(firmDirty.firm_name && firmError.firm_name) && <div className="error">{firmError.firm_name}</div>}
                                    </div>
                                    <div className="firmForm__item">
                                        <p className="label notnull">Имя представителя</p>
                                        <Form.Control
                                            className="formControl"
                                            placeholder="Имя представителя"
                                            type="text"
                                            value={firm.firm_represantivename}
                                            onBlur={e => setFirmDirty({ ...firmDirty, firm_represantivename: true })}
                                            onChange={
                                                event => {
                                                    setFirm({ ...firm, firm_represantivename: event.target.value })
                                                    if (event.target.value.length < 1) {
                                                        setFirmError({ ...firmError, firm_represantivename: 'Обязательное поле' })
                                                    }
                                                    else if (event.target.value.length > 20) {
                                                        setFirmError({ ...firmError, firm_represantivename: 'Слишком длинное значение' })
                                                    } else {
                                                        setFirmError({ ...firmError, firm_represantivename: '' })
                                                    }
                                                }
                                            }
                                        />
                                        {(firmDirty.firm_represantivename && firmError.firm_represantivename) && <div className="error">{firmError.firm_represantivename}</div>}
                                    </div>
                                    <div className="firmForm__item">
                                        <p className="label notnull">Номер телефона</p>
                                        <Form.Control
                                            className="formControl"
                                            placeholder="7 (XXX) XXX XXXX"
                                            type="text"
                                            value={firm.firm_phone}
                                            onBlur={e => setFirmDirty({ ...firmDirty, firm_phone: true })}
                                            onChange={
                                                event => {
                                                    setFirm({ ...firm, firm_phone: event.target.value })
                                                    const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
                                                    if (!re.test(String(event.target.value).toLowerCase())) {
                                                        setFirmError({ ...firmError, firm_phone: 'Некорректный номер' })
                                                    } else {
                                                        setFirmError({ ...firmError, firm_phone: '' })
                                                    }
                                                }
                                            }
                                        />
                                        {(firmDirty.firm_phone && firmError.firm_phone) && <div className="error">{firmError.firm_phone}</div>}
                                    </div>
                                    <div className="firmForm__item">
                                        <p className="label notnull">Почта</p>
                                        <Form.Control
                                            className="formControl"
                                            placeholder="Почта"
                                            type="text"
                                            value={firm.firm_email}
                                            onBlur={e => setFirmDirty({ ...firmDirty, firm_email: true })}
                                            onChange={
                                                event => {
                                                    setFirm({ ...firm, firm_email: event.target.value })
                                                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                    if (!re.test(String(event.target.value).toLowerCase())) {
                                                        setFirmError({ ...firmError, firm_email: 'Некорректный email' })
                                                    } else {
                                                        setFirmError({ ...firmError, firm_email: '' })
                                                    }
                                                }
                                            }
                                        />
                                        {(firmDirty.firm_email && firmError.firm_email) && <div className="error">{firmError.firm_email}</div>}
                                    </div>
                                </div>
                                <h3>Данные об обучаемых</h3>
                                <button className="addStudent" onClick={addMember}>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0417 8.5C12.0417 8.89171 11.7243 9.20833 11.3333 9.20833H9.20833V11.3333C9.20833 11.725 8.891 12.0417 8.5 12.0417C8.109 12.0417 7.79167 11.725 7.79167 11.3333V9.20833H5.66667C5.27567 9.20833 4.95833 8.89171 4.95833 8.5C4.95833 8.10829 5.27567 7.79167 5.66667 7.79167H7.79167V5.66667C7.79167 5.27496 8.109 4.95833 8.5 4.95833C8.891 4.95833 9.20833 5.27496 9.20833 5.66667V7.79167H11.3333C11.7243 7.79167 12.0417 8.10829 12.0417 8.5ZM17 3.54167V13.4583C17 15.4112 15.4112 17 13.4583 17H3.54167C1.58879 17 0 15.4112 0 13.4583V3.54167C0 1.58879 1.58879 0 3.54167 0H13.4583C15.4112 0 17 1.58879 17 3.54167ZM15.5833 3.54167C15.5833 2.37008 14.6299 1.41667 13.4583 1.41667H3.54167C2.37008 1.41667 1.41667 2.37008 1.41667 3.54167V13.4583C1.41667 14.6299 2.37008 15.5833 3.54167 15.5833H13.4583C14.6299 15.5833 15.5833 14.6299 15.5833 13.4583V3.54167Z" fill="black" />
                                    </svg>
                                    Добавить обучаемого
                                </button>
                                {(memberDirty && memberError) && <div className="error">{memberError}</div>}
                                {
                                    member.map(i =>
                                        <div className="firmForm__student" key={i.member_id}>
                                            <div className="firmForm__item">
                                                <Form.Control
                                                    className="formControl"
                                                    placeholder="Фамилия"
                                                    type="text"
                                                    value={member.member_lastname}
                                                    onBlur={e => setMemberDirty(false)}
                                                    onChange={(e) => {
                                                        changeMember('member_lastname', e.target.value, i.member_id)
                                                    }}
                                                />
                                                <Form.Control
                                                    className="formControl"
                                                    placeholder="Имя"
                                                    type="text"
                                                    value={member.member_name}
                                                    onBlur={e => setMemberDirty(false)}
                                                    onChange={(e) => changeMember('member_name', e.target.value, i.member_id)}
                                                />
                                                <Form.Control
                                                    className="formControl"
                                                    placeholder="Отчество"
                                                    type="text"
                                                    value={member.member_surname}
                                                    onChange={(e) => changeMember('member_surname', e.target.value, i.member_id)}
                                                />
                                                <Form.Control
                                                    className="formControl"
                                                    placeholder="Должность"
                                                    type="text"
                                                    value={member.member_jobtitle}
                                                    onBlur={e => setMemberDirty(false)}
                                                    onChange={(e) => changeMember('member_jobtitle', e.target.value, i.member_id)}
                                                />
                                                <Form.Control
                                                    className="formControl"
                                                    placeholder="Корпоративная почта"
                                                    type="text"
                                                    value={member.member_email}
                                                    onBlur={e => setMemberDirty(false)}
                                                    onChange={(e) => changeMember('member_email', e.target.value, i.member_id)}
                                                />

                                                <button className="removeStudent" onClick={() => removeMember(i.member_id)}>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.58918 4.99747L9.87801 0.708643C10.0379 0.543132 10.0333 0.279338 9.86779 0.119472C9.70632 -0.0364875 9.4503 -0.0364875 9.28883 0.119472L4.99999 4.4083L0.711165 0.119472C0.545635 -0.0403938 0.28186 -0.0358039 0.121994 0.129707C-0.0339654 0.291175 -0.0339654 0.547175 0.121994 0.708643L4.41082 4.99747L0.121994 9.28629C-0.0406648 9.44901 -0.0406648 9.71277 0.121994 9.87546C0.284712 10.0381 0.548467 10.0381 0.711165 9.87546L4.99999 5.58664L9.28882 9.87546C9.45153 10.0381 9.71529 10.0381 9.87799 9.87546C10.0406 9.71275 10.0406 9.44899 9.87799 9.28629L5.58918 4.99747Z" fill="black" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                                <h3>Дополнительно</h3>
                                <div className="firmForm__item">
                                    <p className="label">Комментарий к заявке</p>
                                    <Form.Control
                                        as="textarea" rows={4}
                                        className="formControl textarea"
                                        placeholder="Комментарий"
                                        type="text"
                                        value={message}
                                        onChange={event => setMessage(event.target.value)}
                                    />
                                </div>
                                <div className="myBtns">
                                    <div className="myBtnsBlock d-flex align-item-center justify-content-between">
                                        {isLoading ?
                                            <Spinner className="spinner spinner-grow" animation="border" role="status">
                                                <span className="visually-hidden">Загрузка...</span>
                                            </Spinner>
                                            :
                                            <div></div>
                                        }

                                        <Button disabled={!formValidFirm} onClick={addFirmRequest}>Отправить</Button>
                                    </div>
                                    <p className="note">Нажимая на кнопку «Отправить», вы даете согласие на обработку персональных данных и ознакомлены с <Link to={baseURL + pdn} target="_blank">политикой конфиденциальности</Link>.</p>
                                </div>
                            </form>}
                        </div>
                    </div>
                </div>
            </div>
            <Request show={requestVisible} onHide={() => setRequestVisible(false)} />

        </main >
    );
});

export default RequestPage;