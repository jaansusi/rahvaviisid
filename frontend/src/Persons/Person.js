import React from 'react';

// to-do: convert to functional
class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: {}
        };
    }

    
    
    componentDidMount() {
        let id = 1;
        fetch("http://localhost:3000/persons/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                }
            )
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Person;