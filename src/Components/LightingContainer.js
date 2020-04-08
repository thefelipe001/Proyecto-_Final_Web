import React, { Component } from 'react';
import Lighting from './Lighting';
import axios from 'axios';

/**
 * The container component for lights,
 * with some initial data filling the lighting array in case datebase is not connected.
 */
class LightingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lightingArray: [
              {
                  title: "title",
                  producer: "producer",
                  designer: "designer",
                  year: 1965,
                  category: "category",
                  description: "description",
                  condition: true,
                  price: 2500,
                  image: "ph5.jpg"
              }
            ]
        }
    }

    getLights() {
        let allLights = this.state.lightingArray.map( lighting => {
            if(lighting.condition === true) {
                lighting.condition = "New";
            } else {
                lighting.condition = "Used";
            }
            return <Lighting
                key={lighting.id}
                id={lighting.id}
                title={lighting.title}
                producer={lighting.producer}
                designer={lighting.designer}
                year={lighting.year}
                category={lighting.category}
                description={lighting.description}
                condition={lighting.condition}
                price={lighting.price} 
                image={lighting.image} />
        });
        return allLights;
    }

    componentDidMount() {
        axios.get("https://localhost:5001/lights")
        .then(response => {
            this.setState({lightingArray: response.data});
        })
    }

    render() {
        return(
            <section id="lights-container" className="container-fluid">
                <div className="row">
                    {this.getLights()}
                </div>
            </section>
        )
    }
}

export default LightingContainer;