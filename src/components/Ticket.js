import React from 'react';

const styles = {
    ticketContainer: {
      width: '95%',
      margin: '0 auto',
      marginTop: '1%',
      borderBottom: '1px solid gainsboro',
      padding: '2% 1%',
    },
  }

export default function Ticket({ id, title, description, category, wit }) {
    return (
        <div style={styles.ticketContainer} >
            <div>
                <span>{id}. <b>{title}</b></span>
            </div>
            <div>
                <p><b>Description:</b> {description}</p>
            </div>
            <div>
                <p><b>What I Tried:</b> {wit}</p>
            </div>
            <span>{category}</span>
        </div>
    );
}