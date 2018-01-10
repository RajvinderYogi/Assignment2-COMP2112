console.log('ho');

// AJAX
//using fetch/then.catch
function getInfo() {
    fetch('data.json')
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
}
//using async/await/fetch
// async function getInfo(){
//     var response = await fetch('./responses.json');
//     response = response.json();
//     console.log(response);
// }


// END OF AJAX
getInfo();


// embedded map using mapbox        
function initMap() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoid2Vic29sdXRlLXRlY2giLCJhIjoiY2phd2tpOGRqMG5tcDM3bzEwdW55anE5bSJ9.sPGBdwhnc7uSpIir3JlSRA';
    var geolocate = document.getElementById('geolocate');
    var map = L.mapbox.map('map', 'mapbox.streets');

    var myLayer = L.mapbox.featureLayer().addTo(map);

    if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
    } else {
        geolocate.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            map.locate();
        };
    }

    // Once we've got a position, zoom and center the map
    // on it, and add a single marker.
    map.on('locationfound', function (e) {
        map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Located!',
                'marker-color': '#0000ff',
                'marker-symbol': 'star'
            }
        });

        // And hide the geolocation button
        geolocate.parentNode.removeChild(geolocate);
    });

    // If the user chooses not to allow their location
    // to be shared, display an error message.
    map.on('locationerror', function () {
        geolocate.innerHTML = 'Position could not be found';
    });
}

//speech synthesis API to read the text on screen
var raj = new SpeechSynthesisUtterance();
var synthesis = speechSynthesis;
raj.text = document.querySelector('h1').textContent;
speechSynthesis.lang = "en-US"
speechSynthesis.speak(raj);

// Speech recognition API to recognize what is said
window.SpeechRecognition =
    window.SpeechRecognition || window.SpeechRecognition;

var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US"
recognition.addEventListener("end", recognition.start);
recognition.start(); //start new instance

recognition.addEventListener("result", event => {
    var whatIsSaid = event.results[0][0].transcript;
    console.log(whatIsSaid);//display in console what is listened by recognition

    //used switch statement to answer the questions
    switch (whatIsSaid) {
        case ("who is Raj"):
            var sayIt = new SpeechSynthesisUtterance("Raj is the one reason, that I am talking to you.");
            synthesis.speak(sayIt);
            break;
        case ("who is pankaj"):
            var sayIt = new SpeechSynthesisUtterance("He developed my code so i can assist you.");
            synthesis.speak(sayIt);
            break;
        case ("how are you"):
            var sayIt = new SpeechSynthesisUtterance("I am good. How are you doing?");
            synthesis.speak(sayIt);
            break;
        case ("who are you"):
            var sayIt = new SpeechSynthesisUtterance("My name is Mike, and i am your new assistant.");
            synthesis.speak(sayIt);
            break;
        case ("how many languages can you speak"):
            var sayIt = new SpeechSynthesisUtterance("Actually, i don't know yet. I would ask Raj or Pankaj and let you know.");
            synthesis.speak(sayIt);
            break;
        case ("I am mad at you"):
            var sayIt = new SpeechSynthesisUtterance("I am sorry, if I did something wrong.");
            synthesis.speak(sayIt);
            break;
        case ("bye"):
            var sayIt = new SpeechSynthesisUtterance("See ya Later! Have a wonderful day");
            synthesis.speak(sayIt);
            break;
        case ("open maps"):
            initMap();
            break;
        case ('locate me'):
            document.getElementById('geolocate').click();
            break;
    }

});