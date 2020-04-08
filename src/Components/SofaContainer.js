import React, { Component } from 'react';
import Sofa from './Sofa';
import axios from 'axios';

/**
 * The container component for sofas,
 * with some initial data filling the sofa array in case datebase is not connected.
 */
class SofaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sofaArray: [
              {
                  title: "title",
                  producer: "producer",
                  designer: "designer",
                  year: 1965,
                  category: "category",
                  description: "description",
                  condition: true,
                  price: 2500,
                  image: "mags.jpg"
              }
            ]
        }
    }

    getSofas() {
        let allSofas = this.state.sofaArray.map( sofa => {
            if(sofa.condition === true) {
                sofa.condition = "New";
            } else {
                sofa.condition = "Used";
            }
            return <Sofa
                key={sofa.id}
                id={sofa.id}
                title={sofa.title}
                producer={sofa.producer}
                designer={sofa.designer}
                year={sofa.year}
                category={sofa.category}
                description={sofa.description}
                condition={sofa.condition}
                price={sofa.price} 
                image={sofa.image} />
        });
        return allSofas;
    }

    componentDidMount() {
        axios.get("https://localhost:5001/sofas")
        .then(response => {
            this.setState({sofaArray: response.data});
        })
    }

    render() {
        return(
            <section id="sofas-container" className="container-fluid">
                <div className="row">
                    {this.getSofas()}
                </div>
            </section>
        )
    }
}

export default SofaContainer;