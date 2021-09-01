import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styled from "styled-components/macro";
import Card from "./Card";

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.9);
  color: rgb(255, 255, 255);
  margin-bottom: 5rem;
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

const Alert = styled.div`
  color: red;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 5px;
  font-weight: bold;
  width: 75%;
  padding: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -3rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export default class CardDisplay extends Component {
  API_URL = "https://deckofcardsapi.com/api/deck";

  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      cardsRemaining: undefined,
      zIndex: 0,
      cardPile: [],
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
    if (this.state.cardsRemaining <= 0) window.location.reload();

    try {
      const response = await axios.get(
        `${this.API_URL}/${this.state.deckId}/draw`
      );
      const resData = response.data;
      const cardInfo = resData.cards[0];

      this.setState((st) => ({
        cardsRemaining: resData.remaining,
        zIndex: st.zIndex + 1,
      }));

      const card = this.createCard(cardInfo);
      this.addCardToPile(card);
    } catch (e) {
      // TODO: Display a msg on screen
      console.error(e.message);
      return;
    }
  }

  createCard(cardInfo) {
    const rotateDeg = this.randomNumber(-45, 45);

    const card = {
      img: cardInfo.image,
      val: cardInfo.value,
      suit: cardInfo.suit,
      rotate: `${rotateDeg}deg`,
      zIndex: this.state.zIndex,
    };

    return card;
  }

  addCardToPile({ img, val, suit, rotate, zIndex }) {
    this.setState((st) => ({
      cardPile: [...st.cardPile, { img, val, suit, rotate, zIndex }],
    }));
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  render() {
    const { cardPile, cardsRemaining } = this.state;
    const cards = cardPile.map((c) => (
      <Card
        img={c.img}
        val={c.val}
        suit={c.suit}
        rotate={c.rotate}
        zIndex={c.zIndex}
        key={uuidv4()}
      ></Card>
    ));
    return (
      <div className="CardDisplay">
        {cardsRemaining <= 0 ? (
          <Wrapper>
            <Alert>You're all out of cards!</Alert>
          </Wrapper>
        ) : null}

        <Button onClick={this.handleClick}>
          {cardsRemaining > 0 ? "HIT ME!" : "RESET"}
        </Button>
        {cards}
      </div>
    );
  }
}
