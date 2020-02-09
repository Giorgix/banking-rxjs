import React from 'react';
import './Error.module.css';

export default ({error}) =>
<div className={"general-error " + (error ? "has-error" : "")}>
    <p>SORRY :( {(error && error.type) || 'Ups something occurred...'} {(error && error.message) || ''} please try again later</p>
</div>