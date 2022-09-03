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
        <a  onclick="loadNews('${category.category_id}')" style="text-decoration: none;cursor:pointer" class="p-4 text-secondary">${category.category_name}</a>`;
       allCategory.appendChild(div);
        
      });
     
      }

      const loadNews = (category_id) =>{
       
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
      <h5>${length} items found </h5>
      `;
      found.appendChild(newsDiv1);
       for(const news of data){
      //console.log(news);
     
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('col');
      newsDiv.innerHTML = `
     <div class="card">
     <img src="${news.image_url}" class="card-img-top" alt="...">
     <div class="card-body">
     <h5 class="card-title">${news.title}</h5>
     <p class="card-text">${news.details.slice(0,200)}</div>
     <button onclick="loadPhoneDetails()" class="btn bg-secondary text-white m-2 btn-sm">See Details</button>
    </div>
   `;
      newsContainer.appendChild(newsDiv); 
       }
   }
 

//setAllMenu();

loadAllCategories();