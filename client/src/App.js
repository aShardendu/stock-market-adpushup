import './App.css';
import DataList from './DataList';
import Header from './components/Header';
import Herocard from './components/Herocard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewData from './ViewData';
import Error from './error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Herocard />
        {/* <DataList /> */}
        <Routes>
            <Route path="/" element={<DataList />} />
            <Route path='/view' element={<ViewData />} />
            <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;