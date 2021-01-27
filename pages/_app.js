// Es un nombre que nos da next para crear un archivo sobre el layout
// es como un archovo principal con la conf que tenria toda tyu aplicacion

import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp = (props) => {

    const usuario = useAutenticacion();
    console.log(usuario);

    const { Component, pageProps } = props;
    //component es el componente actual y los props son los props de la pagina

    return (
        <FirebaseContext.Provider
            //los valores que queremos hacer disponible
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    );
}
 
export default MyApp;

