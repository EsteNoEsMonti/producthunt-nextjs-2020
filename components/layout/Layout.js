import React, { Fragment } from 'react';
import Header from './Header';

import { Global, css } from '@emotion/core';
import Head from 'next/head'; //lo que se conoloque dentro de este componente es lo que estaria dentro del body


const Layout = (props) => {
    return (
        <Fragment>

            {/* estos seras los estilos globales */}
            <Global
                styles={css`
                    :root {
                        --gris: #3d3d3d;
                        --gris2: #6f6f6f;
                        --gris3: #e1e1e1;
                        --naranja: #da552f;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit; /*No pregunten solo gozen*/
                    }

                    body {
                        font-size: 1.6rem; /*Se le podria poner 16px pero el rem lo hace mejor para sitios responsivos */
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                    }

                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1, h2 {
                        font-family: 'Roboto Slab', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'PT Sans', sans-serif;
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;

                    }
                    a {
                        text-decoration: none;
                    }

                    img {
                        max-width: 100%;
                    }

                `}
            />
            {/* vamos a utilizar custom propity, es como tener variables de sass
                pero de forma nativa (:root)*/}

            <Head>
                <title>Product Hunt Firebase y Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap" rel="stylesheet" />
                <link href="/static/css/app.css" rel="stylesheet" />
            </Head>
            
            <Header />

            <main>
                {props.children}
            </main>

        </Fragment>

        //Todo lo que esté fuera del main pero dentro del return se va a utilizar en los diferentes
        //cinpoonentws, de esa podemos tener el header el footer y se va a reutilizar en todos
        //los componentes es decir en todoas las pagunas 
        //(se ultiliza en pages)  
    );
}
 
export default Layout;