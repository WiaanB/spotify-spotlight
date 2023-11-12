import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from '@/views/Home'
import Login from '@/views/Login'
import Compare from '@/views/Compare'
import Explorer from "./views/Explorer";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/explorer" element={<Explorer />} />
            </Route>
        </Routes>
    </BrowserRouter>

}

export default App;