import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button } from 'react-bootstrap';
import { registration } from '../../http/userAPI'

const CreateUser = observer(({ show, onHide, onUpdate }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const addUser = async () => {
        try {
            await registration(login, password).then(data => {
                onUpdate()
                onHide()
                setLogin('')
                setPassword('')
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Modal
            className="courseModal"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить пользователя
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="label mt-4 mb-1">Логин</p>
                <Form.Control
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <p className="label mt-1 mb-1">Пароль</p>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={addUser}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateUser;