const API_KEY = '21347916-d2cb58bac2dcf6ecd9205e483'
const BASE_URL = 'https://pixabay.com/api';

export default class UploadImageService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    

    async fetchArticles() {
       
        try {
             console.log(this);
    
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        const images = await fetch(url);
        const response = await images.json();
        this.incrementPage();
        
            return response;
            
        } catch  {
            alert('Error');
        }
       
    }

     incrementPage() {
       this.page += 1;
    }

    resetPage() {
       this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}