import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import AddChair from './AddChair';
import AddTable from './AddTable';
import AddSofa from './AddSofa';
import AddLighting from './AddLighting';
import AddStorage from './AddStorage';
import { HashLink as Link } from 'react-router-hash-link';

/**
 * Header area, linking to components, as well as displaying the correct Add Product Modal
 * depending on which component is active.
 */
const Header = () => {

    let url = window.location.href;

    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const displayModal = () => {
        if(url === "http://localhost:3000/chairs"){
            return <AddChair closeModal={closeModal} show={show} />
        } else if(url === "http://localhost:3000/tables") {
            return <AddTable closeModal={closeModal} show={show} />
        } else if(url === "http://localhost:3000/sofas") {
            return <AddSofa closeModal={closeModal} show={show} />
        } else if(url === "http://localhost:3000/lighting") {
            return <AddLighting closeModal={closeModal} show={show} />
        } else if(url === "http://localhost:3000/storage") {
            return <AddStorage closeModal={closeModal} show={show} />
        }
    }

    const showModal = () => {
        if(url === "http://localhost:3000/"){
            alert("Go to a product category page to add a product to the store.")
        } else {
            openModal()
        }
    }

    return(
        <header id="header-container" className="container-fluid">
            <div className="row">
                <div className="col-md-8 mt-3 mr-auto">
                    <nav>
                        <Link to="/" className="text-reset p-1">Casa</Link>
                        <Link to="/chairs" className="text-reset p-1">Sillas</Link>
                        <Link to="/tables" className="text-reset p-1">Mesa</Link>
                        <Link to="/sofas" className="text-reset p-1">Sofas</Link>
                        <Link to="/lighting" className="text-reset p-1">Lamparas</Link>
                        <Link to="/storage" className="text-reset p-1">Almario</Link>
                        <Link to="/#taskboard" className="text-reset p-1">Tablero de Tareas</Link>
                    </nav>
                </div>
                <Button className="col-md-2 ml-3 mr-3 mt-2 mb-2" variant="outline-dark" size="sm" onClick={showModal}>Agregar Productos +</Button>
            </div>
            {displayModal()}
        </header>
    )
}

export default Header;