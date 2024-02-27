import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import CourseItem from '../components/CourseItem';

const CourseList = observer(() => {
    const { course } = useContext(Context)
    return (
        <div className="courseList">
            {
                course.courses.map(course =>
                    <CourseItem key={course.course_id} course={course} />
                )
            }
        </div>
    );
});

export default CourseList;