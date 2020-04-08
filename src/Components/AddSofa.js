import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


/**
 * Functional component for a Modal with the form for adding a sofa to the database.
 * Containing a few default values and placeholder image in case nothing is typed into form.
 */
const AddSofa = (props) => {
  const { show, closeModal } = props;
  const [ state, setState ] = useState({
    title: "Sofa Title",
    year: 1900,
    producer: "Producer",
    designer: "Designer",
    category: "Two Seat",
    description: "Description",
    condition: true,
    price: 0,
    image: "Imagetitle"
  });

    const handleChange = ( event ) => {
        let input = event.target.value;
        setState({ 
            ...state,
            [event.target.name]: input
        });
    }

    const addNewSofa = ( event ) => {
        event.preventDefault();
        let file = document.getElementById("upload-img");
        let data = new FormData();
        data.append("file", file.files[0]);

        if(state.condition === "on"){
            state.condition = false
        }
    
        let newSofa = { 
            title: state.title, 
            year: Number.parseInt(state.year, 10),
            producer: state.producer,
            designer: state.designer,
            category: state.category,
            description: state.description,
            condition: state.condition,
            price: Number.parseInt(state.price, 10),
            image: setImg()
        };

        function setImg() {
            let imgFile = "imgfile"
            if(file.files[0] === undefined){
                imgFile = "mags.jpg"
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

        axios.post("https://localhost:5001/sofas", newSofa);
        closeModal();
        alert("New sofa added! Refresh page");
    }

  return (
    <>
      <Modal show={show} onHide={closeModal} animation={false}>
        <Modal.Header closeButton>
                    <Modal.Title>Add Sofa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ addNewSofa }>
                            <Form.Control onChange={handleChange} name="title" type="text" value={state.title} className="mb-2" />
                            <Form.Control onChange={handleChange} name="designer" type="text" value={state.designer} className="mb-2" />
                            <Form.Control onChange={handleChange} name="producer" type="text" value={state.producer} className="mb-2" />

                            <Form.Row className="mb-2">
                                <Col>
                                    <Form.Label className="mt-2">Categoria</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control onChange={handleChange} as="select" name="category">
                                        <option>Dos asientos</option>
                                        <option>Tres asientos</option>
                                        <option>Canapé</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                <Form.Control onChange={handleChange} name="year" placeholder="Year" type="number" />
                                </Col>
                                <Col>
                                <Form.Control onChange={handleChange} name="price" placeholder="Price" type="number" />
                                </Col>
                            </Form.Row>
                            {['checkbox'].map(check => (
                            <Form.Check className="mt-3 mb-3" onChange={handleChange} name="condition" inline label="Used" check={check} id="check-condition"  />
                            ))}
                        <Form.Control as="textarea" onChange={handleChange} name="description" value={state.description} className="mb-2" />
                        <input onChange={handleChange} id="upload-img" type="file" name="image" />
                        <br />
                        <Button className="mt-3" variant="success" type="submit">Agregar +</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={closeModal}>Cerrar</Button>
                    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSofa;