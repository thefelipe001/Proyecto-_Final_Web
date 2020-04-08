import React, { Component } from 'react';
import Chair from './Chair';
import axios from 'axios';

/**
 * The container component for chairs,
 * with some initial data filling the chair array in case datebase is not connected.
 */
class ChairContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chairArray: [
              {
                  title: "title",
                  producer: "producer",
                  designer: "designer",
                  year: 1965,
                  category: "category",
                  description: "description",
                  condition: true,
                  price: 2500,
                  image: "ch25.jpg"
              }
            ]
        }
    }

    getChairs() {
        let allChairs = this.state.chairArray.map( chair => {
            if(chair.condition === true) {
                chair.condition = "New";
            } else {
                chair.condition = "Used";
            }
            return <Chair
                key={chair.id}
                id={chair.id}
                title={chair.title}
                producer={chair.producer}
                designer={chair.designer}
                year={chair.year}
                category={chair.category}
                description={chair.description}
                condition={chair.condition}
                price={chair.price} 
                image={chair.image} />
        });
        return allChairs;
    }

    componentDidMount() {
        axios.get("https://localhost:5001/chairs")
        .then(response => {
            this.setState({chairArray: response.data});
        })
    }

    render() {
        return(
            <section id="chairs-container" className="container-fluid">
                <div className="row">
                    {this.getChairs()}
                </div>
            </section>
        )
    }
}

export default ChairContainer;