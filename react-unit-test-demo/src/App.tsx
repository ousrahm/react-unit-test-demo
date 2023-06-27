import "./App.css";
import Addition from "./components/addition/Addition";
import Countries from "./components/countries/Countries";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Unit Test Demo App</h1>
      </header>
      <main>
        <div className="component">
          <Addition />
        </div>
        <div className="component">
          <Countries />
        </div>
      </main>
    </div>
  );
};

export default App;
