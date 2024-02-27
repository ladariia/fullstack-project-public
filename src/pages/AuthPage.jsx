import React, { useState, useContext } from 'react';
import { Context } from '../index';
import { Card, Container, Form, Button, Spinner } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from "../http/userAPI";
import { observer } from 'mobx-react-lite';
import { ServiceADMIN_ROUTE } from '../utils/consts';
import ButtonBordered from '../components/UI/button/ButtonBordered';
import '../styles/AuthPage.css'

const Auth = observer(() => {
    const [isLoading, setIsLoading] = useState(false)
    const [user_login, setLogin] = useState('')
    const [user_password, setPassword] = useState('')
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const click = async () => {
        setIsLoading(true)
        try {
            let userData
            userData = await login(user_login, user_password)
            setIsLoading(false)
            user.setUser(user)
            user.setIsAuth(true)
            navigate(ServiceADMIN_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
            setIsLoading(false)
        }
    }

    return (
        <Container className="auth d-flex justify-content-center align-items-center">
            <Card className="authCard p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Логин"
                        value={user_login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        value={user_password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-3">
                        {isLoading ?
                            <Spinner className="spinner-grow" animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                            :
                            <div></div>
                        }
                        <Button className="enterBtn" variant="dark" onClick={click}>
                            Войти
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container >
    );
});

export default Auth;