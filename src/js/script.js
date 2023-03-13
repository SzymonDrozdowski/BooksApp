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
    const images = document.querySelectorAll(select.containerOf.image);
    for(let image of images){
        image.addEventListener('dblclick', function(event){
            event.preventDefault();
            image.classList.add('favorite');
            const bookId = image.getAttribute('data-id')
            favoriteBooks.push(bookId)
        })
    }
  }
  initActions();
}