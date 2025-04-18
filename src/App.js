import './styles//App.css';
import './styles/Background.css';
import './styles/LeftMain.css';
import './styles/RightMain.css';
import LeftMain from './components/LeftMain';
import RightMain from './components/RightMain';
import CreateNFTForm from './components/CreateNFTForm';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Introbar from './components/Introbar';
import Navbar from './components/Navbar';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="main-content">
                <LeftMain />
                <RightMain />
              </div>
            </>
          }
        />
        <Route
          path="/create-nfts/form"
          element={
            <>
              <Introbar />
              <CreateNFTForm />
            </>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
