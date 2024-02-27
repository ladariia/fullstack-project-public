import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ButtonBordered from '../../components/UI/button/ButtonBordered';
import { MAINPAGE_ROUTE } from '../../utils/consts';

const Request = ({ show, onHide }) => {
    const navigate = useNavigate()
    return (
        <Modal
            className="requestModal"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="requestModalBlock">
                <svg viewBox="0 0 491 279" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-9.11383e-06 47.5L44.6732 256L482.498 245.611L490.674 -6.18925e-06L-9.11383e-06 47.5Z" fill="#D5D4E1" />
                    <path d="M260.057 202.611C254.309 203.258 250.759 204.258 246.541 206.416C239.852 209.849 234.653 215.048 231.22 221.737C228.552 226.916 227.434 231.644 227.414 237.706C227.395 245.062 229.278 251.379 233.358 257.539C237.242 263.404 243.363 268.23 250.249 270.859C256.683 273.311 264.628 273.723 271.671 271.938C279.518 269.937 287.345 264.346 291.857 257.539C295.937 251.379 297.82 245.062 297.801 237.706C297.781 231.644 296.663 226.916 293.995 221.737C291.249 216.401 287.109 211.713 282.342 208.555C276.497 204.69 270.572 202.807 263.588 202.611C262.019 202.571 260.43 202.571 260.057 202.611ZM278.752 226.779L280.263 228.289L269.375 239.177L258.488 250.065L252.269 243.846L246.031 237.608L247.6 236.038L249.17 234.469L253.819 239.118L258.488 243.787L267.767 234.508C272.848 229.427 277.065 225.249 277.124 225.249C277.183 225.249 277.909 225.935 278.752 226.779Z" fill="black" />
                </svg>
                <p className="responseTitle">Ваша заявка успешно отправлена</p>
                <p>Наш специалист свяжется с вами в ближайшее время</p>
                <ButtonBordered onClick={() => navigate(MAINPAGE_ROUTE)}>
                    Вернуться на главную
                </ButtonBordered>
            </Modal.Body>
        </Modal >
    );
};

export default Request;