<?php
    require_once 'twitteroauth/autoload.php';
    use Abraham\TwitterOAuth\TwitterOAuth;

    ob_start();
    session_start();

    $config = require_once 'config.php';
    $token = $_SESSION['token'];

    $connection = new TwitterOAuth(
        $config['consumer_key'],
        $config['consumer_secret'],
        $token['oauth_token'],
        $token['oauth_token_secret']
    );

    // request user token
    $result = $connection->get(
        'account/verify_credentials', [
            'skip_status' => 'true'
        ]
    );

    echo $result;
?>
