import React, { Component } from "react";
import styled from "styled-components/macro";

const SingleCard = styled.div`
  transform: rotate(${(props) => props.rotate || "0deg"});
  z-index: ${(props) => props.zIndex || "0"};
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default class Card extends Component {
  render() {
    const { img, val, suit, zIndex, rotate } = this.props;
    return (
      <SingleCard rotate={rotate} zIndex={zIndex}>
        {img === "" ? null : <img alt={`${val} of ${suit}`} src={img} />}
      </SingleCard>
    );
  }
}
