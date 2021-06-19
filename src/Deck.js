import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      deck: [],
      cardsLeft: 52,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    const response = await axios.get(API_URL);
    this.setState({
      deckId: response.data.deck_id,
    });
  }
  handleClick(evt) {
    this.addCard();
  }
  async addCard() {
    try {
      const url = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`;
      const response = await axios.get(url);
      if (!response.data.success) {
        throw new Error("No card left!");
      } else {
        const card = {
          code: response.data.cards[0].code,
          image: response.data.cards[0].image,
          ang: Math.floor(Math.random() * 90) - 45,
        };
        this.setState((st) => ({
          deck: [...st.deck, card],
          cardsLeft: response.data.remaining,
        }));
      }
    } catch (err) {
      alert(err);
    }
  }
  render() {
    const cards = this.state.deck.map((card) => (
      <Card
        key={card.code}
        imgSrc={card.image}
        imgAlt={card.code}
        imgAng={card.ang}
      />
    ));
    return (
      <div className="Deck">
        <h1>Card Dealer</h1>
        <button className="button -dark" onClick={this.handleClick}>
          Add card!
        </button>
        <div className="Deck-cards">{cards}</div>
      </div>
    );
  }
}

export default Deck;
