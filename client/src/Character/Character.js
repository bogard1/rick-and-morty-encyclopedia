import React from 'react';

class Character extends React.Component {
  render() {
    const character_logo = {
      maxHeight: '50px',
    };
  
    return (
      <tr>
        <td>{ this.props.name }</td>
        <td>{ this.props.status }</td>
        <td>{ this.props.gender }</td>
        <td><img style={character_logo} src={ this.props.image }></img></td>
      </tr>
    );
  }
}

export { Character };
