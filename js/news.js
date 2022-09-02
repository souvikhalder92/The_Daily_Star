const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
   const res =await fetch(url);
   const data = await res.json();
   setAllCategory(data.data.news_category);
    
}
const setAllCategory = categorys =>{
    //console.log(data);
  
    const allCategory = document.getElementById('all-category');
     
    
      categorys.forEach(category =>{
        console.log(category);
        const div = document.createElement('div');
        div.classList.add('a');
        div.innerHTML = `
        <a style="text-decoration: none" class="p-4 text-secondary">${category.category_name}</a>`;
       allCategory.appendChild(div);
        
      });
     
      }



//setAllMenu();
loadAllCategories();