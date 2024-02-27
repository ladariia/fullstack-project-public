import React from 'react';
import '../styles/ContactPage.css'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';

const ContactPage = () => {
    return (
        <main>
            <div className="contactPage">
                <div className="contacts">
                    <Breadcrumbs
                        className="breadcrumb"
                        separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                        aria-label="breadcrumb">
                        <Link
                            to={MAINPAGE_ROUTE}>
                            Главная
                    </Link>
                        <Typography color="text.primary">Контакты</Typography>
                    </Breadcrumbs>
                    <h1>Контакты</h1>
                    <div className="contacts__block">
                        <div className="contacts__column">
                            <div className="address">
                                <p className="contact__key">Адрес</p>
                                <p className="contact__value">680021, Хабаровский край, г. Хабаровск, ул. Серышева, д. 47</p>
                            </div>
                            <div className="contacts__row">
                                <div className="time">
                                    <p className="contact__key">Время работы</p>
                                    <p className="contact__value">Пн-Пт  08:00-17:00<br />
                                    Сб, Вс  Выходной</p>
                                </div>
                                <div className="email">
                                    <p className="contact__key">E-MAIL</p>
                                    <p className="contact__value">cis@festu.khv.ru</p>
                                </div>
                            </div>
                        </div>
                        <div className="contacts__column">
                            <div className="contacts__row">
                                <div className="questions">
                                    <p className="contact__key">По общим вопросам</p>
                                    <p className="contact__value">+ 7 (4212) 40-70-25</p>
                                    <p className="contact__value">+ 7 (914) 775-40-74</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map">
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.071572738825!2d135.06069507634422!3d48.493519526314564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5efaea13abf4537f%3A0x1e913fbdee77c8f4!2z0JTQkNCb0KzQndCV0JLQntCh0KLQntCn0J3Qq9CZINCj0KfQldCR0J3Qni3QndCQ0KPQp9Cd0KvQmSDQptCV0J3QotCgINCf0J4g0JHQldCX0J7Qn9CQ0KHQndCe0KHQotCYINCY0J3QpNCe0KDQnNCQ0KbQmNCYINCd0JAg0KLQoNCQ0J3QodCf0J7QoNCi0JUsINCU0JLQk9Cj0J_QoQ!5e0!3m2!1sru!2sru!4v1684665972520!5m2!1sru!2sru" width="100%" height="100%" loading="lazy"></iframe> */}
                    <div className="bg"></div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;