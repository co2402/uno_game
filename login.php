<?php
require 'db_connect.php';
global $pdo;
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
        header('Location: game.php');
        exit;
    } else {
        $error = "Ongeldige inloggegevens";
    }
}
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Inloggen - UNO Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="auth-container">
    <h1>Inloggen</h1>
    <?php if (isset($_GET['registered'])): ?>
        <div class="success">Registratie succesvol! Je kunt nu inloggen.</div>
    <?php endif; ?>
    <?php if (isset($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>
    <form method="POST">
        <input type="email" name="email" placeholder="E-mailadres" required>
        <input type="password" name="password" placeholder="Wachtwoord" required>
        <button type="submit">Inloggen</button>
    </form>
    <p>Nog geen account? <a href="register.php">Registreren</a></p>
</div>
</body>
</html>