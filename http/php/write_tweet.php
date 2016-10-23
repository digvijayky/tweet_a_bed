<?php
    require_once 'twitteroauth/autoload.php';
    use Abraham\TwitterOAuth\TwitterOAuth;

    ob_start();
    session_start();

    $beds = filter_input(INPUT_GET, 'beds');

    $config = require_once 'config.php';
    $token = $_SESSION['token'];

    $twitter = new TwitterOAuth(
        $config['consumer_key'],
        $config['consumer_secret'],
        $token['oauth_token'],
        $token['oauth_token_secret']
    );

    list($stamp, $_) = explode(' ', microtime());

    $status = $twitter->post("statuses/update",["status"=>$stamp."/".$beds]);
    echo ($status);
?>
