import React, { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { fetchRequest, fetchPersonal, deleteRequest } from '../http/courseAPI';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RequestADMIN_ROUTE, PAGE404_ROUTE } from '../utils/consts';

const AdminOneRequest = () => {
    const { request_id } = useParams()
    const [request, setRequest] = useState({ personal: [] })

    useEffect(() => {
        try {
            fetchRequest(request_id).then(data => {
                setRequest(data)
                if (data == null) {
                    navigate(PAGE404_ROUTE)
                }
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const navigate = useNavigate()

    const delRequest = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление заявки")
            if (isBoss) {
                await deleteRequest(id).then(data => {
                    navigate(RequestADMIN_ROUTE)
                })
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="adminOneRequest">
            <div className="personal mt-5 mb-5">
                <h1>Заявка №{request.request_id}</h1>
                <p className="label">Дата получения заявки</p>
                {request.request_time}
                <h2 className="mt-5">Данные об обучаемом</h2>
                <p className="label">Фамилия</p>
                {request.personal.personal_lastname}
                <p className="label">Имя</p>
                {request.personal.personal_name}
                <p className="label">Отчество</p>
                {request.personal.personal_surname}
                <p className="label">Номер телефона</p>
                {request.personal.personal_phone}
                <p className="label">Почта</p>
                {request.personal.personal_email}
            </div>
            <div className="message">
                <p className="label">Комментарий к заявке</p>
                <p>{request.request_message}</p>
            </div>
            <Button className="mb-5" onClick={() => delRequest(request.personal.personal_id)} variant="danger">Удалить заявку</Button>
        </Container>
    );
};

export default AdminOneRequest;