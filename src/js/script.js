

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    templateOf:{
      booksList: '#template-book',
    },
    containerOf:{
      booksList: '.books-list',
      image: '.book__image',
      filters: '.filters',
    },
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  function render(){
    for(let book of dataSource.books){
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      
      const generatedHTML = templates.booksTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(generatedDOM);
    }

  }
  render();


  const filters = [];
  const favoriteBooks = [];

  function initActions(){

    const booksList = document.querySelector(select.containerOf.booksList);
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      
      const bookId = event.target.offsetParent.getAttribute('data-id');
      
      if(!favoriteBooks.includes(bookId)){
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        const removedId = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(removedId, 1);
      }
    });

    const booksFilters = document.querySelector(select.containerOf.filters);
    booksFilters.addEventListener('click', function(event){
      
      if(event.target.name == 'filter' && event.target.checked == true){
        filters.push(event.target.value);
      }else if(event.target.name == 'filter' && event.target.checked == false){
        const removeValue = filters.indexOf(event.target.value);
        filters.splice(removeValue, 1);
      }
      filterBooks();
    });
  }
  initActions();

  function filterBooks (){
    let shouldBeHidden = false;

    for(let book of dataSource.books){
      for (let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }else{
          shouldBeHidden = false;
        }
      }
      const singleBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if(shouldBeHidden){
        singleBook.classList.add('hidden');
      }else{
        singleBook.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    let background = '';

    if(rating < 6){
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    }else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    }else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
    return background;
  }
}