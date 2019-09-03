import React from "react";
import Icon from "@material-ui/core/Icon";
import "./OpenFormButtons"

const OpenFormButtons = ({ children}) => {

    return (
        
        <div className="openFormButtons">
            <Icon>add</Icon>
            <p style={{ flexShrink: 0}}>{children}</p>
        </div>
        
    );
};

export default OpenFormButtons;

