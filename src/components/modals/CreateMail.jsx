import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button } from 'react-bootstrap';
import { createMail, fetchMails } from '../../http/requestAPI'

const CreateMail = observer(({ show, onHide, onUpdate }) => {
    const [mail, setMail] = useState('')

    const addMail = async () => {
        try {
            const formData = new FormData()
            formData.append('mail_name', mail)
            await createMail(formData).then(data => {
                onUpdate()
                onHide()
                setMail('')
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
                    Добавить почту
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="label mt-4 mb-1">Почта</p>
                <Form.Control
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                    type="email"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={addMail}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateMail;