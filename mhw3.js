function ApriBiscotto()
{
  const image = document.querySelector('#fortuna'); //cambiare l-immagine
  image.src = 'biscottoaperto.png';
  image.removeEventListener('click', ApriBiscotto);
//API che genera frasi motivazionali
  fetch("https://api.adviceslip.com/advice").then(onResponse_Biscotto).then(Json_Biscotto);
}

function onResponse_Biscotto(response){
  return response.json();
}
const image = document.querySelector('#fortuna');
image.addEventListener('click', ApriBiscotto);

function Json_Biscotto(json){
  console.log(json);

  const motto = document.createElement("p");
  motto.textContent=json.slip.advice;

  const contenitore_biscotto = document.querySelector("#biscotto");
  contenitore_biscotto.appendChild(motto);
  

}

//sezione Libri

function CercaLibro(event){
  event.preventDefault(); // Impedisci il submit del form
  const  titolo_input = document.querySelector('#libreria');
  const titolo_value = encodeURIComponent(titolo_input.value); 
  rest_url = 'http://openlibrary.org/search.json?title='+titolo_value;
  console.log('URL: ' + rest_url);
  fetch(rest_url).then(onResponse).then(Json_libri);
}


function onResponse(response){
  return response.json();
}



function Json_libri(json){
  console.log(json); 
  const library = document.querySelector('#sezione_libri');
  library.innerHTML = '';
  let num_results = json.num_found;
  if(num_results > 6){
    num_results = 6;
  }
  for(let i=0; i<num_results; i++)
  {
    const new_div = document.createElement('div');
    library.appendChild(new_div);
    const doc = json.docs[i]
    const titolo = doc.title;
    
    const h2 = document.createElement('h2');
    h2.textContent=titolo;
    new_div.appendChild(h2);
    const cover = document.createElement('img');
    const isbn = json.docs[i].isbn[0];

    cover.src='http://covers.openlibrary.org/b/isbn/'+isbn+'-S.jpg';
    new_div.appendChild(cover);
  }
}
  // Aggiungi event listener al form
 
 const form2 = document.querySelector('#libri');
  form2.addEventListener('submit', CercaLibro);
