import React from "react";
import './Home.css';


const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <div className="thumbnail">
      <h4 className="thumbnail_title">{title}</h4>
    </div>
  
  );
};

export default BoardThumbnail;