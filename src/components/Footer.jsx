import React, { useState, useEffect } from 'react';
import '../styles/Footer.css'
import { Link, useNavigate } from "react-router-dom";
import { LICENSES_ROUTE } from '../utils/consts';
import { fetchPdn } from '../http/licenseAPI';
import { baseURL } from "../utils/consts"

const Footer = () => {
    const navigate = useNavigate()
    const [pdn, setPdn] = useState('')
    useEffect(() => {
        fetchPdn(null).then(data => { setPdn(data[0].license_file) })
    }, [])
    return (
        <footer>
            <div className="docBlock">
                <Link to={LICENSES_ROUTE}>Лицензии</Link>
                <Link to={baseURL + pdn} target="_blank">Политика обработки <br /> персональных данных</Link>
            </div>
            <div className="line"></div>
            <div className="contactBlock">
                <p>
                    680021, Хабаровский край, <br />
                    г. Хабаровск, ул. Серышева, д. 47
                </p>
                <p>
                    + 7 (4212) 40-70-25<br />
                    + 7 (914) 775-40-74
                </p>
                <p>
                    cis@festu.khv.ru
                </p>
            </div>
            <div className="line"></div>
            <div className="contactBlock contactBlock--developer">
                <a href="https://t.me/la_dariia">Разработка сайта</a>
            </div>
        </footer>
    );
};

export default Footer;