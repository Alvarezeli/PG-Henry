import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/navbar/navbar.component';
import DetailArtist from './components/DetailArtist/DetailArtist';
import Artists from './components/Artists/Artists.component';
import MyProfile from './components/AdminPanel/MyProfile/MyProfile';
import Login from './components/Login/Login.component';
import AddArtists from './components/AdminPanel/AddArtists/AddArtists';
import AddItems from './components/AdminPanel/AddItems/AddItems';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import Footer from './components/Footer/Footer';
import ContactUs from './components/ContactUs/ContactUs';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
        <Route exact path='/admin/addartist' element={<AddArtists/>}/>
        <Route exact path='/admin' element={<MyProfile/>}/>
        <Route exact path='/admin/additems' element={<AddItems/>}/>
          <Route exact path='/artists' element={<Artists/>}/>
          <Route exact path='/artists/:id' element={<DetailArtist/>}/>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/under' element={<UnderConstruction/>}/>
          <Route exact path='/contactus' element={<ContactUs/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;