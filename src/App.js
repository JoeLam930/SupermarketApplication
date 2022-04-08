import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AllBooksPage from './pages/AllBooksPage.js';
import { useState, useEffect } from 'react';
import styledComponents from 'styled-components';
import { Book, Facebook, Instagram, Twitter } from '@material-ui/icons';
import './components/BooksItemsandlists/BooksItem.css';

const Header = styledComponents.div`
  text-align: center;
  width: 100%;
  height: 75px;
  background-color: #2B6777;
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
`;

const Logo = styledComponents.div`
`;

const StoreName = styledComponents.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
    @media only screen and (max-width: 600px){
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Socialmediaheader = styledComponents.div`
  margin-right: 0;
  @media only screen and (max-width: 600px){
    display: none;
  }
`;

const Socialmediafooter = styledComponents.div`
  width: 100%;
  visibility: hidden;
  @media only screen and (max-width: 420px){
    visibility: visible;
    text-align: center;
    margin-left: auto;
    margin-right: auto;  
  }
`;

const Menu = styledComponents.div`
  display: flex;
  width: 50%;
  background-color: white;
  @media only screen and (max-width: 600px){
    display: none;
  }
`;

const Menubutton = styledComponents.div`
  width: 25%;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
`;

const MobileMenu = styledComponents.div`
  display: none;
  @media only screen and (max-width: 600px){
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
    display: block;
    width: 100px;
    height: 100px;
  }
`;

const Items = styledComponents.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media only screen and (max-width: 600px){
    flex-direction: column;
  }

`;

const NoFeatured = styledComponents.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (max-width: 600px){
    width: 100%;
  }
`;


function App() {

  const [ BooksStorage, setBooksStorage ] = useState([]);
  const [ FeaturedBook1, setFeaturedBook1 ] = useState();
  const [ FeaturedBook2, setFeaturedBook2 ] = useState();
  const [fselected1, setfSelected1] = useState(false);
  const [fselected2, setfSelected2] = useState(false);  
  const [fetching, setFetching ] = useState(true);     

  useEffect(() => {
     setfSelected1(JSON.parse(window.localStorage.getItem('fselected1')));
     setfSelected2(JSON.parse(window.localStorage.getItem('fselected2')));
  }, []);

  useEffect(() => {
      window.localStorage.setItem('fselected1', fselected1);
      window.localStorage.setItem('fselected2', fselected2);
  }, [fselected1, fselected2]); 

  const truncate = ( str, n, useWordBoundary ) => {
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1);
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" ")) 
      : subString);
  };

  const checkSelect = (num) => {
    if(num === 1){
      if (!fselected1){
        setfSelected1(true);
      }else{
        setfSelected1(false);
      }
    }
    else{
      if (!fselected2){
        setfSelected2(true);
      }else{
        setfSelected2(false);
      }
    }    
}

  return (
    <div>        
      <Items>
      <BrowserRouter>
        <Header>
          <Logo>
          <Book></Book>
          </Logo>
          <StoreName>The Book Store</StoreName>
          <Menu>
          <Menubutton><Link to={"/"}>Home</Link></Menubutton>
          <Menubutton><Link to={"/page1"}>Books</Link></Menubutton>
        </Menu>
          <Socialmediaheader>
            <Twitter></Twitter>
            <Facebook></Facebook>
            <Instagram></Instagram>
          </Socialmediaheader>
        </Header>
        <MobileMenu></MobileMenu>
          <Routes>
            <Route path='/' element={             <NoFeatured>
                                                  <AllBooksPage BooksStorage = {BooksStorage}
                                                  setBooksStorage={setBooksStorage}
                                                  FeaturedBook1 = {FeaturedBook1}
                                                  setFeaturedBook1 = {setFeaturedBook1}
                                                  FeaturedBook2 = {FeaturedBook2}
                                                  setFeaturedBook2 = {setFeaturedBook2}
                                                  fetching = {fetching}
                                                  setFetching = {setFetching}
                                                  />
                                                  </NoFeatured>
                                                  }>
                                                  </Route>
            <Route path='/page1' element={<h1>Book</h1>}></Route>                                              
          </Routes>
      </BrowserRouter>
      </Items>      
      <Socialmediafooter>
        <Twitter></Twitter>
        <Facebook></Facebook>
        <Instagram></Instagram>
      </Socialmediafooter>
    </div>
  );
}

export default App;