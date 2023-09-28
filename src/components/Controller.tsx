import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Slider from '@mui/material/Slider';

const Controller = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const renderNumberList = () => {
    const numbers = [1, 2, 3, 4, 5];
    return numbers.map((number) => (
      <div key={number}>{number}</div>
    ));
  };

  return (
    <Stack direction="row">
      <Stack direction="column">
        {/* Add label */}
        <label>Label</label>
        
        {/* Add SVG circle */}
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="3" fill="none" />
          {/* Add clock hand */}
          <line x1="50" y1="50" x2="50" y2="20" stroke="white" strokeWidth="3" />
        </svg>
        
        {/* Add button group */}
        <Stack direction="row">
          <button onClick={handleDecrement}>-</button>
          <span>{count}</span>
          <button onClick={handleIncrement}>+</button>
        </Stack>
      </Stack>

      <Stack direction="row">
        {/* Add slider */}
        <Slider
        aria-label="Temperature"
        orientation="vertical"
      />

        <Stack direction="column">
          {/* Add list of 5 numbers */}
          {renderNumberList()}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Controller;
