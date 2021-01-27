import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Boton from '../ui/Boton';

import { FirebaseContext } from '../../firebase';

//Styled Componentes : ---------------------------------
const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between; /*Para que una parte del contedino esté a la izq y otro a la der */
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem; /*Es decir 40px */
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display:flex;
                        align-items: center; /*Para que los centre verticalmente */
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    
                    {/* Buscador Aqui */}
                    <Buscar/>

                    {/* Nav aqui */}
                    <Navegacion />

                </div>

                <div
                    css={css`
                    display: flex;
                    align-items: center;
                `}
                >
                    {/*Menu de administracion aqui */}
                    { usuario 
                        ? (
                            <Fragment>
                                <p
                                    css={css`
                                        margin-right: 2rem;
                                    `}
                                >Hola: {usuario.displayName}
                                </p>

                                <Boton
                                    bgColor="true"  /*Si le pasamos el prop */
                                    onClick={ () => firebase.cerrarSesion() }
                                >Cerrar Sesion
                                </Boton>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Link href="/login">
                                    <Boton
                                        bgColor="true"
                                    >Login</Boton>
                                </Link>

                                <Link href="/crear-cuenta">
                                    <Boton>Crear Cuenta</Boton>
                                </Link>
                            </Fragment>
                        )
                    }

                </div>
            </ContenedorHeader>
        </header>
    );
}
 
export default Header;