import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_ROUTE } from '../utils/consts';

const ServiceItem = ({ service }) => {
    const navigate = useNavigate()
    return (
        <div className="service" onClick={() => navigate(SERVICE_ROUTE + '/' + service.service_id)}>
            <div className="container">
                <h3>{service.service_title}</h3>
                <div className="arrow"></div>
            </div>
        </div>
    );
};

export default ServiceItem;