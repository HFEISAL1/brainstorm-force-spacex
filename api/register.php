<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'bootstrapper.php';
require __DIR__ . '/Src/JWTHandler.php';

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :

    $returnData = msg(0, 404, 'Page Not Found!');

elseif (
    !isset($data->firstName)
    || !isset($data->lastName)
    || !isset($data->email)
    || !isset($data->password)
    || empty(trim($data->firstName))
    || empty(trim($data->lastName))
    || empty(trim($data->email))
    || empty(trim($data->password))
) :

    $fields = ['fields' => ['firstName', 'lastName','email', 'password']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :

    $first_name = trim($data->firstName);
    $last_name = trim($data->lastName);
    $email = trim($data->email);
    $password = trim($data->password);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 422, 'Invalid Email Address!');

    elseif (strlen($password) < 8) :
        $returnData = msg(0, 422, 'Your password must be at least 8 characters long!');

    elseif (strlen($first_name) < 3) :
        $returnData = msg(0, 422, 'Your first name must be at least 3 characters long!');

    elseif (strlen($last_name) < 3) :
        $returnData = msg(0, 422, 'Your last name must be at least 3 characters long!');

    else :
        try {

            $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
            $check_email_stmt = $dbConnection->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) :
                $returnData = msg(0, 422, 'This E-mail already in use!');

            else :
                $insert_query = "INSERT INTO `users`(`first_name`,`last_name`,`email`,`password`) VALUES(:first_name,:last_name,:email,:password)";

                $insert_stmt = $dbConnection->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':first_name', htmlspecialchars(strip_tags($first_name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':last_name', htmlspecialchars(strip_tags($last_name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);

                $insert_stmt->execute();

                $fetch_user_by_email = "SELECT * FROM `users` WHERE `email`=:email";
                $query_stmt = $dbConnection->prepare($fetch_user_by_email);
                $query_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $query_stmt->execute();

                // IF THE USER IS FOUNDED BY EMAIL
                if ($query_stmt->rowCount()) :
                    $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://localhost/php_auth_api/',
                        array("user_id" => $row['id'])
                    );

                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully registered.',
                        'token' => $token
                    ];
                else :
                    $returnData = msg(0, 422, 'Unable to fetch user data');
                endif;

            endif;
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;
endif;

echo json_encode($returnData);
