import SlimSelect from 'slim-select'
const baseurl = 'https://api.thecatapi.com/v1';
const apikey =
  'live_KqGIRLUcJvPUmEmnCUWMZij2nNX7qMLyZvZu2jpW3hlCa55yGptbAGwJa3NPsKGJ';
const breed = document.querySelector('.breed-select');
const cat = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function fetchBreeds() {
  return fetch(`${baseurl}/breeds?api_key=${apikey}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
fetchBreeds()
  .then(data => {breed.insertAdjacentHTML('beforeend', create(data))
        breed.hidden = false;
        loader.style.display = 'none';
        new SlimSelect({
            select: '.breed-select'
          })
          
        })
  .catch(err => {console.log(err)
        loader.hidden = true;
        error.hidden = false;
        });

function create(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${baseurl}/images/search?breed_ids=${breedId}&api_key=${apikey}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
breed.addEventListener('change', () => {
    cat.style.display = 'none';
    loader.style.display = 'block';
    error.hidden = true;
  const selectedId = breed.value;
  fetchCatByBreed(selectedId)
    .then(data => {cat.innerHTML = createMarkput(data)
        loader.style.display = 'none';
        cat.style.display = 'flex';
    })
    .catch(err => {console.log(err)
        loader.hidden = true;
        error.hidden = false;
    });
});

function createMarkput(arr) {
  return `<img src="${arr[0].url}" alt="">
  <div class="div">
    <h1>${arr[0].breeds[0].name}</h1>
    <p>${arr[0].breeds[0].description}</p>
    <p>${arr[0].breeds[0].temperament}</p>
  </div>`;
}
