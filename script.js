
// https://api.github.com/users/username
// https://api.github.com/users/username/repos

function find() {
let username = document.getElementById("username").value;
// let username = "akashsaha2001";

let githubuser = fetch(`https://api.github.com/users/${username}`)

githubuser.then((response) => {
    if (!response.ok) {
        console.log("enter valid user");
        document.getElementById("invaliduser").style.display = "block";
        document.getElementById("profilebox").style.display = "none"; throw new Error("Invalid user");
    }
    return response.json();
}).then((data) => {
    console.log(data);

    document.getElementById("invaliduser").style.display = "none";
    document.getElementById("profilebox").style.display = "block";


    //Account Name
    document.getElementById("accountname").innerHTML = `<i class="far fa-user"></i>  ` + data.login + `     <a href="${data.html_url}"><i class="fas fa-external-link-square-alt" style="color: black;"></i></a>`;
    //profileimage
    document.getElementById("profileimage").src = data.avatar_url;

    //profile Name
    document.getElementById("name").innerHTML = data.name;

    //profile followers
    document.getElementById("followers").innerHTML = " " + data.followers + " ";

    //profile following
    document.getElementById("following").innerHTML = " " + data.following + " ";

    //profile repo
    document.getElementById("repocount").innerHTML = " " + data.public_repos + " ";

    //profile Bio
    document.getElementById("bio").innerHTML = data.bio;

    //profile location
    if (data.location == null) {
        document.getElementById("location").style.display = "none";
    } else {
        document.getElementById("location").style.display = "block";

        document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i>  ` + data.location;

    }


    //profile company
    if (data.company == null) {
        document.getElementById("company").style.display = "none";
    }
    else {
        document.getElementById("company").style.display = "block";

        document.getElementById("company").innerHTML = `<i class="fas fa-building"></i>  ` + data.company;

    }


    document.getElementById("statshtml").innerHTML = `<img class="stats-img" draggable="false" id="stats"
            src="https://github-readme-stats.vercel.app/api?username=${username}&amp;theme=dark&amp;hide_border=false&amp;include_all_commits=false&amp;count_private=false"
            alt="">`
    document.getElementById("streakhtml").innerHTML = `<img class="stats-img" draggable="false" id="streak"
            src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&amp;theme=dark&amp;hide_border=false"
            alt="">`
    document.getElementById("langshtml").innerHTML = `<img class="stats-img" draggable = "false" id = "langs"
            src = "https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&amp;theme=dark&amp;hide_border=false&amp;include_all_commits=false&amp;count_private=false&amp;layout=compact"
            alt = "" >`





    //profile link
    let profilelink = data.html_url
}).catch((error) => {
    console.log(error);
})




let githubuserrepo = fetch(`https://api.github.com/users/${username}/repos`);

githubuserrepo.then((response) => {
    if (!response.ok) {
        console.log("Invalid User");
    }
    return response.json();
}).then((data) => {
    console.log(data);

    let repoContainer = document.getElementById("repo");
    repoContainer.innerHTML = ""; // Clear any existing content

    data.forEach(repo => {
        let repoElement = document.createElement("div");
        repoElement.classList.add("repo-item");

        repoElement.innerHTML = `
            <a href="${repo.html_url}" class="button">
                <h6>
                    ${repo.name} &nbsp;
                        <i class="fas fa-external-link-square-alt"></i>
                </h6>
            </a>
            `;

        repoContainer.appendChild(repoElement);
    });


    // Extract languages from repositories
    let languages = data.map(repo => repo.language);

    // Remove duplicates using Set
    let uniqueLanguages = [...new Set(languages)];

    let languageContainer = document.getElementById("language");
    languageContainer.innerHTML = ""; // Clear any existing content

    uniqueLanguages.forEach(language => {

        let languageElement = document.createElement("div");
        languageElement.classList.add("language-item");

        switch (language) {
            case 'HTML':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML">
                </div>
            `;
                break;
            case null:
                languageElement.innerHTML = `
                    <div style="display: none;">
                    </div>
                `;
                break;
            case 'CSS':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS">
                </div>
            `;
                break;
            case 'JavaScript':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
                </div>
            `;
                break;
            case 'PHP':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
                </div>
            `;
                break;
            case 'Java':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
                </div>
            `;
                break;
            case 'C++':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++">
                </div>
            `;
                break;
            case 'TypeScript':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
                </div>
            `;
                break;
            case 'Python':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python">
                </div>
            `;
                break;
            case 'Ruby':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white" alt="Ruby">
                </div>
            `;
                break;
            case 'Swift':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/swift-%23FA7343.svg?style=for-the-badge&logo=swift&logoColor=white" alt="Swift">
                </div>
            `;
                break;
            case 'Go':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" alt="Go">
                </div>
            `;
                break;
            case 'Rust':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white" alt="Rust">
                </div>
            `;
                break;
            case 'Kotlin':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/kotlin-%230095D5.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin">
                </div>
            `;
                break;
            case 'Scala':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/scala-%23DC322F.svg?style=for-the-badge&logo=scala&logoColor=white" alt="Scala">
                </div>
            `;
                break;
            case 'Dart':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white" alt="Dart">
                </div>
            `;
                break;
            case 'C':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white" alt="Dart">
                </div>
            `;
                break;
            case 'Jupyter Notebook':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white" alt="Dart">
                </div>
            `;
                break;
            case 'Shell':
                languageElement.innerHTML = `
                <div class="badge">
                    <img src="https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white)" alt="Dart">
                </div>
            `;
                break;
            default:
                languageElement.innerHTML = `
                <div class="badge" style="color : black;">
                    <h6>${language}</h6> <!-- Display the language name if badge not available -->
                </div>
            `;
                break;

        }
        languageContainer.appendChild(languageElement);


    })
}).catch((error) => {
    console.log(error);
})

}