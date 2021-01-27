import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from 'next/router';
import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

import firebase from '../firebase'; //esto export al index de firebase que contiene tanto firebase como el context

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from '../validacion/validarIniciarSesion';
import firebaseConfig from "../firebase/config";

//creando state inicial
const STATE_INICIAL = {
  email: '',
  password: ''
}

const Login = () => {

  const [ error, guardarError ] = useState(false);

  const {valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  //extraer los valores de... los valores jaja
  const { email, password } = valores;

  //fn para el use validacion
  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push('/');
      
    } catch (error) {
      console.error('Hubo un error al crear un usuaario', error);
      guardarError(error.message);
    }
  }

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
            Iniciar Sesión
          </h1>

          <Formulario
            onSubmit={handleSubmit}
            noValidate //para que entre mejor cnuestra validacion?????????
          >
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

            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login