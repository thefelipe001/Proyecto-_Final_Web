import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

/**
 * Functional component for displaying sofas,
 * as well as containing the functions for deleting and editing a sofa.
 * Editing is done via a Modal connected to each sofa, thereby having that sofas 
 * default values in case nothing is edited.
 */
const Sofa = (props) => {
    const [state, setState] = useState('');
    const [show, setShow] = useState(false);
    const hideModal = () => setShow(false);
    const openModal = () => setShow(true);

    const handleChange = ( event ) => {
        let input = event.target.value;
        setState({ 
            ...state,
            [event.target.name]: input
        });
    }

    const delSofa = () => {
        let id = props.id
        axios.delete("https://localhost:5001/sofas/" + id);
        setShow(false);
        alert("Sofa deleted!");
        window.location.reload();
    }

    const editSofa = ( event ) => {
        event.preventDefault();

        let file = document.getElementById("upload-img");
        let data = new FormData();
        data.append("file", file.files[0]);

        let thisCondition = props.condition
        if(state.condition === "New"){
            state.condition = true
            thisCondition = state.condition
        } else if(state.condition === "Used") {
            state.condition = false
            thisCondition = state.condition
        } else {
            if(thisCondition === "New"){
                thisCondition = true
            } else if(thisCondition === "Used") {
                thisCondition = false
            }
        }

        let updateSofa = { 
            id: props.id,
            title: state.title, 
            year: Number.parseInt(state.year, 10),
            producer: state.producer,
            designer: state.designer,
            category: state.category,
            description: state.description,
            condition: thisCondition,
            price: Number.parseInt(state.price, 10),
            image: setImg()
        }

        function setImg() {
            let imgFile = "imgfile"
            if(file.files[0] === undefined){
                imgFile = props.image
            } else { 
                axios({
                    method: 'post',
                    url: 'https://localhost:5001/Sofas/uploadImg',
                    data: data,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                imgFile = file.files[0].name 
            }
            return imgFile
        }
        
        for(var key in updateSofa) {
            if(updateSofa[key] === undefined) {
                updateSofa[key] = props[key];
            } 
            if(Object.is(updateSofa[key], NaN)) {
                updateSofa[key] = Number.parseInt(props[key], 10)
            }
        }

        axios.put("https://localhost:5001/sofas", updateSofa);
        setShow(false);
        alert("Sofa updated! Refresh page");
    }

    return(
        <>
        <div key={`card-${props.id}`} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-2">
            <div className="card shadow-sm">
                <img src={ 'https://localhost:5001/images/' + props.image} alt={props.image} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-subtitle text-muted mb-2">{props.category}</p>
                    <small><strong>Diseñada por: </strong><span className="text-muted">{props.designer}</span> <strong>in:</strong> <span className="text-muted">{props.year}</span></small><br />
                    <small><strong>Produccida: </strong><span className="text-muted">{props.producer}</span></small>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><small>{props.description}</small></li>
                </ul>
                <div className="card-body">
                    <div className="row">
                        <small className="card-text col-6"><strong>Condicion:</strong> <span className="text-muted">{props.condition}</span></small> 
                        <small className="card-text col-6 text-right">NOK <span className="text-muted">{props.price},-</span></small>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <div className="row justify-content-between pl-2 pr-2">
                        <Button className="col-2" variant="danger" onClick={delSofa}><span className="fa fa-trash-o"></span></Button>
                        <Button variant="secondary" size="sm" onClick={openModal}>Edit</Button>
                    </div>
                </div>
            </div>
        </div>
        <Modal key={`modal-${props.id}`}  show={show} onHide={hideModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>  
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editSofa}>
                    <Form.Row>
                        <Form.Label column sm="3">Title: </Form.Label>
                        <Col><Form.Control onChange={handleChange} name="title" type="text" placeholder={props.title} className="mb-2" /></Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm="3">Categoria: </Form.Label>
                        <Col>
                            <Form.Control onChange={handleChange} as="select" name="category" className="mb-2">
                                <option>Dos asientos</option>
                                <option>Tres asientos</option>
                                <option>Canapé</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm="3">Diseño: </Form.Label>
                        <Col><Form.Control onChange={handleChange} name="designer" type="text" placeholder={props.designer} className="mb-2" /></Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm="3">Año: </Form.Label>
                        <Col><Form.Control onChange={handleChange} name="year" type="text" placeholder={props.year} className="mb-2" /></Col>
                    </Form.Row>
                    <Form.Row className="mb-2">
                        <Form.Label column sm="3">Produccido: </Form.Label>
                        <Col><Form.Control onChange={handleChange} name="producer" type="text" placeholder={props.producer} className="mb-2" /></Col>
                    </Form.Row>
                    <Form.Label>Descripcion: </Form.Label>
                    <Form.Control onChange={handleChange} name="description" type="text" placeholder={props.description} className="mb-2" />
                    <Form.Row>
                        <Form.Label column sm="6">Condition: </Form.Label>
                        <Form.Label column sm="6">Price: </Form.Label>
                    </Form.Row>
                    <Form.Row className="mb-2">
                        <Col sm="6">
                            <Form.Control onChange={handleChange} as="select" name="condition" className="mb-2">
                            <option>Nuevo</option>
                            <option>Usada</option>
                            </Form.Control> 
                        </Col>
                        <Col sm="6">
                        <Form.Control onChange={handleChange} name="price" type="text" placeholder={props.price} className="mb-2" />
                        </Col>
                    </Form.Row>
                    <input onChange={handleChange} id="upload-img" type="file" name="image" />

                    <Button className="mt-2 float-right" variant="secondary" type="submit">Guardar Cambios</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>        
                <Button className="mr-auto" variant="danger" onClick={delSofa}>Borrar</Button>
                <Button variant="outline-secondary" onClick={hideModal}>Cerrar</Button>
            </Modal.Footer>
        </Modal>    
        </>
    )
}

export default Sofa;