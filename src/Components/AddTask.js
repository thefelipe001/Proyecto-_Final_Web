import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../Actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


/**
 * Class for adding a 'task' to the taskboard in Home.
 * Powered by Redux.
 */
class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", status: false };
    }

    setInput = title => {
        this.setState({title});
    }

    handleAddTodo = () => {
        this.props.addTodo(this.state.title, this.state.status);
        this.setState({ title: "", status: false });
    }
    
    render() {
        return(
            <Form className="row justify-content-center">
                <Form.Control className="col-8 col-md-6 col-lg-4 mb-2 ml-2 mr-2" onChange={e => this.setInput(e.target.value)} value={this.state.title} type="text" />
                <Button className="col-8 col-sm-3 col-lg-2 mb-2" onClick={this.handleAddTodo} variant="dark">Add task +</Button>
            </Form>
        )
    }
}

export default connect(null, {addTodo}) (AddTask);