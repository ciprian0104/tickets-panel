import React from "react";
import Icon from "@material-ui/core/Icon";
import "./OpenFormButtons"

const OpenFormButtons = ({ list, children, onClick }) => {

    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
        <div className="openFormButtons">
            <Icon>add</Icon>
            <p style={{ flexShrink: 0}}>{children}</p>
        </div>

    );


};

export default OpenFormButtons;

