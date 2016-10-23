function startTimer() {
    setTimeout(timedEvent, 15000);
}

function timedEvent() {
    updateTweet(shelters[thisShelterIndex].currentBeds);
}

function updateTweet(beds) {
    $.ajax({
        url: 'php/write_tweet.php?beds=' + beds,
        type: 'GET',

        success: (data) => {
            console.log("success:"+data);
            redraw();
            setTimeout(timedEvent, 15000);
        },
        error: data => console.log("!!!" + data)
    })
}
