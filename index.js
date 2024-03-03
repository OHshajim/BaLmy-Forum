async function PostDetails() {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);
    allPosts(posts)
}



function allPosts(posts) {
    const postContainer = document.getElementById('post-container');
    for (const post of posts) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-side bg-[#F3F3F5] shadow-xl mb-10 p-5">

           <div class="avatar online w-24 h-24" id="${post.id}">
            <div class=" rounded-full">
              <img src="${post.image}" />
            </div>
           </div>
      
             <div class="card-body">
                <div class="flex gap-5">
                <h4>#${post.category}</h4>
                <h4>Author : ${post.author.name}</h4>
                </div>
                <h2 class="card-title text-xl font-bold">${post.title}</h2>
                <p class="text-[#12132D99] inter text-base border-b-2 border-dashed pb-4">${post.description}</p>

                <div class="flex  items-center justify-between mt-4">

                 <div class="flex items-center gap-5">
                     <div class="flex items-center gap-2">
                        <img src="./images/icon/massage.png" alt="massage">
                         <p>${post.comment_count}</P>
                     </div>
                     <div class="flex items-center gap-2">
                         <img src="./images/icon/seen.png" alt="view">
                         <p>${post.view_count}</P>
                     </div>
                     <div class="flex items-center gap-2">
                        <img src="./images/icon/watch.png" alt="time">
                        <p>${post.posted_time} min</P>
                     </div>
                </div>
                <div class="card-actions justify-end">
                    <button onclick="inbox(${post, post.title, post.view_count})">
                       <img src="./images/icon/letter.png" alt="inbox">
                    </button>
                </div>
                </div>
                </div>
        </div>
        `;


        postContainer.appendChild(div);

        isActive(post.isActive, post.id);
        // inbox(post, post.title, post.view_count)

    }
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
function inbox(post, title, view) {

    const selectedCardContainer = document.getElementById('selected-card');
    // console.log(title,view ,time );
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between items-center gap-4 bg-white m-5 p-4 rounded-2xl ">
    <h3 class="font-semibold text-base ">${title}</h3>
    <div class="flex gap-2 text-[#12132D99]">
    <img src="./images/icon/seen.png" alt="view">
    <p>${view}</p>
    </div>
    </div>
    `
    selectedCardContainer.appendChild(div)
    const countPlus = document.getElementById("countPlus");
    countPlus.innerText = count;
    count++
}


PostDetails();
