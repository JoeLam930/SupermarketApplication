import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllBooksPage from './pages/AllBooksPage.js';
import { useState, useEffect } from 'react';
import styledComponents from 'styled-components';
import { Book, Facebook, Instagram, Twitter } from '@material-ui/icons';
import './components/BooksItemsandlists/BooksItem.css';

const Header = styledComponents.div`
  text-align: center;
  height: 75px;
  background-color: white;
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
    @media only screen and (max-width: 600px){
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Socialmediaheader = styledComponents.div`
  width: 25%;
  margin-right: 0;
  @media only screen and (max-width: 420px){
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
  width: 100%;
  height: 70px;
  background-color: white;
  @media only screen and (max-width: 600px){
    display: none;
  }
`;

const Menubutton = styledComponents.div`
  width: 25%;
  text-align: center;
  font-size: 1.5rem;
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

const ReverseforDesktop =  styledComponents.div`
  width: 33%;
  @media only screen and (max-width: 600px){
    width: 100%;
  }
`;

const Featured = styledComponents.div`
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  background-color: #FFFBF0;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;

const Featureditem = styledComponents.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: 600px){
    flex-direction: column-reverse;
  }

`;
const Featuredimage = styledComponents.div`
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  width: 70%;
`;
const Featurecontent = styledComponents.div`
  flex-wrap: wrap;
  width: 90%;
`;

const NoFeatured = styledComponents.div`
  width: 66%;
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

  /*Reloading the page remember the state of the selected books.*/
  useEffect(() => {
     setfSelected1(JSON.parse(window.localStorage.getItem('fselected1')));
     setfSelected2(JSON.parse(window.localStorage.getItem('fselected2')));
  }, []);

  useEffect(() => {
      window.localStorage.setItem('fselected1', fselected1);
      window.localStorage.setItem('fselected2', fselected2);
  }, [fselected1, fselected2]); 

  /*The book description should be a maximum of 140 characters.*/
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
      <Header>
      <Logo>
      <Book></Book>
      </Logo>
      <StoreName>The Book Store</StoreName>
      <Socialmediaheader>
        <Twitter></Twitter>
        <Facebook></Facebook>
        <Instagram></Instagram>
      </Socialmediaheader>
      </Header>
      <Menu>
        <Menubutton>Home</Menubutton>
        <Menubutton>Books</Menubutton>
        <Menubutton>Magazines</Menubutton>
        <Menubutton>E-Books</Menubutton>
        <Menubutton>Account</Menubutton>
      </Menu>
      <MobileMenu></MobileMenu>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a 
        type specimen book. It has survived not only five centuries, but also the
        leap into electronic typesetting, remaining essentially unchanged. It was popularised
        in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.</div>
      <div>
        
      <Items>
        <ReverseforDesktop>
        {/*Display those in the 'Featured' books column only.
          Select on a book anywhere on the page by clicking on them.
          Clear the user has made a selection, add a class of is-selected.
          Click on a selected book a second time to remove the class.*/}
        <Featured className='featuredhead'>Featured
          <Featureditem onClick={()=>checkSelect(1) } className = {fselected1 ? 'featureditemgray' : 'featureditemwhite'}>
            <Featurecontent>
              <h4>{!fetching && FeaturedBook1.volumeInfo.title}</h4>
              {!fetching && (FeaturedBook1.volumeInfo.subtitle == null ? "" : <h4>{FeaturedBook1.volumeInfo.subtitle}</h4>)}
              <p>{!fetching && FeaturedBook1.volumeInfo.authors.join(" | ")}</p>
              <p>Pages: {!fetching && FeaturedBook1.volumeInfo.pageCount}</p>
              <p>{!fetching && truncate(FeaturedBook1.volumeInfo.description, 140, true)}</p>             
            </Featurecontent>
            <Featuredimage>
              {!fetching && <img src={FeaturedBook1.volumeInfo.imageLinks.smallThumbnail} alt="book cover"/>}
              </Featuredimage>
          </Featureditem>
          </Featured>
          <Featured>Featured
        <Featureditem  onClick={()=>checkSelect(2) } className = {fselected2 ? 'featureditemgray' : 'featureditemwhite'}>
            <Featurecontent>
              <h4>{!fetching && FeaturedBook2.volumeInfo.title}</h4>
              {!fetching && (FeaturedBook2.volumeInfo.subtitle == null ? "" : <h4>{FeaturedBook2.volumeInfo.subtitle}</h4>)}
              <p>{!fetching && FeaturedBook2.volumeInfo.authors.join(" | ")}</p>
              <p>Pages: {!fetching && FeaturedBook2.volumeInfo.pageCount}</p>
              <p>{!fetching && truncate(FeaturedBook2.volumeInfo.description, 140, true)}</p>             
            </Featurecontent>
            <Featuredimage>
              {!fetching && <img src={FeaturedBook2.volumeInfo.imageLinks.smallThumbnail} alt="book cover"/>}
            </Featuredimage>
          </Featureditem>
        </Featured>
        </ReverseforDesktop>
      <NoFeatured>
      <BrowserRouter>
        <Routes>
          {/*Each book in the list displays the book cover, title, subtitle, all
          authors, number of pages and description.*/}
          <Route path='/' element={<AllBooksPage BooksStorage = {BooksStorage}
                                                setBooksStorage={setBooksStorage}
                                                FeaturedBook1 = {FeaturedBook1}
                                                setFeaturedBook1 = {setFeaturedBook1}
                                                FeaturedBook2 = {FeaturedBook2}
                                                setFeaturedBook2 = {setFeaturedBook2}
                                                fetching = {fetching}
                                                setFetching = {setFetching}
                                                />}>
                                                </Route>                                                
        </Routes>
      </BrowserRouter>
      </NoFeatured>
      </Items>      
      </div>
      <Socialmediafooter>
        <Twitter></Twitter>
        <Facebook></Facebook>
        <Instagram></Instagram>
      </Socialmediafooter>
    </div>
  );
}

export default App;