import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    const style = {
      transform: `rotate(${this.props.imgAng}deg)`,
    };
    return (
      <div className="Card">
        <img src={this.props.imgSrc} alt={this.props.imgAlt} style={style} />
      </div>
    );
  }
}

export default Card;
