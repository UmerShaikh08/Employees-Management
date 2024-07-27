import "./App.css";
import { Route, Routes } from "react-router-dom";
import EmployeeManagement from "./pages/EmployeeManagement";

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<EmployeeManagement />} />
            </Routes>
        </div>
    );
}

export default App;
