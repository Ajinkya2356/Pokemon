import React, { Component } from "react";
import Poke from "./Poke";
export class Pokemon extends Component {
  constructor(props) {
    super(props);
    console.log("Hello constructor here");
    this.state = {
      pokemonData: [],
      count: 0,
      page: 1,
      searchQuery: "",
      filterPokemon: [],
      searching: false,
    };
  }
  async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon";
    let data = await fetch(url);
    let passData = await data.json();
    const pokemonResults = passData.results;
    const pokemonData = [];
    for (const pokemon of pokemonResults) {
      const pokemonDataResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonDataResponse.json();
      const parts = pokemon.url.split("/");
      const pokemonId = parts[parts.length - 2];
      const imageUrl = pokemonDetails.sprites.front_default;
      const paddedPokemonId = String(pokemonId).padStart(3, "0");
      const types = pokemonDetails.types.map((typeData) => typeData.type.name);
      const type = types[0];
      pokemonData.push({
        name: pokemon.name,
        imgURL: imageUrl,
        pid: paddedPokemonId,
        type: type,
      });
    }

    this.setState({
      pokemonData: pokemonData,
      count: passData.count,
      searching: false,
    });
  }
  handlePrevious = async () => {
    if (this.state.page > 1) {
      const previousPage = this.state.page - 1;
      const offset = (previousPage - 1) * 20;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

      let data = await fetch(url);
      let passData = await data.json();
      const pokemonResults = passData.results;
      const pokemonData = [];
      for (const pokemon of pokemonResults) {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDataResponse.json();
        const parts = pokemon.url.split("/");
        const pokemonId = parts[parts.length - 2];
        const imageUrl = pokemonDetails.sprites.front_default;
        const paddedPokemonId = String(pokemonId).padStart(3, "0");
        const types = pokemonDetails.types.map(
          (typeData) => typeData.type.name
        );
        const type = types;
        pokemonData.push({
          name: pokemon.name,
          imgURL: imageUrl,
          pid: paddedPokemonId,
          type: type,
        });
      }
      this.setState({
        pokemonData: pokemonData,
        page: previousPage,
        count: passData.count,
        searching: false,
      });
    }
  };
  handleNext = async () => {
    if (this.state.page < Math.ceil(this.state.count / 20)) {
      const nextPage = this.state.page + 1;
      const offset = (nextPage - 1) * 20;
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

      let data = await fetch(url);
      let passData = await data.json();
      const pokemonResults = passData.results;
      const pokemonData = [];
      for (const pokemon of pokemonResults) {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDataResponse.json();
        const parts = pokemon.url.split("/");
        const pokemonId = parts[parts.length - 2];
        const imageUrl = pokemonDetails.sprites.front_default;
        const paddedPokemonId = String(pokemonId).padStart(3, "0");
        const types = pokemonDetails.types.map(
          (typeData) => typeData.type.name
        );
        const type = types[0];
        pokemonData.push({
          name: pokemon.name,
          imgURL: imageUrl,
          pid: paddedPokemonId,
          type: type,
        });
      }

      this.setState({
        pokemonData: pokemonData,
        page: this.state.page + 1,
        count: passData.count,
        searching: false,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value }, () => {
      const filtered = this.state.pokemonData.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase())
      );
      this.setState({ filterPokemon: filtered, searching: true });
    });
  };
  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-2">
            <h1
              className="display-5 fw-bold"
              style={{
                color: "#2E3156",
                fontFamily: "Roboto",
                fontSize: "30px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                letterSpacing: "1.8px",
              }}
            >
              Pokedex
            </h1>
            <hr
              className="d-lg-block position-absolute top-50 translate-middle-y"
              style={{ color: "red", left: "50%", height: "50px" }}
            />
            <hr className="d-lg-none" />
          </div>
          <div className="col-12 col-lg-10">
            <small
              className=" fs-6 fw-normal"
              style={{
                color: "#5D5F7E",
                fontFamily: "Roboto",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              search for any pokemon that exists on planet
            </small>
          </div>
        </div>

        <div
          className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center"
          style={{ background: "#DEEDED", color: "#5D5F7E" }}
        >
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search by
            </label>

            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="search by name"
              value={this.state.searchQuery}
              onChange={this.handleChange}
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "100%",
                maxWidth: "663px",
              }}
            />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <div
              class="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                class="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="type"
                style={{ border: "none", color: "#2E3156" }}
              >
                Normal+<strong>5 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                class="dropdown-menu px-3 "
                style={{ width: "194px", color: "#2E3156" }}
              >
                <li>
                  <input className="mx-2" type="checkbox" />
                  Normal
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Fighting
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Flying
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Poison
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Ground
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Rock
                  <hr className="my-1 mx-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <div
              class="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                class="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="gender"
                style={{ border: "none", color: "#2E3156" }}
              >
                Male+<strong>2 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                class="dropdown-menu"
                style={{ width: "194px", color: "#2E3156" }}
              >
                <li>
                  <input className="mx-2" type="checkbox" />
                  Male
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Female
                  <hr className="my-1 mx-2" />
                </li>
                <li>
                  <input className="mx-2" type="checkbox" />
                  Other
                  <hr className="my-1 mx-2" />
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="stats" className="form-label">
              Stats
            </label>
            <div
              class="dropdown"
              style={{
                borderRadius: "8px",
                background: "#C9DDE2",
                width: "194px",
                height: "57px",
              }}
            >
              <button
                class="btn dropdown-toggle d-flex align-items-center py-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="stats"
                style={{ border: "none", color: "#2E3156" }}
              >
                HP+<strong>5 more</strong>
                <span className="mx-3"></span>
              </button>
              <ul
                class="dropdown-menu"
                style={{ width: "669px", height: "469px", color: "#2E3156" }}
              >
                <h2 className="mx-4 my-2  ">Select Stats</h2>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>HP</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "15%",
                      left: "20%",
                    }}
                  >
                    <span className="mx-1">0</span>
                    <input className="py-2" min="0" max="210" type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>Attack</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "26%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>Defense</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "36%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>Speed</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "46%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>Sp.Attack</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "56%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <li className="mx-4 my-4">
                  <medium style={{ marginRight: "140px" }}>Sp.Def</medium>
                  <div
                    className="container my-1 mx-5"
                    style={{
                      width: "438px",
                      height: " 31px",
                      borderRadius: "8px",
                      border: " 1px solid #2E3156",
                      background: " #F1F3F3",
                      position: "absolute",
                      top: "66%",
                      left: "20%",
                    }}
                  >
                    0
                    <input type="range" />
                    210
                  </div>
                </li>
                <div className="container d-flex justify-content-end">
                  <button
                    style={{
                      borderRadius: "8px",
                      borderColor: "#2E3156",
                      color: "#2E3156",
                    }}
                    className="btn "
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      borderRadius: "8px",
                      borderColor: "#2E3156",
                      backgroundColor: "#2E3156",
                      color: "white",
                    }}
                    className="btn mx-4"
                  >
                    Apply
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="row d-flex">
          {this.state.searching
            ? this.state.filterPokemon.map((element) => {
                return (
                  <div
                    className="col-lg-2 col-md-3 col-sm-5 mb-4"
                    key={element.url}
                  >
                    <Poke
                      name={element.name ? element.name : ""}
                      imgURL={element.imgURL}
                      pid={element.pid}
                      type={element.type}
                    />
                  </div>
                );
              })
            : this.state.pokemonData.map((element) => {
                return (
                  <div
                    className="col-lg-2 col-md-3 col-sm-5 mb-4"
                    key={element.url}
                  >
                    <Poke
                      name={element.name ? element.name : ""}
                      imgURL={element.imgURL}
                      pid={element.pid}
                      type={element.type}
                    />
                  </div>
                );
              })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePrevious}
          >
            Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.count / 20)}
            className="btn btn-primary"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Pokemon;
