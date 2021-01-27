import React, { useState, useEffect } from 'react';
import firebase from '../firebase'; //seria el archiovo index que tiene referencia hacia el contetext y la clase

function useAutenticacion() {
    const [ usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            //cdo cambie el state revisamos si hay un user auntenticado
            if ( usuario ) {
                guardarUsuarioAutenticado(usuario);
            } else {
                guardarUsuarioAutenticado(null);
            }
        })

        return () => unsuscribe();

    }, []); //como dep no hay nada pq se va a ejecutar una vwz

    return usuarioAutenticado;

}
export default useAutenticacion;