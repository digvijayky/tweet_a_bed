window.addEventListener("load", () => {
    document.getElementById('increment').onclick = increment;
    document.getElementById('decrement').onclick = decrement;
});

function increment() {
    var thisShelter = shelters[thisShelterIndex];
    thisShelter.currentBeds = Number(thisShelter.currentBeds) + 1;
    updateBedNumber();
}

function decrement() {
    var thisShelter = shelters[thisShelterIndex];
    thisShelter.currentBeds = Math.max(0,thisShelter.currentBeds-1);
    updateBedNumber();
}

function updateBedNumber() {
    document.getElementById('numBeds').innerHTML = shelters[thisShelterIndex].currentBeds;
}

function redraw() {
    var counter = shelters.length - 1;
    console.log("Querying all available beds...")
    shelters.forEach(shelter=>{
        if (shelter == shelters[thisShelterIndex]) return;
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
                if (counter == 0) performRedraw();
            },
            error: data => {
                console.log("Error retrieving tweets on: " + shelter.name);
                console.log(data);
                counter--;
                console.log("Shelter Query Counter: " + counter);
                if (counter == 0) performRedraw();
            }
        })
    });
}

function performRedraw() {
    document.getElementById('mapwrapper').innerHTML = "<div id='map' class='map'></div>";
    document.getElementById('listings').innerHTML = "";
    draw();
}
