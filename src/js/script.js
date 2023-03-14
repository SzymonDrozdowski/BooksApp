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
    },
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  function render(){
    for(let book of dataSource.books){
      const generatedHTML = templates.booksTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.booksList);
      bookContainer.appendChild(generatedDOM);
    }

  }
  render();

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
  }
  initActions();
}