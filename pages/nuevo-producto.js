import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from 'next/router';
import FileUploder from 'react-firebase-file-uploader';

import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";
import Error404 from '../components/layout/404';

import { FirebaseContext } from '../firebase';

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from '../validacion/validarCrearProducto';

//creando state inicial
const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  // imagen: '',
  url: '',
  descripcion: ''
}

const NuevoProducto = () => {

  //state que requiere la dep de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');


  const [error, guardarError] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  //extraer los valores de... los valores jaja
  const { nombre, empresa, imagen, url, descripcion } = valores;

  //Hook de routing para redireccionar ( { useRouter } )
  const router = useRouter();

  // context ocn las operaciones crud de firebase
  //ya importamos la clase para los metodods que creamos
  //PERO EN ESTA PARTE ES FUNCIONALIDAD DE FIREBASE para crear los productos
  const { usuario, firebase } = useContext(FirebaseContext); //tonce tenemos acceso a susario y a firebase

  console.log(usuario);


  //fn para el use validacion
  async function crearProducto() {

    //si el usuario no esta auth llevar al login
    if (!usuario) {
      return router.push('/login');
    }

    //crear el obj de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      //los que el user no nos da
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }

    //insertalo en la data base
    firebase.db.collection('productos').add(producto);

    return router.push('/');

  }

  //funciones que nos da FileUploder -------------------------------
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre)
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };
  //funciones que nos da FileUploder -------------------------------

  return (
    <div>
      <Layout>
        {!usuario ? <Error404 />
          :
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Crear Nuevo Producto
            </h1>

            <Formulario
              onSubmit={handleSubmit}
              noValidate //para que entre mejor cnuestra validacion?????????
            >
              <fieldset>
                <legend>Campos Generales</legend>

                <Campo>
                  <label htmlFor="nombre">Nombre</label>

                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </Campo>
                {errores.nombre && (<Error>{errores.nombre}</Error>)}

                <Campo>
                  <label htmlFor="empresa">Empresa</label>

                  <input
                    type="text"
                    id="empresa"
                    placeholder="Nombre de Empresa or Company"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </Campo>
                {errores.empresa && (<Error>{errores.empresa}</Error>)}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>

                  <FileUploder className="paraQueNoSeSalga"
                    aceept="image/*" //pa q acepte imgs de cualquier formato
                    id="imagen"
                    name="imagen"

                    randomizeFilename //genera un nombre aleatorio para que no haya por ej 2 file que se llamen 1.jpg
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="url">URL</label>

                  <input
                    type="url"
                    id="url"
                    placeholder="URL de tu prodcuto"
                    name="url"
                    value={url}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </Campo>
                {errores.url && (<Error>{errores.url}</Error>)}
              </fieldset>

              <fieldset>
                <legend>Sobre tu Producto</legend>

                <Campo>
                  <label htmlFor="descripcion">Descripcion</label>

                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </Campo>
                {errores.descripcion && (<Error>{errores.descripcion}</Error>)}

              </fieldset>

              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Crear Nuevo Producto" />
            </Formulario>
          </>
        }
      </Layout>
    </div>
  );
};

export default NuevoProducto