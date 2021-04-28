import './styles.css';

import galleryListTpl from './templates/image-list.hbs';
import UploadImageService from './js/apiService';
import refs from './js/refs';

const uploadImages = new UploadImageService;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    uploadImages.query = e.currentTarget.elements.query.value;
     
    if (uploadImages.query === '') {
       
        alert('Введите данные')
        clearImageContainer();

    } else {

        clearImageContainer();
        uploadImages.resetPage();
        onLoadMore();
    }
      
}

function onLoadMore() {
    uploadImages.fetchArticles().then(({ hits }) => {
        appendImagesMarkup(hits);
    });

    windowsScrolling();
}

function appendImagesMarkup (hits) {
    refs.imagesSection.insertAdjacentHTML('beforeend', galleryListTpl(hits));
}

function clearImageContainer() {
    refs.imagesSection.innerHTML = '';
}

function windowsScrolling() {
const totalScrollHeight = document.body.clientHeight;

 window.scrollTo({
  top: totalScrollHeight,
  left: 0,
  behavior: 'smooth',
});
}