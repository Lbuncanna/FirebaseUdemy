
 var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
 var NOMES = ["Anderson","Beatriz","Fabiana","Everton","teste"];
 var cards = [];
 var ref=firebase.database().ref('card/');

function criarcard(){

  var card = {
    nome: NOMES[Math.floor(Math.random()* NOMES.length-1)],
    idade: Math.floor(Math.random()* 22 + 18),
    curtidas: 0

  };

  

  ref.push(card)
      .then(snapshot =>{ 
      adicionarCardATela(card, snapshot.key);

    });


};

function deletar(id) {
  console.log(id)
  //ref.child(id).remove().then(()=>{
    //var card = document.getElementById(id);
   // card.remove();
  //})  
};

function curtir(id){
console.log(id)
};

function descurtir(id){
console.log(id)
};

document.addEventListener("DOMContentLoaded", function(){
  ref.once('value').then(snapshot=>{
    console.log('child', snapshot.child('-LcDAqjLK9xRAHRHyRXr'))

    console.log('exists()', snapshot.exists())

    console.log('hasChild() comentarios', snapshot.hasChild('-LcDAqjLK9xRAHRHyRXr/comentarios'))

    console.log('hasChildren', snapshot.child('-LcDAqjLK9xRAHRHyRXr').hasChildren())

    console.log('numChildren()', snapshot.numChildren())

    console.log("chave: ", snapshot.key)
    snapshot.forEach(value =>{
      console.log('chave. ', value.key)
      adicionarCardATela(value.val(), value.key);
    });
  });
});

function adicionarCardATela(informacao) {
  console.log(informacao.id)
  
  
  let header = document.createElement("h2");
  header.innerText = informacao.nome;
  header.classList.add('card-title');

  let content = document.createElement("p")
  content.classList.add('Card-Text');
  content.innerText = informacao.idade + "anos."

  let inner = document.createElement("div");
  inner.classList.add('row');

  let button_add = document.createElement("button");
  button_add.classList.add('btn', 'btn-link', 'col-3');
  button_add.setAttribute('onclick', "curtir("+ informacao.id + ")");
  button_add.innerText = '+'; 
  inner.appendChild(button_add);

 let counter = document.createElement("span");
 counter.innerHTML = informacao.curtidas;
 counter.classList.add("col-3", "text-center")

  let button_sub= document.createElement("button");
  button_sub.classList.add('btn', 'btn-link', 'col-3');
  button_sub.setAttribute('onclick', "descurtir("+informacao.id + ")");
  button_sub.innerText = '-'; 
  inner.appendChild(button_sub);

  let button_del= document.createElement("button");
  button_del.classList.add('btn', 'btn-link', 'col-3');
  button_del.setAttribute('onclick', "deletar("+informacao.id + ")");
  button_del.innerText = 'x'; 
  inner.appendChild(button_del);

  let card = document.createElement("div");
  card.classList.add('card');
  card.id = informacao.id;
  let card_body = document.createElement("div");
  card_body.classList.add('card-body');

  card_body.appendChild(header);
  card_body.appendChild(content);
  card_body.appendChild(inner);
  

  CARD_CONTAINER.appendChild(card_body);

};


