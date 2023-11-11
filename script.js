// API KEY
const apiKey = 'qd7Cav8J8VEcCyevi0Qpg4lpWH0vsSLVgtAwMdf-TSE';

// HTML ELEMENTS ACCESS
const formEl = document.getElementById('formEl');
const searchEl = document.getElementById('searchEl');
const searchBtn = document.getElementById('searchBtn');
const parentDiv = document.getElementById('parentDiv');
const showMore = document.getElementById('showMore');

// PAGE RESET
let inputData = "";
let page = 1;

async function searchImage() {
    inputData = searchEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const result = data.results;


    if (page === 1) {
        parentDiv.innerHTML = "";
    }

    result.map((results) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('bg-slate-200', 'rounded-xl', 'h-72', 'w-full', 'sm:max-w-xs', 'sm:mx-auto', 'md:w-full', 'overflow-y-hidden');
        const image = document.createElement('img');
        image.classList.add('w-full', 'h-4/5', 'rounded-t-lg', 'object-cover', 'object-top');
        image.src = results.urls.small;
        image.alt = results.alt_description;
        const text = document.createElement('p');
        text.classList.add('w-full', 'h-full', 'pl-3', 'text-lg', 'font-serif', 'text-slate-700', 'tracking-widest');
        text.textContent = results.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(text);
        parentDiv.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.classList.remove('hidden');
    };
};

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener('click', () => {
    searchImage();
});