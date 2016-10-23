<?php
    require_once 'twitteroauth/autoload.php';
    use Abraham\TwitterOAuth\TwitterOAuth;

    ob_start();
    session_start();

    $config = require_once 'config.php';
    $token = $_SESSION['token'];

    $twitter = new TwitterOAuth(
        $config['consumer_key'],
        $config['consumer_secret'],
        $token['oauth_token'],
        $token['oauth_token_secret']
    );

    $status = $twitter->get("lists/members",["slug"=>"tab-locations","owner_screen_name"=>"tweetabed"]);
    print_r($status);
?>
