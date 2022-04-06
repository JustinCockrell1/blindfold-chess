const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const speechBtnDiv = document.querySelector("#speech-btn");
const micBtn = document.querySelector(".btn .fas");
const instruction = document.querySelector(".instruction");

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const speechSynthesis = window.speechSynthesis;
const recognition = new speechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const colors = [ 'Knight' , 'E4' , 'A4', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

speechRecognitionList.addFromString(grammar,1);
recognition.grammars = speechRecognitionList;
recognition.maxAlternatives = 10;


if (speechRecognition && speechSynthesis) {
    // console.log("Speech recognition and synthesis supported");


    // micBtn.addEventListener("click",micBtnClicked);
    // function micBtnClicked(e) {
    //     e.preventDefault();
    //     if(micBtn.classList.contains("fa-microphone")) {
    //         recognition.start();
    //     } else {
    //         recognition.stop();
    //     }
    // }

    //Start speech recognition
    recognition.addEventListener("start",()=>{
        //alert("starting");
        // micBtn.classList.replace("fa-microphone", "fa-microphone-slash");
        // instruction.textContent="Recording... Press Ctrl + M to stop";
        // searchInput.focus();
        // console.log("Speech Recognition Started");
    });

        //Stop speech recognition
    recognition.addEventListener("end",()=>{
        // micBtn.classList.replace("fa-microphone-slash", "fa-microphone");
        // instruction.textContent="Press Ctrl + X or Click the Mic icon to start";
        // instruction.focus();
        // console.log("Speech Recognition Ended");
        recognition.start();
    });

    recognition.continuous = true; //Makes it so it keeps listening
    // const recognitionOn = setInterval(()=>{
    //     if(instruction.textContent.includes("start")) {
    //         recognition.start();
    //     }
    // },3000);

    //Add keyboard Event Listener
    recognition.start();
    // speechRecognitionKeys();
    loadTranscript();
}
else {
    alert("not supported");
    console.log("Speech recognition and synthesis not supported");
    speechBtnDiv.style.visibility = "hidden";
}

//Speech recognition shortcuts function
function speechRecognitionKeys() {
    document.addEventListener("keydown",(e)=>{
        e.preventDefault();
        if(e.ctrlKey && e.key==='x'){
            recognition.start();
        }
        if(e.ctrlKey && e.key==='m'){
            recognition.stop();
        }
    });
}

//A lot of stuff in this function is pretty bad

//Load Transcript
function loadTranscript(){
    recognition.addEventListener("result", (e)=>{
        // console.log(e);
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;


        determineCorrectMove(e.results[current]);

        //console.log(e.results[current][index]);


        showTranscript(transcript);

        //loop through list array data.js
        for(let i = 0; i < lists.length; i++){
            let askedQuestion = transcript.toLowerCase().trim();
            if(askedQuestion.includes(lists[i].question))
            {
                return respond(lists[i].answer)
            }
            if(askedQuestion.startsWith("what is", 0) && askedQuestion!==lists[i].question && i==1){
                let errorMsg = "Apologies, I do not have enough data to answer this question at this time";
                respond(errorMsg);
                break;
            }
        }
        
    });

}

//Determine the correct response from the alternate responses
function determineCorrectMove(responses) {
        console.log(responses);
        let index = 0;
        possibleMoves = [];
        for(let i = 0; i < responses.length; i++){
            response = responses[i].transcript.trim().replace("be","b").split(" ");
            if(response.length==3) {
            if(squares.includes(response[2].toLowerCase())) {
            console.log("response: " + response);
            index = i;
            possibleMoves.push(response);
            }
            }
            else if(response.length==4) {
                if(squares.includes((response[2].substr(0,1)+response[3]).toLowerCase())) {
                response[2] = (response[2].substr(0,1)+response[3]).toLowerCase();
                response.splice(3,1);
                possibleMoves.push(response);
                }
            }
  
        }
        console.log(possibleMoves);
        console.log(getResponse(possibleMoves[0]));
        //Make move on the board
        move = getMoveFromString(getResponse(possibleMoves[0]));
        makeMove(move);
}

function getResponse(phrase) {
    console.log(phrase);
    if(phrase[0]=="") {
        phrase = phrase.slice(1,phrase.length);
    }
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i].name.includes(phrase[0].toLowerCase())) {
            phrase[0]=pieces[i].symbol;
            phrase[1]="";
            break;
        }
    }
    return phrase.join("").toLowerCase();
}


function respond(transcript) {
    let voices = window.speechSynthesis.getVoices();
    // console.log(voices);
    
    const speech = new SpeechSynthesisUtterance();
    
    speech.lang="en-US";
    speech.text = transcript;
    speech.volume = "2";
    speech.rate = "0.9";
    speech.pitch = "1";

    if(voices) {
        speech.voice = voices[4];
    }
    else {
        speech.voice = voices[1];
    }

    window.speechSynthesis.speak(speech);
}


//Show Transcript
function showTranscript(transcript) {
    // if(transcript.toLowerCase().trim() === "stop recording")
    // {
    //     recognition.stop();
    // }
    // else if(!searchInput.value) {
    //     searchInput.value=transcript;
    // }
    // else {
    //     if(transcript.toLowerCase().trim()==="search") {
    //         searchForm.submit();
    //     }
    //     else if(transcript.toLowerCase().trim()==="reset form") {
    //         searchInput.value = "";
    //     } else {
    //         searchInput.value=transcript;
    //     }
    // }
}