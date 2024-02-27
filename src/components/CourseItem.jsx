import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSE_ROUTE } from '../utils/consts';

function timeRus(amount, timename) {
    let problem_of_teen = amount % 100
    if (timename == 'часы') {
        var base = 'час';
        var endings = new Array('ов', 'ов', '', 'а');
    }
    if (problem_of_teen >= 11 && problem_of_teen <= 19) {
        return amount + " " + base + endings[0];
    }
    let problem_of_numerals = amount % 10;
    if (problem_of_numerals == 0 || (problem_of_numerals >= 5 && problem_of_numerals <= 9)) {
        return amount + " " + base + endings[1];
    }
    if (problem_of_numerals == 1) {
        return amount + " " + base + endings[2];
    }
    if (problem_of_numerals >= 2 && problem_of_numerals <= 4) {
        return amount + " " + base + endings[3];
    }
}

const CourseItem = ({ course }) => {
    const navigate = useNavigate()
    return (
        <div className="courseItem" onClick={() => navigate(COURSE_ROUTE + '/' + course.course_id)}>
            <div className="container">
                <div className="type">
                    <p>
                        {course.type.type_name}
                    </p>
                </div>
                <div className="row">
                    <h3>{course.course_name}</h3>
                    <div className="arrow"></div>
                </div>
                <div className="duration">
                    <div className="clock"></div>
                    <p>{timeRus(course.course_duration, 'часы')}</p>
                </div>

            </div>
        </div>
    );
};

export default CourseItem;