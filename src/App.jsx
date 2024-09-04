import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './login/Register';
import Layout from './screen/Layout';
import supabase from './connector';
import ListMahasiwa from './mahasiswa/ListMahasiwa';

const App = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false)
    });

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });



   

    // Clean up
    return () => {
     
      subscription.unsubscribe();
    };
  }, []);
  
  if(loading){
    return (<h1>Loading guys</h1>)
  }
  if (!session) {
    return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path='/mahasiswa' element={<ListMahasiwa />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
