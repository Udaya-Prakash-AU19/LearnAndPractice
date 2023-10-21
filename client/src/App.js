import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Posts from './components/Posts';
import HooksPractice from './components/HooksPractice';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='posts' element={ <Posts /> } />
            <Route path='hooksPractice' element={ <HooksPractice /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
