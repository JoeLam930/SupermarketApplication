import BooksList from '../components/BooksItemsandlists/BooksList';
import axios from 'axios';
      
function AllBooksPage(props) {

  const api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes?q=HTML5'
  })

  props.fetching && api.get('/')
  .then(res =>{
    props.setBooksStorage(res.data.items);
  })
  .finally(() => {
    props.setFetching(false);    
  });

  /*props.fetching && fetch("https://www.googleapis.com/books/v1/volumes?q=HTML5")
  .then(response => response.json())
  .then(data =>{
      props.setBooksStorage(data.items);
  }).finally(() => {
    props.setFetching(false);
  })*/
        
  return (
    <section>
      <BooksList BooksStorage={props.BooksStorage}
                 setBooksStorage={props.setBooksStorage}
                 FeaturedBook1 = {props.FeaturedBook1}
                 setFeaturedBook1 = {props.setFeaturedBook1}
                 FeaturedBook2 = {props.FeaturedBook2}
                 setFeaturedBook2 = {props.setFeaturedBook2}
      />            
    </section>
  );
}
      
export default AllBooksPage;
