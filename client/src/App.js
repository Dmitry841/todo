import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import Overlay from "./components/Overlay";
import "./App.css";

const App = observer(() => {
  const {
    todos: { overlayText },
  } = useContext(Context);

  return (
    <BrowserRouter>
      <Overlay text={overlayText} show={!!overlayText} />
      <NavBar classname="navbar" />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
