import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import MainPage from "./MainPage";
import MyImages from "./MyImages";
import Details from "./Details";
import AppProvider from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/myimages" element={<MyImages />} />
          <Route path="/image/:id" element={<Details />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
