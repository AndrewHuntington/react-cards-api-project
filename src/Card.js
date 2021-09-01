import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const { img, val, suit } = this.props;
    return (
      <div className="Card">
        {img === "" ? null : <img alt={`${val} of ${suit}`} src={img} />}
      </div>
    );
  }
}
