import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Dashboard, ForgotPassword, LayoutDashboard } from "./pages";
import { Layout } from "./components/layouts";
<<<<<<< HEAD
import Users from "./features/User/Users";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AdminRoute } from "./routes/AdminRoute";
//import ListUser from "./features/User/ListUser"

=======
>>>>>>> e7e4617550e28b11b2ebe715878ea042c8b4c072
import ExampleOne from "./pages/ExampleOne";
import SlideOvers from "./components/fragments/SlideOvers";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route
                        path='forgot-password'
                        element={<ForgotPassword />}
                    />
                </Route>
                <Route path='/' element={
                    <PrivateRoute> 
                        <LayoutDashboard /> 
                    </PrivateRoute> 
                }>
                        <Route path='dashboard' element={<Dashboard /> } />
                        <Route path='parent/children' element={
                            <AdminRoute> 
                                <Users />
                            </AdminRoute>} 
                        />                    
                </Route>
                <Route path='/slide-overs' element={<SlideOvers />} />
            </Routes>
        </>
    );
}

export default App;
