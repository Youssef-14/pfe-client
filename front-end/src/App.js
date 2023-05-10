// import * as React from 'react'
// import "bootstrap/dist/css/bootstrap.css"
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import ProductList from "./components/list.component";
// import Header from './components/Header';
// import NotFound from './page/NotFound';
// import Home from './page/Home';
// import Contact from './page/Contact';
// import Login from './page/Login';
// import Admin from './page/admin';
// import BotPage from './page/chatbot';
// import Footer from './components/footer';


// function App() {

//   return (
//     <Router>
//       <Header />

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/Home" element={<Home />}></Route>
//         <Route path="/chatbot" element={<BotPage />} />
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path='*' element={<NotFound />} />
//       </Routes>
//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;


import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DC_VISUALISATION from './components/DC_VISUALISATION'
import NotFound from './page/NotFound';
import Home from './page/Home';
import AccountsManagment from './components/AccountsManagment'
import Login from './page/Login';
import Admin from './page/admin';
import Reporting from './page/Reporting';
import Header from './components/Header';
function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<React.Fragment><Header /><Home /></React.Fragment>} />
        <Route path="/DC_VISUALISATION" element={<React.Fragment><Header /><DC_VISUALISATION /></React.Fragment>} />
        <Route path="/AccountsManagment" element={<React.Fragment><Header /><AccountsManagment /></React.Fragment>} />
        <Route path="/Reporting" element={<React.Fragment><Header /><Reporting /></React.Fragment>} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
