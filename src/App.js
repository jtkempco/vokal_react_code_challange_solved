import React, { Component } from "react";
import Search from "./Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {
        id: 1,
        name: "Bulbasaur",
        img:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      },
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
      textValue: "",
      isNumber: false,
      error: false,
      errorMsg: ""
    };
  }

  onClick = e => {
    const { baseUrl, textValue, isNumber } = this.state;

    fetch(baseUrl + textValue + "/")
      .then(response => {
        //error
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          let substr = isNumber ? "id =" : "name =";
          let errorMsg = `ERROR: Could not find Pokemon with ${substr} "${textValue}".`;
          this.setState({ error: true, errorMsg: errorMsg });
          return;
        }
        // Examine the text in the response
        response.json().then(json => {
          console.log(json);
          this.setState({
            pokemon: {
              id: json.id,
              name: json.name,
              img: json.sprites.front_default
            },
            error: false,
            errorMsg: ""
          });
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
    //console.log("Submitted!");
  };

  onChange = e => {
    const textValue = e.target.value.toLowerCase().trim();
    const isNumber = this.isNumber(textValue);
    this.setState({ textValue: textValue, isNumber: isNumber });
  };

  isNumber = n => {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  };

  render() {
    const { id, name, img } = this.state.pokemon;

    return (
      <div className="App">
        <h1>Pokemon Vokal Test</h1>
        <img alt={name + " " + id} src={img} />
        <h2>{name}</h2>
        <Search onClick={this.onClick} onChange={this.onChange} />
        {this.state.error ? (
          <div className="error-message">{this.state.errorMsg}</div>
        ) : null}
      </div>
    );
  }
}

export default App;
