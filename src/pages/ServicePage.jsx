import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../components/UI/button/Button';
import { CONTACT_ROUTE, PAGE404_ROUTE, SERVICES_ROUTE } from '../utils/consts';
import { fetchService } from '../http/serviceAPI';
import Spinner from 'react-bootstrap/Spinner';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';

const ServicePage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [service, setService] = useState({ service_option: [] })
    const { service_id } = useParams()
    useEffect(() => {
        try {
            fetchService(service_id).then(data => {
                setService(data)
                setIsLoading(false)
                if (data == null) {
                    navigate(PAGE404_ROUTE)
                }
            })

        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])
    return (
        <main>
            {
                isLoading ?
                    <Spinner className="spinner-grow d-flex m-auto mb-5 mt-5" animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                    :
                    <div className="servicePage">
                        <div className="about">
                            <Breadcrumbs
                                className="breadcrumb"
                                separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                                aria-label="breadcrumb">
                                <Link
                                    to={MAINPAGE_ROUTE}>
                                    Главная
                                </Link>
                                <Link
                                    to={SERVICES_ROUTE}>
                                    Услуги
                                </Link>
                                <Typography color="text.primary">{service.service_title}</Typography>
                            </Breadcrumbs>
                            <h1>{service.service_title}</h1>
                            <p className="p">{service.service_description}</p>
                            <Button onClick={() => navigate(CONTACT_ROUTE)}>Получить консультацию</Button>
                        </div>
                        <div className="solutions">
                            <h2>{service.service_optionTitle}</h2>
                            {service.service_option.map(option =>
                                <div className="listItem" key={option.option_id}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="item"></div>
                                            <p>{option.option_name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            }
        </main >
    );
};

export default ServicePage;