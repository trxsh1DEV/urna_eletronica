const qs = (el) => document.querySelector(el);

// Variaveis de ambiente
let yourVote = qs('.d-1-1 span');
let role = qs('.d-1-2 span');
let description = qs('.d-1-4');
let $alert = qs('.d-2');
let horinzontal = qs('.d-1-right');
let numbersCandidate = qs('.d-1-3');

let stageCurrent = 0;
let inputVote = '';
let voteBlank = false;
let votes = [];

let votosLinux1 = 0;

function startVote(){
    let stage = stages[stageCurrent];
    voteBlank = false;
    let numbHTML = '';

    for(let i = 0; i < stage.numbers; i++){
        if(i === 0){
            numbHTML += `<div class="number pisc" style="margin-right: 5px"></div>`
        } else {
            numbHTML += `<div class="number" style="margin-right: 5px"></div>`
        }
    }

    yourVote.style.display = 'none';
    role.innerHTML = stage.title;
    description.innerHTML = '';
    $alert.style.display = 'none';
    horinzontal.innerHTML = '';
    numbersCandidate.innerHTML = numbHTML;
};
function attInterface(){ 
    let stage = stages[stageCurrent];
    let candidate = stage.candidates.filter((candidates) => {
        if(candidates.number == inputVote) return true;
    });

    // Achei um candidato?
    if(candidate.length > 0){
        candidate = candidate[0];
        yourVote.style.display = 'block';
        $alert.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name} <br> Partido: ${candidate.politicalParty}`
        let photosHTML = '';

        for(let i in candidate.photos){
            if(candidate.photos[i].small) {
                photosHTML += `<div class="d-1-image small"><img src="./assets/images/${candidate.photos[i].url}" alt="candidate">${candidate.photos[i].legend}</div>`;
            } else {
                photosHTML += `<div class="d-1-image"><img src="./assets/images/${candidate.photos[i].url}" alt="candidate">${candidate.photos[i].legend}</div>`;
            }
        }

        horinzontal.innerHTML = photosHTML;
    } else {
        yourVote.style.display = 'block';
        $alert.style.display = 'block';
        description.innerHTML = '<div class="alert-bigger pisc">NULL VOTE</div>';
    }
}

function clicou(n){
    let elNumber = document.querySelector('.number.pisc');
    if(elNumber !== null){
        elNumber.innerText = n;
        inputVote += `${n}`;

        elNumber.classList.remove('pisc');
        if(elNumber.nextElementSibling !== null){
            elNumber.nextElementSibling.classList.add('pisc');
        } else{
            attInterface();
        }
    }
};
function blank(){
    inputVote = ''
    voteBlank = true;
    yourVote.style.display = 'block';
    $alert.style.display = 'block';
    numbersCandidate.innerHTML = '';
    description.innerHTML = '<div class="alert-bigger pisc">BLANK VOTE</div>';
    horinzontal.innerHTML = '';
};

function correcting(){
    inputVote = '';
    startVote();
};

function confirmSend(){
    let stage = stages[stageCurrent]; //Pegando qtde de numeros de acordo cm o cargo q será votado

    let voteConfirmed = false;

    if(voteBlank){
        voteConfirmed = true;
        votes.push({
            stage: stages[stageCurrent].title,
            vote: 'blank'
        });
    }
     else if(inputVote.length === stage.numbers) {
        voteConfirmed = true;
        votes.push({
            stage: stages[stageCurrent].title,
            vote: inputVote
        });
    };

    // Get votes
    if(voteConfirmed){
        stageCurrent++;
        if(stages[stageCurrent]){
            startVote();
            inputVote = '';
        } else{
            qs('.display').innerHTML = '<div class="alert-giant pisc">END</div>'
        }
    };
let vice = 0
    votes.map(val => {
        if(val.vote == "77222" && votosLinux1 < 1){
            votosLinux1++;
        } else if(val.vote == "99"){
            vice++;
        }
    })
}

startVote();