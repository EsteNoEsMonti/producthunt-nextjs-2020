import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

//Routing dynamic
// https://nextjs.org/learn/basics/clean-urls-with-dynamic-routing/dynamic-routing
// nos dan de ejemplo <Link href="/p/[id]" --- hay que crear esa carpeta llamada p
// y el archivo debe llamarse id
// as={`/productos/${id}`}> aki le pasas si el ID del producto, lo que quieres que el puitiong maneje

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between; /*para que la parte de la info qyuede del lado izq y los votos del lado derecho*/
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px; /*0 pa que no crezca, 1 pa q no se haga mas pequeño y su base será de 600px, lo hace pq el padre tiene flex  */
    display: grid;
    grid-template-columns: 1fr 3fr; /*distribuye esos 600px en 4 columns, 1 mide 1 fraccion y el otro 3*/
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover {
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Imagen = styled.img`
    width: 200px;
`;

const Votos = styled.div`
    flex: 0 0 auto; /* para que tome el tamaño que haya disponioble*/
    text-align: center; 
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    div {
        font-size: 2rem;
    }
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const DetallesProducto = ( { producto } ) => {

    const { id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos } = producto;

    return ( 
        
        <Producto>
            <DescripcionProducto>
                <div>
                    <Imagen src={urlimagen} />
                </div>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                         <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>

                    <Comentarios>
                         <div>
                             <img src="/static/img/comentario.png" />
                             <p>{comentarios.length} Comentarios</p>
                         </div>
                   </Comentarios>

                   {/* <p>Publicado hace: { creado } </p> */}
                   <p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>
                   
                </div>
            </DescripcionProducto>
            
            <Votos>
                <div> &#9650; </div>
                <p>{votos}</p>
            </Votos>
        </Producto>
        
     );
}
 
export default DetallesProducto;