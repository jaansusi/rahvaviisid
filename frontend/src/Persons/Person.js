import React from 'react';

// to-do: convert to functional
const Person = ((props) => {

    let id = 1;//props.id;
    fetch("http://localhost:3000/persons/" + id)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            }
        )
    return (
        <div></div>
    );
});

export default Person;