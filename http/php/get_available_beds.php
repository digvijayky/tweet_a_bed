<?php
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

    require_once 'twitteroauth/autoload.php';
    use Abraham\TwitterOAuth\TwitterOAuth;

    ob_start();
    session_start();

    $screenname = filter_input(INPUT_GET, 'name');

    $config = require_once 'config.php';
    $token = $_SESSION['token'];

    $twitter = new TwitterOAuth(
        $config['consumer_key'],
        $config['consumer_secret'],
        $token['oauth_token'],
        $token['oauth_token_secret']
    );

    $status = $twitter->get("statuses/user_timeline",["screen_name"=>$screenname,"count"=>"1"]);
    echo ($status);
?>
