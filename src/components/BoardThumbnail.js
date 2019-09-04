import React from "react";
import './Home.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

const BoardThumbnail = ({ title, emoji }) => {
  return (

    <div className="thumbnail">
      <div className="emoji_styling">
      <Emoji  emoji={emoji} size={64} />
      </div>
      <h4 className="thumbnail_title">{title}</h4>
    </div>
  );
};

export default BoardThumbnail;