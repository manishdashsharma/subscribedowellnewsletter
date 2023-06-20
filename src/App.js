import './App.css';
import { Routes, Route } from 'react-router-dom';
import SubscribeNewsletter from './SubscribeNewsletter';
import UnSubsribe from './UnSubsribe';
const App = () =>{
  return (
    <Routes>
      <Route path="/" element={<SubscribeNewsletter/>} />
      <Route path="/unsubscribe" element={<UnSubsribe/>} />
    </Routes>
  )
}

export default App