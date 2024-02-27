import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchServices } from '../http/serviceAPI';
import { observer } from 'mobx-react-lite';

const ServiceProtect = observer(() => {
    const { service } = useContext(Context)
    useEffect(() => {
        try {
            fetchServices(1).then(data => service.setServices(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])
    return (
        <div>
            {
                service.services.map(service =>
                    <div>{service.service_title}</div>
                )
            }
        </div>
    );
});

export default ServiceProtect;