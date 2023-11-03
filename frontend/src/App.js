
import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from'./components/Home';
import Resume from './components/Resume';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer'

function App() {
  
  return (
    <>
    <Routes>
        <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} /> 
    </Routes>
    <div>
      <Footer />
    </div>
    </>
  );
}

export default App;
