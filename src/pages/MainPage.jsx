import React, { useEffect, useState } from 'react';
import '../styles/Main.css'
/* import { clients } from '../const.js'; */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
/* import { Navigation } from "swiper"; */
import { Link, useNavigate } from "react-router-dom";
import { LICENSES_ROUTE, SERVICES_ROUTE, COURSES_ROUTE } from '../utils/consts';
/* import Lottie from "lottie-react";
import scrollAnimation from "../img/data.json"; */

const MainPage = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(true);
    const controlScroll = () => {
        if (window.scrollY > 2) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',
            controlScroll)
        return () => {
            window.removeEventListener('scroll',
                controlScroll)
        };
    }, []);

    return (
        <main className="mainPage">
            <div className="intro">
                <div className="intro__row">
                    <div className="textBlock">
                        <h1>Дальневосточный учебно-научный центр по информационной безопасности
                        </h1>
                        <p>Более 15 лет оказывает услуги в области защиты информации, а также осуществляет переподготовку и повышение квалификации специалистов в сфере защиты информации.</p>
                    </div>
                </div>
            </div>
            <div className="expertAreaBlock">
                <h2>Области экспертизы</h2>
                <div className="expertArea">
                    <div className="expertAreaItem light">
                        <div className="container">
                            <h3>Услуги в области <br /> защиты информации</h3>
                            <div className="link expertAreaLink">
                                <Link
                                    to={SERVICES_ROUTE}>
                                    Подробнее
                                <svg className="arrowMain" height="10" viewBox="0 0 23 13" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.1567 8.50289L18.4479 12.25C18.3588 12.3398 18.2528 12.4111 18.1361 12.4597C18.0193 12.5084 17.894 12.5334 17.7675 12.5334C17.641 12.5334 17.5157 12.5084 17.3989 12.4597C17.2822 12.4111 17.1762 12.3398 17.0871 12.25C16.9086 12.0704 16.8084 11.8275 16.8084 11.5743C16.8084 11.3212 16.9086 11.0783 17.0871 10.8987L20.4988 7.45831L0.958333 7.45831C0.704168 7.45831 0.460412 7.35734 0.280689 7.17762C0.100967 6.99789 0 6.75414 0 6.49997C0 6.24581 0.100967 6.00205 0.280689 5.82233C0.460412 5.64261 0.704168 5.54164 0.958333 5.54164L20.5563 5.54164L17.0871 2.08206C16.9973 1.99297 16.926 1.88697 16.8773 1.77019C16.8287 1.65341 16.8036 1.52815 16.8036 1.40164C16.8036 1.27513 16.8287 1.14987 16.8773 1.03309C16.926 0.916305 16.9973 0.810312 17.0871 0.721222C17.1762 0.631399 17.2822 0.560105 17.3989 0.511451C17.5157 0.462798 17.641 0.43775 17.7675 0.43775C17.894 0.43775 18.0193 0.462798 18.1361 0.511451C18.2528 0.560105 18.3588 0.631399 18.4479 0.721222L22.1567 4.43956C22.6951 4.97862 22.9975 5.70935 22.9975 6.47122C22.9975 7.2331 22.6951 7.96383 22.1567 8.50289Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="bg bg--1"></div>
                    </div>
                    <div className="expertAreaItem dark">
                        <div className="container">
                            <h3>Переподготовка и повышение <br /> квалификации</h3>
                            <div className="link expertAreaLink">
                                <Link
                                    to={COURSES_ROUTE}>
                                    Подробнее
                                    <svg className="arrowMain" height="10" viewBox="0 0 23 13" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.1567 8.50289L18.4479 12.25C18.3588 12.3398 18.2528 12.4111 18.1361 12.4597C18.0193 12.5084 17.894 12.5334 17.7675 12.5334C17.641 12.5334 17.5157 12.5084 17.3989 12.4597C17.2822 12.4111 17.1762 12.3398 17.0871 12.25C16.9086 12.0704 16.8084 11.8275 16.8084 11.5743C16.8084 11.3212 16.9086 11.0783 17.0871 10.8987L20.4988 7.45831L0.958333 7.45831C0.704168 7.45831 0.460412 7.35734 0.280689 7.17762C0.100967 6.99789 0 6.75414 0 6.49997C0 6.24581 0.100967 6.00205 0.280689 5.82233C0.460412 5.64261 0.704168 5.54164 0.958333 5.54164L20.5563 5.54164L17.0871 2.08206C16.9973 1.99297 16.926 1.88697 16.8773 1.77019C16.8287 1.65341 16.8036 1.52815 16.8036 1.40164C16.8036 1.27513 16.8287 1.14987 16.8773 1.03309C16.926 0.916305 16.9973 0.810312 17.0871 0.721222C17.1762 0.631399 17.2822 0.560105 17.3989 0.511451C17.5157 0.462798 17.641 0.43775 17.7675 0.43775C17.894 0.43775 18.0193 0.462798 18.1361 0.511451C18.2528 0.560105 18.3588 0.631399 18.4479 0.721222L22.1567 4.43956C22.6951 4.97862 22.9975 5.70935 22.9975 6.47122C22.9975 7.2331 22.6951 7.96383 22.1567 8.50289Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accreditation">
                <div className="container">
                    <h2 className="title--lg">Аккредитация</h2>
                    <p className="p--center">Центр имеет пакет разрешительных документов, дающий возможность предоставления широкого спектра услуг по защите информации, аттестации объектов информатизации и обучению.</p>
                    <div className="link">
                        <Link
                            to={LICENSES_ROUTE}>
                            Все лицензии
                            <svg className="arrowMain" height="10" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.1567 8.50289L18.4479 12.25C18.3588 12.3398 18.2528 12.4111 18.1361 12.4597C18.0193 12.5084 17.894 12.5334 17.7675 12.5334C17.641 12.5334 17.5157 12.5084 17.3989 12.4597C17.2822 12.4111 17.1762 12.3398 17.0871 12.25C16.9086 12.0704 16.8084 11.8275 16.8084 11.5743C16.8084 11.3212 16.9086 11.0783 17.0871 10.8987L20.4988 7.45831L0.958333 7.45831C0.704168 7.45831 0.460412 7.35734 0.280689 7.17762C0.100967 6.99789 0 6.75414 0 6.49997C0 6.24581 0.100967 6.00205 0.280689 5.82233C0.460412 5.64261 0.704168 5.54164 0.958333 5.54164L20.5563 5.54164L17.0871 2.08206C16.9973 1.99297 16.926 1.88697 16.8773 1.77019C16.8287 1.65341 16.8036 1.52815 16.8036 1.40164C16.8036 1.27513 16.8287 1.14987 16.8773 1.03309C16.926 0.916305 16.9973 0.810312 17.0871 0.721222C17.1762 0.631399 17.2822 0.560105 17.3989 0.511451C17.5157 0.462798 17.641 0.43775 17.7675 0.43775C17.894 0.43775 18.0193 0.462798 18.1361 0.511451C18.2528 0.560105 18.3588 0.631399 18.4479 0.721222L22.1567 4.43956C22.6951 4.97862 22.9975 5.70935 22.9975 6.47122C22.9975 7.2331 22.6951 7.96383 22.1567 8.50289Z" fill="black" />
                            </svg>
                        </Link>
                    </div>
                    <div className="accreditationItems">
                        <div className="accreditationItem">
                            <div className="accreditationItemImg accreditationItemImg--fstek">

                            </div>
                            <div className="accreditationItemName">
                                ФСТЭК России
                            </div>
                        </div>
                        <div className="accreditationItem">
                            <div className="accreditationItemImg accreditationItemImg--rosobr">

                            </div>
                            <div className="accreditationItemName">
                                Рособрнадзор
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <div className="clients">
                <h2>Клиенты</h2>
                <div className="clientItems">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            880: {
                                slidesPerView: 4
                            },
                        }}>
                        {clients.map((client) => createClientDiv(client))}
                    </Swiper>
                </div>
            </div> */}
        </main >
    );
};

const createClientDiv = (svg) => (
    <SwiperSlide key={Math.random().toString(16).slice(2)}>
        <div className="clientItem">
            <svg width="108" height="50" viewBox="0 0 108 50" xmlns="http://www.w3.org/2000/svg">
                <path d={`${svg}`} />
            </svg>
        </div>
    </SwiperSlide>
);

export default MainPage;
