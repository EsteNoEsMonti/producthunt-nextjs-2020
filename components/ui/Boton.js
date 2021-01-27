import styled from '@emotion/styled';

//este componente solo servira para dar estilos
const Boton = styled.a`
    display: block;
    font-weight: 700; /*o sea en negrita */
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto; 
    margin-right: 1rem;
    text-align: center;

    /*A juan pablo le guista usar buttons como componentes porque le puede pasar props */
    /*Si existe ese props entonces: */
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    
    &:last-of-type { /*PEERO si es el ultimo button va a tener:  */
        margin-right: 0;
    }
    &:hover {
        cursor: pointer;
    }
`;

export default Boton;