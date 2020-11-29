const APIURL = "https://api.github.com/users/";

const Main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");




// GET FOR USERNAME  
async function getData(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createCard(respData);
    getRepos(user);
}

// GET REPO
async function getRepos(userName) {
    const resp = await fetch(APIURL + userName + "/repos");
    const respData = await resp.json();
    console.log(respData);
    addRepostoCrad(respData);
}

// USERNAME CALL HERE 
getData("ARSHADKHAN615");

//  CREATE USER  CARD
function createCard(user) {
    const { avatar_url, name, bio, followers, following, public_repos } = user;
    const cardHtml =
        `<div class="card">
                        <div>
                                 <img src="${avatar_url}" alt="${name}" class="avatar">
                        </div>
                        <div class="info">
                                <div>
                                    <h1>${name}</h1>
                                    <p>${bio}</p>
                                </div>
                                <ul>
                                    <li><ion-icon name="eye-outline" class="eye"></ion-icon>${followers}</li>
                                    <li><ion-icon name="heart" class="heart"></ion-icon>${following}</li>
                                    <li><ion-icon name="albums"></ion-icon>${public_repos}</li>
                                </ul>   
                         </div> 
                         </div>   
                         <div class="repos" id="repos">
                         <h1>GITHUB REPOSITOTY</h1>
                         </div>        

          
          `

    Main.innerHTML = cardHtml;
}

// CREATE REPO LINKS BOX 
function addRepostoCrad(repoData) {
    const reposEl = document.getElementById("repos");
    repoData.sort((a, b) =>
            b.stargazers_count - a.stargazers_count
        ).slice(0, 11)
        .forEach(e => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = e.html_url;
            repoEl.target = "_arshad";
            repoEl.innerText = e.name;
            reposEl.appendChild(repoEl);
        });
    console.log(repoData);
}

// SEARCH USERNAME
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const userValue = search.value;

    getData(userValue);
    search.value = "";
})