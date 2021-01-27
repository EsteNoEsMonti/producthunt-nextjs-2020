import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useProductos = (orden) => {
    const [productos, guardarProductos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerProducto = () => {
            //consulta a la base de datos, usando los metodos de firestore
            firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
            //la colection que queremos traer                 //es la forma en la que se acceden a los registron
            //es como que primero decimos que es lo que queremos traer pero es el snapshot el que realmente accede a los datos

        }
        obtenerProducto();
    }, []);

    //funcion para snapshot
    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        console.log(productos);
        guardarProductos(productos);
    }

    return {
        productos
    }
}

export default useProductos;