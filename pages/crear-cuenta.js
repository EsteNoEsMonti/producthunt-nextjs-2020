import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from 'next/router';
import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

import firebase from '../firebase'; //esto export al index de firebase que contiene tanto firebase como el context

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from '../validacion/ValidarCrearCuenta';

//creando state inicial
const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {

  const [ error, guardarError ] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  //extraer los valores de... los valores jaja
  const { nombre, email, password } = valores;

  //fn para el use validacion
  async function crearCuenta() {
    //al ser asyncrona hay que administrar el error
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/'); //lo enviamos a la pagina principal

    } catch (error) {
      console.error('Hubo un error al crear un usuaario', error);
      guardarError(error.message);
    }
  } 
  //se tuvo que agregarle async pq registrar usa t crearCuenta no

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Crear Cuenta
          </h1>

          <Formulario
            onSubmit={handleSubmit}
            noValidate //para que entre mejor cnuestra validacion?????????
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>

              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Campo>
            {errores.nombre && (<Error>{errores.nombre}</Error>)}         

            <Campo>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Campo>
            {errores.email && (<Error>{errores.email}</Error>)}

            <Campo>
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Campo>
            {errores.password && (<Error>{errores.password}</Error>)}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
