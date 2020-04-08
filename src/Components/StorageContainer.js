import React, { Component } from 'react';
import Storage from './Storage';
import axios from 'axios';

/**
 * The container component for storages,
 * with some initial data filling the storage array in case datebase is not connected.
 */
class StorageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          storageArray: [
              {
                  title: "title",
                  producer: "producer",
                  designer: "designer",
                  year: 1965,
                  category: "category",
                  description: "description",
                  condition: true,
                  price: 2500,
                  image: "string.jpg"
              }
            ]
        }
    }

    getStorage() {
        let allStorage = this.state.storageArray.map( storage => {
            if(storage.condition === true) {
                storage.condition = "New";
            } else {
                storage.condition = "Used";
            }
            return <Storage
                key={storage.id}
                id={storage.id}
                title={storage.title}
                producer={storage.producer}
                designer={storage.designer}
                year={storage.year}
                category={storage.category}
                description={storage.description}
                condition={storage.condition}
                price={storage.price} 
                image={storage.image} />
        });
        return allStorage;
    }

    componentDidMount() {
        axios.get("https://localhost:5001/storage")
        .then(response => {
            this.setState({storageArray: response.data});
        })
    }

    render() {
        return(
            <section id="storage-container" className="container-fluid">
                <div className="row">
                    {this.getStorage()}
                </div>
            </section>
        )
    }
}

export default StorageContainer;