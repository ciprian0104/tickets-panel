
import React from "react";
import Button from "@material-ui/core/Button";

const ActionButton = ({ children, onClick }) => {

  return (
    <Button 
    variant="contained" 
    onMouseDown={onClick}
    style={{background: '#5aac44', color: 'white'}}
    >
      {children}
    </Button>
  );
};

export default ActionButton;