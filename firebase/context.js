import React, { createContext } from 'react';

const FirebaseContext = createContext(null); //nul es el valor que tendra por default al crearse

export default FirebaseContext;
//agregamos el provider en pages/_app.js