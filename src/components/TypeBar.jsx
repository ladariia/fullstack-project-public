import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ButtonBordered from './UI/button/ButtonBordered';
import { Context } from "../index";

const TypeBar = observer(() => {

    const { course } = useContext(Context)
    return (
        <div className="switch">
            {course.types.map(type =>
                <ButtonBordered
                    style={{
                        backgroundColor: type.type_id === course.selectedType.type_id ? '#000' : '',
                        color: type.type_id === course.selectedType.type_id ? '#fff' : '',
                        border: type.type_id === course.selectedType.type_id ? '1px solid #000' : '',
                    }}
                    //type.type_id === course.selectedType.type_id
                    //если id типа эл-та итерации совпадает с типом кй мы сохранили в Store, тогда active
                    onClick={() => course.setSelectedType(type)}
                    key={type.type_id}>
                    {type.type_name}
                </ButtonBordered>
            )
            }
        </div >
    );
});

export default TypeBar;