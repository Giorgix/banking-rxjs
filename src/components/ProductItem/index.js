import React from 'react';
import { withdraw, deposit } from '../../actions';
/**
 * Creates a simple  function component that display an available product to add
 * @param {Object} props
 */
export default function ProductItem ({img, name, description, id, onItemClick}) {
  return(
    <li className="collection-item avatar" onClick={() => onItemClick({name, img, id})}>
      <img src={img} alt={name} className="circle"></img>
      <span className="title">{name}</span>
      <p>{description}</p>
      <a href="#!" onClick={() => onItemClick({name, img, id})} className="secondary-content"><i className="material-icons">add_circle</i></a>
    </li>
  );
}