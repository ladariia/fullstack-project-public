import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { baseURL } from "../utils/consts";
import { Context } from '../index';
import { fetchLicenses } from '../http/licenseAPI';
import '../styles/LicensePage.css';
import Spinner from 'react-bootstrap/Spinner';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { MAINPAGE_ROUTE } from '../utils/consts';

const LicensePage = observer(() => {
    const { license } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        try {
            fetchLicenses().then(data => {
                license.setLicenses(data)
                setIsLoading(false)
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }, [])
    return (
        <main>
            <div className="licensePage">
                <Breadcrumbs
                    className="breadcrumb"
                    separator={<NavigateNextIcon sx={{ color: "#949494" }} fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link
                        to={MAINPAGE_ROUTE}>
                        Главная
                    </Link>
                    <Typography color="text.primary">Лицензии</Typography>
                </Breadcrumbs>
                <h1 id="start">Лицензии</h1>
                {
                    isLoading ?
                        <Spinner className="spinner-grow d-flex m-auto mb-5 mt-5" animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                        :
                        <div className="licensesBlock">
                            {
                                license.licenses.map(license =>
                                    <div key={license.license_id} className="licenseItem">
                                        <a className="aContainer" href={baseURL + license.license_file} target="_blank">
                                            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.00008 3.33398C3.15841 3.33398 1.68342 4.82565 1.68342 6.66732L1.66675 33.334C1.66675 35.1757 3.14175 36.6673 4.98341 36.6673H25.0001C26.8417 36.6673 28.3334 35.1757 28.3334 33.334V13.334L18.3334 3.33398H5.00008ZM28.3334 13.334C22.8106 13.334 18.3334 8.85683 18.3334 3.33398L28.3334 13.334Z" fill="#BFC3C8" />
                                                <path d="M28.3334 13.334L18.3334 3.33398C18.3334 8.85683 22.8106 13.334 28.3334 13.334Z" fill="#BFC3C8" />
                                                <path d="M28.3333 13.334L18.3333 3.33398V11.334C18.3333 12.4386 19.2287 13.334 20.3333 13.334H28.3333Z" fill="#79818C" />
                                            </svg>
                                            <p>{license.license_name}</p>
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                }
            </div>
        </main>
    );
});

export default LicensePage;