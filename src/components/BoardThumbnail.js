import React from "react";
import './Home.css';
import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';
import { Link } from "react-router-dom";

const BoardThumbnail = ({ title, emoji }) => {




  return (
    <div style={{display:"flex", flexDirection:"colum"}}>
    <div style={{display:"flex", flexDirection:"row"}}>
      <div className="emoji_styling">
      <Emoji  emoji={emoji} size={64} />
      </div>
      <h4>{title}</h4>
    </div>
    <div>
      
    </div>
    </div>
  );
};

export default BoardThumbnail;