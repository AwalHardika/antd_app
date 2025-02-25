import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './login/Register';
import Layout from './screen/Layout';
import supabase from './connector';
import ListMahasiwa from './mahasiswa/ListMahasiwa';
import Messages from './mahasiswa/Messages';
import SendMessages from './mahasiswa/SendMessages';

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
    return () =>subscription.unsubscribe();
    
  }, []);

  if(loading){
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <h1>Loading Boss</h1>
      </div>
    )
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
        <Route path='/mahasiswa/messages' element={<Messages/>} />
        <Route path='/send_messages' element={<SendMessages/>}/>
      </Route>
    </Routes>
  );
};

export default App;
