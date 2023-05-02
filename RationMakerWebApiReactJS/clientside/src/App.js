import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [products, setProducts] = useState();
  
  useEffect(() => {
    fetch('https://localhost:7193/api/Product/products')
        .then(response => response.json())
        .then(response => {
          setProducts(response);
        })
  }, [setProducts])
  
  console.log(products);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
