import React from 'react';

const Divider: React.FC = () => {
  return (
    <hr style={dividerStyle} />
  );
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: '#e0e0e0', // Light gray color
  border: 'none',
  margin: '8px 0', // Optional margin, you can adjust it
};

export default Divider;
