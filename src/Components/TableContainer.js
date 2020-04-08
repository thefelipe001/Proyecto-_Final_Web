import React, { Component } from 'react';
import Table from './Table';
import axios from 'axios';

/**
 * The container component for tables,
 * with some initial data filling the table array in case datebase is not connected.
 */
class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableArray: [
              {
                  id: 0,
                  title: "title",
                  producer: "producer",
                  designer: "designer",
                  year: 1965,
                  category: "category",
                  description: "description",
                  condition: true,
                  price: 2500,
                  image: "hunting.jpg"
              }
            ]
        }
    }

    getTables() {
        let allTables = this.state.tableArray.map( table => {
            if(table.condition === true) {
                table.condition = "New";
            } else {
                table.condition = "Used";
            }
            return <Table
                key={table.id}
                id={table.id}
                title={table.title}
                producer={table.producer}
                designer={table.designer}
                year={table.year}
                category={table.category}
                description={table.description}
                condition={table.condition}
                price={table.price} 
                image={table.image} />
        });
        return allTables;
    }

    componentDidMount() {
        axios.get("https://localhost:5001/tables")
        .then(response => {
            this.setState({tableArray: response.data});
        })
    }

    render() {
        return(
            <section id="tables-container" className="container-fluid">
                <div className="row">
                    {this.getTables()}
                </div>
            </section>
        )
    }
}

export default TableContainer;