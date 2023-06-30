import './App.css';
import {Routes, Route, RouterProvider} from "react-router-dom";
import List from "./bill/component/bill/List";

function App() {
  return (
      <>
          <Routes>
              <Route path="/list" element={<List/>}/>
          </Routes>
      </>
  );
}

export default App;
