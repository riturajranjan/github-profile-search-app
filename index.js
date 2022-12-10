const APIURL = "https://api.github.com/users/";
const main = document.querySelector(".main");
const searchBox = document.querySelector("#search");
const btn = document.querySelector("#btn");


const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();
  const card = `
    <div class="card">
    <div class = "user_img">
        <img src="${data.avatar_url}" alt="" class="avatar">
    </div>
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
    </div>
    <ul>
        <li>${data.followers} <strong>Followers</strong></li>
        <li>${data.following} <strong>Following</strong></li>
        <li>${data.public_repos} <strong>Repos</strong></li>
    </ul>
    <div class="repos">
    </div>
</div>
    `;
    main.innerHTML = card;
    getRepos(username)
  console.log(data);
};
getUser("riturajranjan");

const getRepos =async(username)=>{
    const repos = document.querySelector(".repos")
    const response = await fetch(APIURL+username + "/repos");
    const data = await response.json();
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank"
        repos.appendChild(elem);
    }
    )
    console.log(data);
}



const formSubmit = ()=>{
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value="";
    }

    return false;
}

searchBox.addEventListener("focusout", function(){
    formSubmit();
})

btn.addEventListener("Click", function(){
    formSubmit();
})