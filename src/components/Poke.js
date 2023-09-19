
import React, { Component } from "react";
export class Poke extends Component {
    
      
  render() {
    let {name,imgURL,pid,type} = this.props;
    return (
    //   <div className="my-3 d-flex justify-content-between "style={{border:'1px solid black'}}>
        <div
          className="card"
          style={{
            width: "194px",
            height: "277px",
            borderRadius: "8px",
            border: "1px dashed #2E3156",
            background: `linear-gradient(180deg, #C0D4C8 0%, ${typeColor[type]} 100%)`,
            
          }}
        >
          <img src={imgURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5
              className="card-title"
              style={{
                color: "#2E3156",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
              }}
            >
              {name}
            </h5>
            <p
              className="card-text"
              style={{
                color: "#2E3156",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {pid}
              
            </p>
          </div>
        </div>
    //   </div>
    );
  }
}

export default Poke;
const typeColor = {
    normal: "#DDCBD0",
    fighting: "#FCC1B0",
    flying: "#B2D2E8",
    poison: "#CFB7ED",
    ground: "#F401A6",
    rock: "#C5AEA8",
    bug: "#C1E0C8",
    ghost: "D7C2D7",
    fire: "#EDC2C4",
    water: "CBDSED",
    grass: "C004C8",
    electric: "#E2E2A0",
    psychic: "#DDC0CF",
    ice: "#C7D7DF",
    dragon: "#CADCDF",
};