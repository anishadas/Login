import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
function App() {
  // let users = true;
  const [user, setUser] = useState(false);
  useEffect(() => {
    console.log("effect");
    const getUser = async () => {
      const res = await fetch('http://localhost:5000/auth/login/success', {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      console.log("ress",res)
      if (res.status === 200) {
        const data = await res.json();
        setUser(data.user);

      } else {
        throw new Error("authentication failed")
      }
    }
    getUser();
  }, []);
  
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
