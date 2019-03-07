import React from 'react';


function Details(props) {
    console.log(props)
    return (
      <span>
        <h1>{props.dogFood.brand}</h1>
        <h2>Details of {props.dogFood.title}</h2>
        <img src={props.dogFood.imageUrl} />
        <p>{props.dogFood.description}</p>
      </span>
    );
}

export default Details;