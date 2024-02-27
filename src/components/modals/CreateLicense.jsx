import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button } from 'react-bootstrap';
import { createLicense, fetchLicenses } from '../../http/licenseAPI';
import { Context } from "../../index";

const CreateLicense = observer(({ show, onHide }) => {
    const { license } = useContext(Context)
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const addLicense = async () => {
        try {
            const formData = new FormData()
            formData.append('license_name', name)
            formData.append('license_file', file)
            for (let key of formData.keys()) {
                console.log(`${key}: ${formData.get(key)}`);
            }
            await createLicense(formData).then(data => fetchLicenses(null).then(data => { license.setLicenses(data) }))
            setName('')
            onHide()
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
                    Добавить лицензию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="label mt-4 mb-1">Название</p>
                <Form.Control
                    as="textarea" rows={3}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <p className="label mt-2 mb-1">Файл</p>
                <Form.Control
                    onChange={selectFile}
                    className="mt-2"
                    type="file"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={addLicense}>Добавить</Button>
            </Modal.Footer>
        </Modal >
    );
});

export default CreateLicense;