import React, { useEffect, useState } from 'react';

const Tunes = (() => {
  let [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tunes")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setItems(result);
        }
      )
  }, []);
  return (
    <table border="1">
      <thead>
        <tr>
          <td>Id</td>
          <td>Tekstiviide</td>
          <td>Märkused</td>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.name}>
            <td>{item.id}</td>
            <td>{item.catalogue}</td>
            <td>{item.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Tunes;