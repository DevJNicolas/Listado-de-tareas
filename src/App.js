import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Index from './pages/Task/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/task' element={<Index />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
