const baseurl = 'https://api.thecatapi.com/v1';
const apikey =
  'live_KqGIRLUcJvPUmEmnCUWMZij2nNX7qMLyZvZu2jpW3hlCa55yGptbAGwJa3NPsKGJ';

export function fetchBreeds() {
    return fetch(`${baseurl}/breeds?api_key=${apikey}`).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
  
      return resp.json();
    });
  }

  export function fetchCatByBreed(breedId) {
    return fetch(
      `${baseurl}/images/search?breed_ids=${breedId}&api_key=${apikey}`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
  
      return resp.json();
    });
  }