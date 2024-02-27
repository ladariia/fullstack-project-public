import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { fetchServices } from '../http/serviceAPI';
import { observer } from 'mobx-react-lite';
import ServiceItem from '../components/ServiceItem';
import '../styles/ServicePage.css';
import Spinner from 'react-bootstrap/Spinner';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';

const ServicesPage = observer(() => {
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)
    const [isLoading3, setIsLoading3] = useState(true)
    const { service1, service2, service3 } = useContext(Context)
    useEffect(() => {
        try {
            fetchServices(1).then(data => {
                service1.setServices(data)
                setIsLoading1(false)
            }
            )
            fetchServices(2).then(data => {
                service2.setServices(data)
                setIsLoading2(false)
            }
            )
            fetchServices(3).then(data => {
                service3.setServices(data)
                setIsLoading3(false)
            }
            )
        } catch (error) {
            alert(error.response.data.message)
        }

    }, [])
    return (
        <main>
            <div className="servicesPage">
                <Breadcrumbs
                    className="breadcrumb"
                    separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link
                        to={MAINPAGE_ROUTE}>
                        Главная
                    </Link>
                    <Typography color="text.primary">Услуги</Typography>
                </Breadcrumbs>
                <div className="serviceBlock serviceProtect">
                    <div className="block">
                        <h2><span className="orange">Защищаем</span> информацию</h2>
                        <p>Являемся лидерами по защите государственной тайны, персональных данных и конфиденциальной информации.</p>
                    </div>
                    {
                        isLoading1 ?
                            <Spinner className="spinner-grow d-flex m-auto mb-5" animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                            :
                            <div className="serviceBlock__item">
                                {
                                    service1.services.map(service =>
                                        <ServiceItem key={service.service_id} service={service} />
                                    )
                                }
                            </div>
                    }
                </div>
                <div className="serviceBlock serviceDesign">
                    <div className="block">
                        <h2><span className="orange">Проектируем</span> системы безопасности</h2>
                        <p>Системы охранно-пожарной сигнализации, контроля и управления доступом.</p>
                    </div>
                    {
                        isLoading2 ?
                            <Spinner className="spinner-grow d-flex m-auto mb-5" animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                            :
                            <div className="serviceBlock__item">
                                {
                                    service2.services.map(service =>
                                        <ServiceItem key={service.service_id} service={service} />
                                    )
                                }

                            </div>
                    }
                </div>
                <div className="serviceBlock serviceDesign">
                    <div className="block">
                        <h2><span className="orange">Консультируем</span> по вопросу получения <br /> лицензий ФСБ и ФСТЭК</h2>
                        <p>Осуществляем помощь в подготовке и проверке документов на получение лицензии ФСБ и ФСТЭК в любом городе России</p>
                    </div>
                    {
                        isLoading3 ?
                            <Spinner className="spinner-grow d-flex m-auto mb-5" animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                            :
                            <div className="serviceBlock__item">
                                {
                                    service3.services.map(service =>
                                        <ServiceItem key={service.service_id} service={service} />
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </main>
    );
});

export default ServicesPage;