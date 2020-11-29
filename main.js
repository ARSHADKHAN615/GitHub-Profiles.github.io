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
    if (respData.message == "Not Found") {
        Main.innerHTML = "<h1>Not Found</h1>";
    }
    addRepostoCrad(respData);
}

// USERNAME CALL HERE 
getData("ARSHADKHAN615");

//  CREATE USER  CARD
function createCard(user) {
    const { avatar_url, name, bio, followers, following, public_repos } = user;
    if (user.name !== null) {
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
                                        <li><b>Followers</b><ion-icon name="eye-outline" class="eye"></ion-icon><b>${followers}</b></li>
                                        <li><b>Following</b><ion-icon name="heart" class="heart"></ion-icon><b>${following}</b></li>
                                        <li><b>Repository</b><ion-icon name="albums"></ion-icon><b>${public_repos}</b></li>
                                    </ul>   
                             </div> 
                             </div>   
                             <div class="repos" id="repos">
                             <h1> TOP 10-GITHUB REPOSITORY</h1>
                             </div>        
    
              
              `

        Main.innerHTML = cardHtml;
    } else {
        Main.innerHTML = "<h1>Result Not Found</h1>";
    }
}

// CREATE REPO LINKS BOX 
function addRepostoCrad(repoData) {
    const reposEl = document.getElementById("repos");
    repoData.sort((a, b) =>
            b.stargazers_count - a.stargazers_count
        ).slice(0, 10)
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