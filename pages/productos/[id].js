import React, { useEffect, useContext, useState } from 'react';
//next tiene useRoounter que es el hook de routing que tiene next, obtener el id actual para hacer la consulta
import { useRouter } from 'next/router';

import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {

    // State del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});
    const [consultarDB, guardarConsultarDB] = useState(true);

    // Routing para obtener el id actual
    const router = useRouter();
    // console.log(router);
    const { query: { id } } = router;

    // extraer Contexr de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarDB) {
            // console.log('Ya hay un id: ', id); //ya tenemos una id asi que ya podemos hacer una consulta
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id); //de productos queremos que traiga el elemento que tenga el id
                const producto = await productoQuery.get();
                //funcion de firebasde .exists
                if (producto.exists) {
                    // console.log('Si existe');
                    guardarProducto(producto.data());
                    guardarConsultarDB(false);
                } else {
                    // console.log('No Existe')
                    guardarError(true);
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();

        }

    }, [id, producto.votos]); //dep id para que cuando cambie el id haga algo

    if (Object.keys(producto).length === 0 && !error) return ('Cargando... '); //para que no quede en blando

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto;

    // Administrar el validar los votos
    const votarProducto = () => {
        //  console.log('votando...')
        if (!usuario) {
            return router.push('/login')
        }

        //obtener y suamr un nuevo voto
        const nuevoTotal = votos + 1;
        // console.log(nuevoTotal);

        // verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return; // si la matriz de ya votaron tiene este id resgitrado tonce ...

        //guardar el id del usuario que ha votado
        const nuevoHanVotado = [...haVotado, usuario.uid];


        // Actuializar en la base de datos
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal,
            haVotado: nuevoHanVotado
        });

        // Actualizar en el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        });

        guardarConsultarDB(true); // Hay un voto por lo tanto colsultar a la DB

    }

    // Funciones para crear comentarios ---
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    // identifica si el cometario es del cxreador el producto
    const esCreador = (id) => {
        if (creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/login')
        }

        // informacuio extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar una copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        //actualizar la DB
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });

        // Actualizar el State
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        });

        guardarConsultarDB(true); // Hay un Comentario por lo tanto colsultar a la DB
    }

    //funcion que revisa que el creador el producto sea le mismo que esta auntenticado
    const puedeBorrar = () => {
        if (!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    //elimina un prioducto de la base de datos
    const eliminarProducto = async () => {
        
        if (!usuario) {
            return router.push('/login');
        }

        if (creador.id !== usuario.uid) {
            return router.push('/');
        }
        
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
            
        } catch (error) {
            console.log('Hubo un error al borrar el producto: ', error);
        }
    }



    return (
        <Layout>
            <>
                {error ? <Error404 /> : (

                    <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{nombre}</h1>

                        <ContenedorProducto>
                            <div>
                                <p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })} </p>
                                <p>Publicado por: {creador.nombre}, de {empresa}</p>

                                <img src={urlimagen} />

                                <p>{descripcion}</p>

                                {usuario && (
                                    <>
                                        <h2>Deja tu comentario</h2>
                                        <form
                                            onSubmit={agregarComentario}
                                        >
                                            <Campo>
                                                <input
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>

                                            <InputSubmit
                                                type="submit"
                                                value="Agregar Comentario"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>
                                {/* como es un arreglo le mandmaos el .map */}
                                {comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li
                                                key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por:
                                                <span
                                                        css={css`
                                                      font-weight: bold;
                                                    `}
                                                    >
                                                        {''} {comentario.usuarioNombre}
                                                    </span>
                                                </p>
                                                {esCreador(comentario.usuarioId) && (<CreadorProducto>Es Creador</CreadorProducto>)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <aside>
                                <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Boton>

                                <div
                                    css={css`
                                    margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                    text-align: center;
                                    `}>{votos} Votos</p>

                                    {usuario && (
                                        <Boton
                                            onClick={votarProducto}
                                        >
                                            Votar
                                        </Boton>
                                    )}
                                </div>
                            </aside>
                        </ContenedorProducto>
                        
                        {
                            puedeBorrar() &&
                                <Boton
                                    onClick={eliminarProducto}
                                >Eliminar Producto</Boton>
                        }
                    </div>
                )}
            </>
        </Layout>
    );
}

export default Producto;