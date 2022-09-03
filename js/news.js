const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
   const res =await fetch(url);
   const data = await res.json();
  
   setAllCategory(data.data.news_category);
    
}
const setAllCategory = (categorys) =>{
    //console.log(categorys);
  
    const allCategory = document.getElementById('all-category');
   
    
      categorys.forEach(category =>{
        //console.log(category);
       
        const div = document.createElement('div');
        div.classList.add('a');
        div.innerHTML = `
        <a  onclick="loadNews('${category.category_id}')" style="text-decoration: none;cursor:pointer;" class="p-4 text-info fw-bold">${category.category_name}</a>`;
       allCategory.appendChild(div);
        
      });
     
      }

      const loadNews = (category_id) =>{
       
        togglespinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data,data.data.length))
        .catch(error => console.log(error))
        
    }
    const displayNews = (data,length) =>{
      //console.log(name);
      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = '';
      const found = document.getElementById('found');
      found.innerHTML = '';
      const newsDiv1 = document.createElement('div');
      newsDiv1.innerHTML = `
      <h5>${length ? length : 'No'} News Found </h5>
      `;
      found.appendChild(newsDiv1);
      const s = data.sort((s1,s2) => s2.total_view - s1.total_view);
       for(const news of data){
     
     
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('col');
      newsDiv.innerHTML = `
     <div class="card">
     <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title">${news.title}</h5>
     <p class="card-text">${news.details.slice(0,200)}...</div>
     <div class="d-flex align-items-center">
     <img src="${news.author.img ? news.author.img : 'No Author image'}" class="p-1 w-25 rounded-circle">
     <div class="text-center">
     <h1 class="h4">${news.author.name ? news.author.name : 'No author'}</h1>
     <p>${news.author.published_date ? news.author.published_date : 'No Publish Date'}</p>
     </div>
     <p class="ms-4"><i class="fa-solid fa-eye me-2"></i>${news.total_view ? news.total_view : 'No View' }</p>
     <button onclick="detailNews('${news._id}')" type="button" class="mx-auto me-2 btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
 
    
    
    
  
    
     
  
   `;
      newsContainer.appendChild(newsDiv); 
       }
       togglespinner(false);
   }
 
   const togglespinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading)
    {
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
    
}

const detailNews = (news) =>{
     //console.log(news);
     const url = `https://openapi.programming-hero.com/api/news/${news}`
     fetch(url)
     .then(res => res.json())
     .then(data => displayPhoneDetails(data.data[0]))
  
}


const displayPhoneDetails = (data) =>{
  console.log(data);
  const modelTitle = document.getElementById('newsDetailsLabel');
  modelTitle.innerText = data.title;
  const newsDetails = document.getElementById('news-details');
  newsDetails.innerHTML = `
  <img src = "${data.image_url}" class="w-75">
     <p>${data.details}</p>
     <h4 class="text-muted">Author Name : ${data.author.name ? data.author.name : 'No author'}</h4>
     <p class="text-muted">Release Date : ${data.author.published_date ? data.author.published_date : 'No Publish Date'}</p>
     <p class="text-muted">Views : ${data.total_view ? data.total_view : 'No View' }</p>
     <p class="text-muted">Ratings : ${data.rating.number ? data.rating.number  : 'No Ratings' }</p>
     <p class="text-muted">Rating Badge : ${data.rating.badge ? data.rating.badge  : 'No Badge' }</p>
  `
  
  
 
  
}


loadAllCategories();