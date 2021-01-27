import app from 'firebase/app';

import 'firebase/auth'; //para habilitar la autenticacion dps en el constructos
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

// Crear Clase, react usuaklmente no las usa
//  esta clase tendra los diferentes metodos para los usuarios, asi como una instancia
class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth(); //cuando tengamos una instancia de firebase vamos a tener los metodos de authentication
            //van a permitir authernticar un user pero tambien crear un cuenta
        
        this.db = app.firestore();
        //hacemos ref a db para tener acceso a la base de datos de firebase

        //en el objeto de storage coloca app.storage
        this.storage = app.storage();
    }

    //registra un user --- pa q tenga mejor preformance le ponemos async await
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
            //entre los metodos de firebase tenemos estos.   esto nos regisrtea un nuevo usuario

        //pero tambien cdo se registra le pedimos su nombre y se está pasando al metodo
        return await nuevoUsuario.user.updateProfile({
            // "weno del perfil del usuario quiero que actualices:"
            displayName: nombre //lo crea y al mismo tiempo lo actualiza
        });
        // .user para acceder a la informacion del usuario
    }

    //Inicia sesion de usuario ---
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
            //this.auth pq esta dentro del constructor y va a hacer refenerancia a eso ???????
    }

    //cierra sesion del usuario ---
    async cerrarSesion(){
        await this.auth.signOut();
    }
}

const firebase = new Firebase();

export default firebase;
