window.addEventListener("load", viewModelInit);

var asyncCounter = 0;

function viewModelInit() {
    getShelters();
}

function getShelters() {
    console.log("Querying shelters...")
    $.ajax({
        url: 'php/get_shelters.php',
        type: 'GET',

        success: (data) => {
            console.log("Received shelter data");
            parseShelters(JSON.parse(data))
        },
        error: console.log
    });
}

function parseShelters(jsonData) {
    var counter = jsonData.users.length;
    console.log("GeoCounter Starting Size: " + counter);
    jsonData.users.forEach(user=>{
        var shelter = new Shelter();
        shelter.name = user.name;
        shelter.screen_name = user.screen_name;
        getGeoCoord(user.location, (geoData) => {
            shelter.geo.address = geoData[0].display_name;
            shelter.geo.lat = geoData[0].lat;
            shelter.geo.lon = geoData[0].lon;
            shelters.push(shelter);
            counter--;
            console.log("GeoCounter: " + counter);
            if (counter == 0) getThisShelter();
        });
    })
}

function getGeoCoord(address, callback) {
    $.ajax({
        url: 'http://nominatim.openstreetmap.org/search/' + address + '?format=json',
        type: 'GET',

        success: (data) => {
            callback(data);
        },
        error: console.log
    });
}

function getThisShelter() {
    console.log("Querying this shelter...")
    $.ajax({
        url: 'php/get_this_shelter.php',
        type: 'GET',

        success: (data) => {
            console.log("Received this shelter's info");
            data = JSON.parse(data);
            thisShelterIndex = shelters.findIndex(x=>x.name==data.name);
            getSelfBeds()
        },
        error: console.log
    })
}

function getSelfBeds() {
    console.log("Retrieving available beds for this shelter...")
    $.ajax({
        url: 'php/get_available_beds.php?name=' + thisShelterName,
        type: 'GET',

        success: data => {
            try {
                data = JSON.parse(data)[0].text.substring(11);
                shelters[thisShelterIndex].currentBeds = data;
                console.log("Retrieved number of beds");
            } catch(e) {
                console.log("Failed to retrieve, writing first tweet...")
                writeTweet(0);
            }
            getAvailableBeds()
        },
        error: console.log
    })
}

function getAvailableBeds() {
    var counter = shelters.length;
    console.log("Querying all available beds...")
    shelters.forEach(shelter=>{
        $.ajax({
            url: 'php/get_available_beds.php?name=' + shelter.screen_name,
            type: 'GET',

            success: data => {
                try{
                    data = JSON.parse(data)[0].text.substring(11);
                    shelter.currentBeds = data;
                } catch (e) {
                    console.log("Error retrieving tweets on: " + shelter.name);
                    console.log(e);
                }
                counter--;
                console.log("Shelter Query Counter: " + counter);
                if (counter == 0) {
                    draw();
                    startTimer();
                }
            },
            error: data => {
                console.log("Error retrieving tweets on: " + shelter.name);
                console.log(data);
                counter--;
                console.log("Shelter Query Counter: " + counter);
                if (counter == 0) {
                    draw();
                    startTimer();
                }
            }
        })
    });
}
