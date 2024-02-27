import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button, Col, Row, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { fetchLicenses, deleteLicense, updatePdn, fetchPdn } from '../http/licenseAPI';
import { baseURL } from "../../../dvunc-app/src/utils/consts";
import CreateLicense from '../components/modals/CreateLicense';

const AdminLicensePage = observer(() => {
    const { license } = useContext(Context)
    const [licenseVisible, setLicenseVisible] = useState(false)
    const [pdn, setPdn] = useState('')


    useEffect(() => {
        try {
            fetchLicenses(null).then(data => { license.setLicenses(data) })
            fetchPdn(null).then(data => { setPdn(data[0].license_file) })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    const delLicense = async (id) => {
        try {
            const isBoss = window.confirm("Подтвердите удаление лицензии")
            if (isBoss) {
                await deleteLicense(id).then(data => fetchLicenses(null).then(data => { license.setLicenses(data) }))
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updPdn = async () => {
        try {
            const formData = new FormData()
            formData.append('license_file', file)
            await updatePdn(formData)
            alert('Файл политики успешно обновлен')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container className="adminLicensePage mt-5 mb-5">
            <h1 className="mt-5 mb-3">Документы</h1>
            <h2 className="mt-5 mb-3">Лицензии</h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Лицензия</th>
                        <th>Файл</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {license.licenses.map(license =>
                        <tr key={license.license_id}>
                            <td>{license.license_name}</td>
                            {license.license_file === null ?
                                <td>
                                    Отсутствует
                                </td>
                                :
                                <td>
                                    <a className="aContainer" href={baseURL + license.license_file} target="_blank">
                                        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.00008 3.33398C3.15841 3.33398 1.68342 4.82565 1.68342 6.66732L1.66675 33.334C1.66675 35.1757 3.14175 36.6673 4.98341 36.6673H25.0001C26.8417 36.6673 28.3334 35.1757 28.3334 33.334V13.334L18.3334 3.33398H5.00008ZM28.3334 13.334C22.8106 13.334 18.3334 8.85683 18.3334 3.33398L28.3334 13.334Z" fill="#BFC3C8" />
                                            <path d="M28.3334 13.334L18.3334 3.33398C18.3334 8.85683 22.8106 13.334 28.3334 13.334Z" fill="#BFC3C8" />
                                            <path d="M28.3333 13.334L18.3333 3.33398V11.334C18.3333 12.4386 19.2287 13.334 20.3333 13.334H28.3333Z" fill="#79818C" />
                                        </svg>
                                    </a>
                                </td>
                            }
                            <td>
                                <Button onClick={() => delLicense(license.license_id)} variant="danger">Удалить</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={() => setLicenseVisible(true)} variant="dark" className="mb-5">Добавить лицензию</Button>
            <CreateLicense show={licenseVisible} onHide={() => setLicenseVisible(false)} />
            <h2 className="mt-5 mb-3">Политика обработки персональных данных</h2>
            <Row className="d-flex align-items-end">
                <Col md={1}>
                    <a className="aContainer" href={baseURL + pdn} target="_blank">
                        <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00008 3.33398C3.15841 3.33398 1.68342 4.82565 1.68342 6.66732L1.66675 33.334C1.66675 35.1757 3.14175 36.6673 4.98341 36.6673H25.0001C26.8417 36.6673 28.3334 35.1757 28.3334 33.334V13.334L18.3334 3.33398H5.00008ZM28.3334 13.334C22.8106 13.334 18.3334 8.85683 18.3334 3.33398L28.3334 13.334Z" fill="#BFC3C8" />
                            <path d="M28.3334 13.334L18.3334 3.33398C18.3334 8.85683 22.8106 13.334 28.3334 13.334Z" fill="#BFC3C8" />
                            <path d="M28.3333 13.334L18.3333 3.33398V11.334C18.3333 12.4386 19.2287 13.334 20.3333 13.334H28.3333Z" fill="#79818C" />
                        </svg>
                    </a>
                </Col>
                <Col md={11}>
                    <Form.Control
                        onChange={selectFile}
                        className="mt-2"
                        type="file"
                    />
                </Col>
            </Row>
            <Button onClick={updPdn} variant="dark" className="mt-3">Обновить</Button>
        </Container>
    );
});

export default AdminLicensePage;