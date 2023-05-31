import "./App.css";
import {Routes, Route} from "react-router-dom"
import Form from "./components/form";
import Nav from "./components/nav";
import List from "./components/List";

function App() {

  return (
    <div className="container">
      <Nav/>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/list" element={<List/>} />
      </Routes>
      
    </div>
  );
}

export default App;
