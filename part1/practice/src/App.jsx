import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        The current count is: {counter}
      </button>
      <br />
      <button onClick={() => setCounter(0)}>
        Reset the count
      </button>
    </div>
  );
};

export default App;
