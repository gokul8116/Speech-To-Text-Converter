window.onload = function () {
    var i = 0;
    var playButton = document.getElementById("playButton");
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');

    playButton.onclick = function () {
        if (i === 0) {
            playButton.src = "img/record-button-thumb.png"; // Image shown while recording
            recognition.start();
            i = 1;
        } else {
            playButton.src = "img/mic-1.png"; // Default mic image
            recognition.stop();
            i = 0;
        }
    }

    recognition.onresult = function (event) {
        var results = event.results;
        var transcript = '';
        for (var j = 0; j < results.length; j++) {
            transcript += results[j][0].transcript;
        }
        diagnostic.value = transcript;
        console.log('Confidence: ' + results[0][0].confidence);
    }

    recognition.onnomatch = function (event) {
        diagnostic.value = 'I didn’t recognize that.';
    }

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    }
};
