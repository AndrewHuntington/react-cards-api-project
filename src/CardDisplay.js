import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./Card";

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.9);
  color: rgb(255, 255, 255);
  padding: 0.8rem 2rem;
  border-radius: 5%;
  border: 0;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 16px 1px rgba(255, 255, 255, 0.3);
    -webkit-box-shadow: 0px 0px 16px 1px rgba(255, 255, 255, 0.3);
    -moz-box-shadow: 0px 0px 16px 1px rgba(255, 255, 255, 0.3);
  }
`;

export default class CardDisplay extends Component {
  API_URL = "https://deckofcardsapi.com/api/deck";

  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      cardsRemaining: undefined,
      img: "",
      value: "",
      suit: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${this.API_URL}/new/shuffle`);
      const resData = response.data;
      this.setState({
        deckId: resData.deck_id,
        cardsRemaining: resData.remaining,
      });
    } catch (e) {
      // TODO: Display a msg on screen
      console.error(e.message);
      return;
    }
  }

  async handleClick() {
    //TODO: Change to remove alert
    if (this.state.cardsRemaining <= 0) alert("Out of cards!");

    try {
      const response = await axios.get(
        `${this.API_URL}/${this.state.deckId}/draw`
      );
      const resData = response.data;
      const cardInfo = resData.cards[0];
      this.setState({
        cardsRemaining: resData.remaining,
        img: cardInfo.image,
        value: cardInfo.value,
        suit: cardInfo.suit,
      });
    } catch (e) {
      // TODO: Display a msg on screen
      console.error(e.message);
      return;
    }
  }

  render() {
    return (
      <div className="CardDisplay">
        <Button onClick={this.handleClick}>HIT ME!</Button>
        <Card
          img={this.state.img}
          val={this.state.value}
          suit={this.state.suit}
        ></Card>
      </div>
    );
  }
}
