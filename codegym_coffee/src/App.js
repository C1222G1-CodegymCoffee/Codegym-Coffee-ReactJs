import logo from './logo.svg';
import './App.css';
import {ListFeedback} from "./components/feedback/ListFeedback";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin/feedback",
    element: <ListFeedback />,

  }
]);

function App() {
  return (
      <>
        <RouterProvider
            router={router}
        />
      </>
  );
}


export default App;
