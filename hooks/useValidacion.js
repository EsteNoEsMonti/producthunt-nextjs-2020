//los hooks usan use al inciio como remandacion
import React, { useState, useEffect } from 'react';

/*
    cuando creamos un state tenemos algo asi:
        const [state, setState] = useState([]);
                                        y le pasamos el valor inicial.
    en este caso, ese arreglo es lo que se pasaria como parametro 
    en el sfc y nuestro hook va a tomar 3:
        el state inicial,
        lo que vamos a validar 
        y la funcioon que se va a ejecutar cuando se haga el submit
*/

const useValidacion = (stateInicial, validar, fn) => {
    
    // creamos 3 piezzas de state
    //los valores
    const [ valores, guardarValores ] = useState(stateInicial); //lo vamos a pasar desde le componente que estemos utilizando, estaremos creanod un obj, lo mandamos a llamar por el useValidacion y se manda a pasar al useState
    //los errores
    const[ errores, guardarErrores ] = useState({});
    //
    const [ submitForm, guardarSubmitForm] = useState(false); //se envia el form, cambia a true y colocaremos un useEffect

    useEffect( () => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;///obj.keys para revisar si esta vacio el obj, le pasa el obj, si es = a 0 el obj esta vacio

            //vamos a ir recorriendo los campor (valores) y en el caso que haya errores los vmaos agregando en el obj
            if (noErrores) {
                //ejecuta la funcion que el usuario va a pasar
                fn(); //seria la fn que se ejecuta en el componente
            }
            guardarSubmitForm(false);

        }

    }, [errores]); //dependecias por ahora vacias para que se ejecute una sola vez

    // Funcion que se ejecuta conforme el userr escribe algo
    const handleChange = e => {
        guardarValores({ //va guardando los valores que el user escriba
            ...valores,
            [e.target.name] : e.target.value 
            //se va a ir ejecutando y agregand oen el state loq ue el user escriba
        })
    }

    //funcions que se ejecuta cvuando el user hace submit
    const handleSubmit = e => {
        e.preventDefault();

        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)

        guardarSubmitForm(true); //porque el el useEffecr vemos si el submitForm cambia
    }

    //Cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)
    }
    //va con llaver porque va a retornar diferentes secciones
    return {
        //retornamos todo el state
        valores,
        errores,

        //dps las funciones
        handleSubmit,
        handleChange,
        handleBlur

        //a las otras no las pasamos porquer no la vamos a requerir
    };
}
 
export default useValidacion;