import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./components/ListPage";
import CreatePage from "./components/CreatePage";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/update/:id" element={<UpdatePage />} />
    </Routes>
  );
}

export default App;
