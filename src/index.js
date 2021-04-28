import './styles.css';
import galleryListTpl from './templates/image-list.hbs';
import UploadImageService from './js/apiService';
import LoadMoreButton from './js/loadMoreButtonService';
import refs from './js/refs';

const loadMoreButton = new LoadMoreButton({
  selector: '.load-more-btn',
  hidden: true,
});

const uploadImages = new UploadImageService;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    uploadImages.query = e.currentTarget.elements.query.value;
    uploadImages.showSpinner();
     
    if (uploadImages.query === '') {
       
        alert('Введите корректный запрос');
        uploadImages.hideSpinner();
        loadMoreButton.hide();
        clearImageContainer();

    } else {
        loadMoreButton.show();
        clearImageContainer();
        uploadImages.resetPage();
        
        onLoadMore();
    }
      
}

function onLoadMore() {
    loadMoreButton.disable();
    uploadImages.fetchArticles().then(({ hits }) => {
        appendImagesMarkup(hits);
        loadMoreButton.enable();
        uploadImages.hideSpinner();
    });
    
    // window.scrollTo(0, 1000);
}

function appendImagesMarkup (hits) {
    refs.imagesSection.insertAdjacentHTML('beforeend', galleryListTpl(hits));
}

function clearImageContainer() {
    refs.imagesSection.innerHTML = '';
}