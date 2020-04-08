import React from 'react';
import { useSelector } from 'react-redux';
import AddTask from './AddTask';
import Button from 'react-bootstrap/Button';

/**
 * The Home component with main links to product categories,
 * also holding the task board and it's functionality.
 */
const Home = () => {
    const todoList = useSelector( state => state.todoList );

    const getTodos = () => {
        let todos = todoList.map( todo => {
            if(todo.status === false){
            return <div className="col-12 col-md-6 mb-2">
                    <div className="card bg-warning">
                        <div className="card-body">
                            <p className="card-title">{todo.title}</p>
                        </div>
                    </div>
                </div>
            }
        })
        return todos;
    }

    const getDoneTasks = () => {
        let todos = todoList.map( todo => {
            if(todo.status === true){
            return <div className="col-12 col-md-6 mb-2">
                    <div className="card bg-info">
                        <div className="card-body">
                            <p className="card-title">{todo.title}</p>
                        </div>
                    </div>
                </div>
            }
        })
        return todos;
    }

    return(
        <section className="container-fluid">
            <div id="home-container">
                <h2 className="text-center mt-5 mb-5">Bienvenido a su casita</h2>
                <div className="text-center mb-5">
                    <p>Edita y compra productos de tu casa aquiiiiiii</p>
                    
                    <Button size="lg" className="p-4 m-2" variant="secondary" href="/chairs">Sillas</Button>
                    <Button size="lg" className="p-4 m-2" variant="secondary" href="/tables">Mesas</Button>
                    <Button size="lg" className="p-4 m-2" variant="secondary" href="/sofas">Sofas</Button>
                    <Button size="lg" className="p-4 m-2" variant="secondary" href="/lighting">Lamparas</Button>
                    <Button size="lg" className="p-4 m-2" variant="secondary" href="/storage">Almario</Button>
                </div>
            </div>

            <div className="bg-white rounded border mt-5" id="taskboard">
                <h3 className="text-center text-uppercase mt-5 mb-5">Tablero de tareas</h3>
                <AddTask />
                <div className="row mt-3 mr-3 ml-3 mb-5">
                    <div className="col-12 col-sm-6 mt-4">
                        <h5 className="text-uppercase">que hacer</h5>
                        <div className="row">{ getTodos() }</div>
                    </div>
                    <div className="col-12 col-sm-6 mt-4">
                        <h5 className="text-uppercase">Realizado</h5>
                        <div className="row">{ getDoneTasks() }</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;