const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
   const res =await fetch(url);
   const data = await res.json();
  
   setAllCategory(data.data.news_category);
    
}
const setAllCategory = (categorys) =>{
    //console.log(data);
  
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
      
      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = '';
      const found = document.getElementById('found');
      found.innerHTML = '';
      const newsDiv1 = document.createElement('div');
      newsDiv1.innerHTML = `
      <h5>${length ? length : 'No'} News found </h5>
      `;
      found.appendChild(newsDiv1);
      const s = data.sort((s1,s2) => s1.total_view - s2.total_view);
       for(const news of data){
     
     
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('col');
      newsDiv.innerHTML = `
     <div class="card">
     <img src="${news.image_url}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title">${news.title}</h5>
     <p class="card-text">${news.details.slice(0,200)}...</div>
     <div class="d-flex">
     <img src="${news.author.img ? news.author.img : 'No Author image'}" class="p-2 w-25 rounded-circle">
     <div>
     <h1 class="h4">${news.author.name ? news.author.name : 'No author'}</h1>
     <p>${news.author.published_date ? news.author.published_date : 'No Publish Date'}</p>
     </div>
     <p class="mt-5"><i class="fa-solid fa-eye"></i>${news.total_view ? news.total_view : 'No View' }</p>
     <button onclick="detailNews('${news._id}')" href="#" class="me-1 mb-2 btn bg-secondary text-white w-50 h-25 text-center my-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
     </div>
     
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
 
  `
  
  
 
  
}


loadAllCategories();