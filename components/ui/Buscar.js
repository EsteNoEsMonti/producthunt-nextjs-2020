import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css} from '@emotion/core';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
const InputSubmit = styled.button`
    height: 3rem; /*30px o 3rem */
    width: 3rem;
    display: block;
    background-size: 4rem; /*El size es mas grande que el tamaño para que nohaya ningun progblema */
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat; /**Para que no se repita */
    position: absolute; /*Hay que poner relative en el form */
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -999999px; /*borra el texto, se le pone cualquier num negativo xd */
    &:hover {
        cursor: pointer;
    }
`;

const Buscar = () => {

    const [ busqueda, guardarBusqueda ] = useState('');

    const buscarProducto = (e) => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // console.log('Buscando...', busqueda)
        //redireccionar al user
        Router.push({
            pathname: '/buscar',
            query: {
                // "llave": "valor"
                q: busqueda
            }
        })
    }

    return (
        <form
            css={css`
                position: relative;/*Para que haga referecia al position */
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos"
                onChange={ e => guardarBusqueda(e.target.value) }
            />

            <InputSubmit
                type="submit"
            >Buscar
            </InputSubmit>
        </form>
    );
}
 
export default Buscar;