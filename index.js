async function PostDetails() {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);
    allPosts(posts)
}



function allPosts(posts) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ""

    for (const post of posts) {
        let title = post.title.replace("'","@")
        const div = document.createElement('div');
        div.innerHTML = " "
        div.innerHTML = `
        <div class="card card-side bg-[#F3F3F5] shadow-xl mb-10 p-5">

           <div class="avatar online lg:w-24 w-14 h-14 lg:h-24" id="${post.id}">
            <div class=" rounded-full">
              <img src="${post.image}" />
            </div>
           </div>
      
             <div class="card-body">
                <div class="flex flex-col xl:flex-row gap-5">
                <h4>#${post.category}</h4>
                <h4>Author : ${post.author.name}</h4>
                </div>
                <h2 class="card-title text-xl font-bold">${post.title}</h2>
                <p class="text-[#12132D99] inter text-base border-b-2 border-dashed pb-4">${post.description}</p>

                <div class="flex flex-col xl:flex-row items-center justify-between mt-4 space-y-10">

                 <div class="flex items-center gap-5">
                     <div class="flex flex-col xl:flex-row items-center gap-2">
                        <img src="./images/icon/massage.png" alt="massage">
                         <p>${post.comment_count}</P>
                     </div>
                     <div class="flex flex-col xl:flex-row items-center gap-2">
                         <img src="./images/icon/seen.png" alt="view">
                         <p>${post.view_count}</P>
                     </div>
                     <div class="flex flex-col xl:flex-row items-center gap-2">
                        <img src="./images/icon/watch.png" alt="time">
                        <p>${post.posted_time} min</P>
                     </div>
                </div>
                <div class="card-actions justify-end">
                    <button onclick="inbox( '${title}', ${post.view_count})">
                       <img src="./images/icon/letter.png" alt="inbox">
                    </button>
                </div>
                </div>
                </div>
        </div>
        `;

        postContainer.appendChild(div);
        
        isActive(post.isActive, post.id);
    }
    Loader(false,postContainer)
};

// check the author is active or not
function isActive(value, id) {
    const Status = document.getElementById(id);

    if (value) {
        Status.classList.add("online");
        Status.classList.remove("offline");
    }
    else {
        Status.classList.remove("online");
        Status.classList.add("offline");
    }
}

// click to inbox
let count = 1;
function inbox(title, view) {

    const selectedCardContainer = document.getElementById('selected-card');
    console.log(title, view);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between items-center gap-4 bg-white mt-5 p-4 rounded-2xl ">
    <h3 class="font-bold text-base text-wrap">${title.replace("@","'")}</h3>
    <div class="flex flex-col sm:flex-row gap-2 text-[#12132D99]">
    <img src="./images/icon/seen.png" alt="view">
    <p>${view}</p>
    </div>
    </div>
    `
    selectedCardContainer.appendChild(div)
    const countPlus = document.getElementById("countPlus");
    countPlus.innerText = count;
    count++;
}

// search part 

search = async () => {
    Loader(true);
    const input = document.getElementById("input-Field");
    const search = input.value;

    const res = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
    const data = await res.json()
    const posts = data.posts;
    console.log(data.posts);
    console.log(search);
    setTimeout(allPosts,2000,posts)

}

// latest post 
const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    console.log(data);
    latestPostDisplay(data)
}
const latestPostDisplay = (posts) => {
    const postContainer = document.getElementById('latestPostContainer');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  p-7 border border-[#12132D26] rounded-3xl mulish ">
        <figure><img src="${post.cover_image}" alt="cover" class="rounded-3xl" /></figure>
         <div class="space-y-3">
          <div class="flex items-center gap-3 mt-3">
            <img src="./images/icon/vedio.png" alt="icon">
            <p>${post.author.posted_date ? post.author.posted_date : 'No publish date'}</p>
          </div>
          <h2 class="font-extrabold text-xl  ">${post.title}</h2>
          <p class="text-[#12132D99] ">${post.description}</p>

          <div class="flex gap-4 items-center mt-3">
              <div class="avatar">
              <div class="w-12 rounded-full">
                  <img src="${post.profile_image}" />
              </div>
              </div>
                <div class="space-y-1">
                <h2 class="text-[#12132D] font-bold ">${post.author.name}</h2> 
                <p class="text-[#12132D99] text-[14px] ">${post.author.designation ? post.author.designation : 'Unknown'}</p>
                </div>
          </div>
         </div>
        </div>
        `;
        postContainer.appendChild(div);
    });
}

// loading

function Loader (value) {
    const loading = document.getElementById('loading');
    if(value){

        loading.classList.remove('hidden')
        loading.classList.add('flex')

    }
    else{
        loading.classList.remove('flex')
        loading.classList.add('hidden')
    }
};

// call function
PostDetails();
latestPost()
