import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"

// How we go through the different pages using react router dom

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/login"
            element={
              <Login/>
            }
          />

         <Route 
            path="/logout"
            element={
              <Logout />
            }
        />
        
          <Route 
            path="/register"
            element={
              <RegisterAndLogout/>
            }
          />


            <Route 
            path="*"
            element={
              <NotFound/>
            }
          />
        </Routes>

      </BrowserRouter>
  )
}

export default App
