import reddit from './redditapi'

const searchBtn = document.querySelector(".search-btn")
const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-input")
console.log("hello")
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("hellop")
    const sortBy = document.querySelector("input[name='sort']:checked").value;
    // console.log(sortBy);
    const searchTerm = searchInput.value;
    const limit = document.getElementById("limit").value
    console.log(limit)

    if (searchTerm == "") {
        // show alert message
        showAlertMessage("Please add a Search term", "alert-danger");
    }

    searchInput.value = "";

    reddit.search(searchTerm, sortBy, limit).then(results => {
        console.log(results)

        let output = `<div class="container absolute left-0 w-full min-h-screen bg-gradient-to-br  to-slate-200 p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`
        results.forEach(post => {
            let image = post.preview
                ? post.preview.images[0].source.url
                : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output += `<div class="bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-lg overflow-hidden">
                <img class="w-full h-40 object-cover"
                    src="${image}"
                    alt="Card image cap" />
                <div class="p-5 space-y-4">
                    <h5 class="text-lg font-semibold text-gray-800">${post.title}</h5>
                    <p class="text-gray-600">${truncateString(post.selftext, 100)}</p>
                    <p class="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <a href="${post.url}" target="_blank"
                    class="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition">Read
                    More</a>
                    <hr class="border-gray-300" />
                    <div class="flex justify-between text-sm">
                    <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Subreddit: ${post.subreddit}</span>
                    <span class="bg-green-100 text-green-600 px-2 py-1 rounded-full">Score: ${post.score}</span>
                    </div>
                </div>
                </div>`
        })



        output += `</div>
        </div>`
        document.querySelector(".result").innerHTML = output
    })

})


function showAlertMessage(message, className) {
    console.log("alert message")
    const div = document.createElement("div");
    if (className == "alert-danger") {
        div.className = `alert bg-red-400 w-[40rem] text-white text-center mb-5 rounded-xl p-[1.3rem] border border-1 border-red-700s`
    }
    div.appendChild(document.createTextNode(message))
    const searchContainer = document.querySelector(".search-container");
    const search = document.querySelector(".search");
    searchContainer.insertBefore(div, search);

    // setting a timeout
    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 2000)
}

// Truncate String Function
function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
  }