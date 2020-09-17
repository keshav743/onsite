var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = [ 'top' , 'down' , 'left' , 'right'];
var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var resultTxt = document.querySelector('.result-txt');
var img = document.querySelector('img');
var imgDiv = document.querySelector('.img-div');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    var command = event.results[0][0].transcript;
    resultTxt.textContent = 'Result received: ' + command + '.';
    if(command == 'top'){
        imgDiv.style.paddingTop = "0rem";
        setInterval(function(){imgDiv.style.paddingTop = "7rem";},1500);
    }else if(command == 'down'){
        imgDiv.style.paddingTop = "14rem";
        setInterval(function(){imgDiv.style.paddingTop = "7rem";},1500);
    }else if(command == 'left'){
        imgDiv.style.textAlign = "left";
        setInterval(function(){imgDiv.style.textAlign = "center";},1500);
    }else if(command == 'right'){
        imgDiv.style.textAlign = "right";
        setInterval(function(){imgDiv.style.textAlign = "center";},1500);
    }else{
        resultTxt.textContent = 'Result received: ' + command + ' - No Command Found.';
    }
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function(err) {
    resultTxt.textContent = 'I didnt recognise that command.';
}

recognition.onerror = function(result) {
    resultTxt.textContent = 'Error occurred in recognition: ' + result.error;
}