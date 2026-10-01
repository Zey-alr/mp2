import { Routes, Route, Link } from 'react-router-dom'
import ListView from './pages/ListView'
import GalleryView from './pages/GalleryView'
import DetailView from './pages/DetailView'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Meal Explorer</h1>
        <div className="nav-links">

          <Link to="/">List</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/meal/:id" element={<DetailView />} />
      </Routes>
    </>
  )
}

export default App