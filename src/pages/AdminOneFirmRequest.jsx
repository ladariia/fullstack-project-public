import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { deleteFirmRequest, fetchRequest } from '../http/courseAPI';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RequestADMIN_ROUTE, PAGE404_ROUTE } from '../utils/consts';

const AdminOneFirmRequest = () => {
    const { request_id } = useParams()
    const [request, setRequest] = useState({ firm: { firm_member: [] } })

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

    const delFirmRequest = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление заявки")
            if (isBoss) {
                await deleteFirmRequest(id).then(data => {
                    navigate(RequestADMIN_ROUTE)
                })
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="adminOneRequest">
            <div className="firm mt-5 mb-5">
                <h1>Заявка №{request.request_id}</h1>
                <p className="label">Дата получения заявки</p>
                {request.request_time}
                <h2 className="mt-5">Данные о компании</h2>
                <p className="label">Название компании</p>
                <p>{request.firm.firm_name}</p>
                <p className="label">Имя представителя</p>
                <p>{request.firm.firm_represantivename}</p>
                <p className="label">Номер телефона</p>
                <p>{request.firm.firm_phone}</p>
                <p className="label">Почта</p>
                <p>{request.firm.firm_email}</p>
                <h2 className="mt-5">Данные об обучаемых</h2>
                <div className="member">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Должность</th>
                                <th>Корпоративная почта</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                request.firm.firm_member.map((member, index) =>
                                    <tr key={member.member_id}>
                                        <td>{index + 1}</td>
                                        <td>{member.member_lastname}</td>
                                        <td>{member.member_name}</td>
                                        <td>{member.member_surname}</td>
                                        <td>{member.member_jobtitle}</td>
                                        <td>{member.member_email}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                <h2 className="mt-5">Дополнительно</h2>
                <div className="message">
                    <p className="label">Комментарий к заявке</p>
                    <p>{request.request_message}</p>
                </div>
            </div>
            <Button className="mb-5" onClick={() => delFirmRequest(request.firm.firm_id)} variant="danger">Удалить заявку</Button>
        </Container>
    );
};

export default AdminOneFirmRequest;