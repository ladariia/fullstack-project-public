import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBordered from '../components/UI/button/ButtonBordered';
import { MAINPAGE_ROUTE } from '../utils/consts';
import '../styles/Page404.css'


const Page404 = () => {
    const navigate = useNavigate()
    return (
        <main>
            <div className="block404">
                <svg className="quad" viewBox="0 0 491 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-9.11383e-06 47.5L44.6732 256L482.498 245.611L490.674 -6.18925e-06L-9.11383e-06 47.5Z" />
                </svg>
                <p className="title--xxl">404
            </p>
                <p className="title--xl">Страница, которую вы ищете - не существует.</p>
                <ButtonBordered onClick={() => navigate(MAINPAGE_ROUTE)}>
                    Вернуться на главную
                </ButtonBordered>
            </div>
        </main>
    );
};

export default Page404;