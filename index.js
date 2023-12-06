const cards = document.querySelector('.cards')
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")

const baseUrl = "https://newsapi.org/v2"
const apiKey = "XXXXXXXXXXXXXXXXXX"

const backupImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ld3N8ZW58MHx8MHx8fDA%3D"

// const newsA = "/everything?q=tesla&from=2023-12-05&sortBy=publishedAt";
// const newsB = "/top-headlines?country=us&category=business"
// const newsC = "/everything?q=crypto&sortBy=publishedAt"
// const newsD = "/top-headlines?sources=techcrunch"

async function dataRequest(url){
  try{
    const response = await fetch(baseUrl + url + "&apiKey=" + apiKey);
    const data = response.json();
     return await data;
  } catch(error){
    console.log(error);
  }
}

function urlRequest(url){
  dataRequest(url).then(data => {
    data.articles.forEach(item => {
      cards.innerHTML += `<div class="card">
                            <div class="image">
                              <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="Image of type writer">
                            </div>
                            <div class="information">
                              <div>
                                <p class="title">${item.title}</p>
                                <p class="description">${item.description ? item.description : ""}</p>
                                <p class="time">
                                  <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                  <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                </p>
                              </div>
                              <div class="other">
                                <span class="source">${item.source.name ? item.source.name : "Unkown"}</span>
                                <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                              </div>
                            </div>
                          </div>`
    });
  })
}

category.addEventListener("click", event => {
  if(event.target.tagName ==="SPAN"){
    cards.innerHTML = ""
    urlRequest(event.target.dataset.url)
    categorySpan.forEach(item => item.classList.remove("active"))
    event.target.classList.add("active")
  }
})

urlRequest("/everything?q=tesla&from=2023-12-05&sortBy=publishedAt")




// const test = dataRequest(url)
// test.then(news => {
//   console.log(news)
// })