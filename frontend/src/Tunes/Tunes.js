import React from 'react';

class Tunes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/tunes")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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
    }
  }
}

export default Tunes;