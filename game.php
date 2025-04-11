<?php
session_start();
require 'db_connect.php';
global $pdo;

if (!isset($_SESSION['user_email'])) {
    header('Location: login.php');
    exit;
}

// Haal gebruikersgegevens op
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$_SESSION['user_email']]);
$user = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>UNO Game - <?php echo htmlspecialchars($user['first_name']); ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="game-container">
    <div class="user-info">
        <span>Welkom, <?php echo htmlspecialchars($user['first_name'] . ' ' . $user['last_name']); ?></span>
        <a href="logout.php" class="logout">Uitloggen</a>
    </div>

    <!-- Je UNO spel inhoud hier -->
    <h1>UNO Game</h1>
    <div id="timer">Tijd over: 10</div>

    <div id="discard-pile">
        <h2>Aflegstapel</h2>
        <div id="discard-card"></div>
    </div>

    <div id="hand-section">
        <h2>Jouw Hand</h2>
        <div id="hand"></div>
    </div>

    <div id="controls">
        <button id="draw-card">Trek een kaart</button>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>