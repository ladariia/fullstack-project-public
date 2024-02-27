import React from 'react';
import { useState } from "react";

const ListItem = (props) => {
    const [toggleThisElement, setToggleThisElement] = useState(false);
    return (
        <div className="listItem" key={props.id}>
            <div className="container">
                <div className="row">
                    <h3>{props.item.title}</h3>
                    <button className={toggleThisElement ? "arrow--up" : "arrow"} onClick={() => setToggleThisElement((prev) => !prev)}>

                    </button>
                </div>
                {toggleThisElement && <div className="descr">{props.item.body}</div>}
            </div>
            <div className="line"></div>
        </div>
    );
};

export default ListItem;