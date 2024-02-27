import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { fetchAllServices, deleteService } from '../http/serviceAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import CreateService from '../components/modals/CreateService';
import { ServiceADMIN_ROUTE } from '../utils/consts';

const AdminServicesPage = observer(() => {
    const { service1 } = useContext(Context)
    useEffect(() => {
        try {
            fetchAllServices().then(data => {
                service1.setServices(data)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const delService = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление услуги")
            if (isBoss) {
                await deleteService(id).then(data => fetchAllServices().then(data => {
                    service1.setServices(data)
                }))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const [serviceVisible, setServiceVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Container className="mt-5 mb-5 adminPage">
            <h1 className="mb-3">Услуги</h1>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {service1.services.map(service =>
                        <tr key={service.service_id}>
                            <td>{service.service_title}</td>
                            <td>{service.typeofservice.typeofservice_title}</td>
                            <td>
                                <Button onClick={() => delService(service.service_id)} variant="danger">Удалить</Button>
                            </td>
                            <td>
                                <Button onClick={() => navigate(ServiceADMIN_ROUTE + '/service/' + service.service_id)} variant="secondary">Подробнее</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={() => setServiceVisible(true)} variant="dark" className="mb-5">Добавить новую услугу</Button>
            <CreateService show={serviceVisible} onHide={() => setServiceVisible(false)} />

        </Container>
    );
});

export default AdminServicesPage;