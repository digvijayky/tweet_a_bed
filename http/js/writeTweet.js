function writeTweet(beds) {
    $.ajax({
        url: 'php/write_tweet.php?beds=' + beds,
        type: 'GET',

        success: console.log,
        error: console.log
    })
}
