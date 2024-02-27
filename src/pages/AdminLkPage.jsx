import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Table, Button, Col, Row, Form } from 'react-bootstrap';
import CreateUser from '../components/modals/CreateUser';
import CreateMail from '../components/modals/CreateMail';
import { fetchUserUpd, updLogin, updPassword, fetchUsers, deleteUser, updateRole } from '../http/userAPI';
import { fetchMails, deleteMail } from '../http/requestAPI'

const AdminLkPage = observer(() => {
    const [id, setId] = useState('')
    const [role, setRole] = useState('')
    const [login, setLogin] = useState('')
    const [oldPas, setOldPas] = useState('')
    const [pas, setPas] = useState('')
    const [mail, setMail] = useState([])
    const [users, setUsers] = useState([])
    const [userVisible, setUserVisible] = useState(false)
    const [mailVisible, setMailVisible] = useState(false)
    useEffect(() => {
        try {
            fetchUserUpd().then(data => [console.log(data), setLogin(data.user_login), setId(data.user_id), setRole(data.roleRoleId)])
            fetchMails().then(data => setMail(data))
            fetchUsers().then(data => setUsers(data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const updateLogin = async () => {
        try {
            await updLogin(id, login).then(alert('Логин успешно обновлен'))
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delMail = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление почты")
            if (isBoss) {
                await deleteMail(id).then(data => fetchMails().then(data => setMail(data)))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delUser = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление пользователя")
            if (isBoss) {
                await deleteUser(id).then(data => fetchUsers().then(data => setUsers(data)))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const updRole = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите делегирование прав")
            if (isBoss) {
                await updateRole(id).then(data => fetchUsers().then(data => setUsers(data)))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const updatePassword = async () => {
        try {
            await updPassword(id, oldPas, pas).then(data => {
                alert('Пароль успешно обновлен');
                setPas('')
                setOldPas('')
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="adminLkPage mt-5 mb-5">
            <Row className="pb-5 justify-content-center">
                <Col md={6}>
                    <h2>Сменить логин</h2>
                    <p className="label mt-4 mb-1">Логин</p>
                    <Form.Control
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Button onClick={updateLogin} variant="dark" className="mt-2">Обновить</Button>
                    <h2 className="mt-5">Сменить пароль</h2>
                    <p className="label mt-4 mb-1"> Введите старый пароль</p>
                    <Form.Control
                        value={oldPas}
                        onChange={e => setOldPas(e.target.value)}
                    />
                    <p className="label mt-2 mb-1"> Введите новый пароль</p>
                    <Form.Control
                        value={pas}
                        onChange={e => setPas(e.target.value)}
                    />
                    <Button onClick={updatePassword} variant="dark" className="mt-2">Обновить</Button>

                    <h2 className="mt-5">Список почт для отправки заявок</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Почта</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mail.map(i =>
                                <tr key={i.mail_id}>
                                    <td>{i.mail_name}</td>
                                    <td>
                                        <Button onClick={() => delMail(i.mail_id)} variant="danger">Удалить</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button onClick={() => setMailVisible(true)} variant="dark" className="mb-5">Добавить почту</Button>
                    <CreateMail show={mailVisible} onHide={() => setMailVisible(false)} onUpdate={() => fetchMails().then(data => setMail(data))} />
                    {
                        role === 1 ?
                            <div className="users">
                                <h2 className="mt-5">Пользователи</h2>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>Логин</th>
                                            <th colSpan={2}>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(i =>
                                            <tr key={i.user_id}>
                                                <td>{i.user_login}</td>
                                                <td>
                                                    <Button onClick={() => delUser(i.user_id)} variant="danger">Удалить</Button>
                                                </td>
                                                <td>
                                                    <Button onClick={() => updRole(i.user_id)} variant="secondary">Дать права суперпользователя</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Button onClick={() => setUserVisible(true)} variant="dark" className="mb-5">Добавить пользователя</Button>
                                <CreateUser show={userVisible} onHide={() => setUserVisible(false)} onUpdate={() => fetchUsers().then(data => setUsers(data))} />
                            </div>
                            :
                            <div></div>
                    }
                </Col>
            </Row>
        </Container>
    );
});

export default AdminLkPage;