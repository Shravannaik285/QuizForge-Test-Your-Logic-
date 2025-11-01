// -------------------- Question Data --------------------
const questions = [
    {
        question: "Which of the following is not a web browser", // Question text
        options: ["Google Chrome", "Mozilla Firefox", "Microsoft edge", "Windows 11"], // All 4 options
        correct: 3, // Index of correct option (0-based → 3 means 4th option)
    },
    {
        question: "In Python, which of the following symbols is used to comment a single line?",
        options: ["//", "<!-- -->", "#", "/* */"],
        correct: 2, // "#" is the correct answer
    },
    {
        question: "Which data structure uses the FIFO (First In First Out) principle?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correct: 1, // "Queue" is correct
    }
];

// -------------------- Selecting HTML Elements --------------------
const questionArea = document.querySelector(".question-area"); // Displays the current question text
const optionArea = document.querySelector(".option-area"); // Container where buttons for options are created
const resultArea = document.getElementById("result-area"); // Div that shows final result
const scoreText = document.getElementById("score"); // Paragraph to show the score text
const restartBtn = document.getElementById("restart"); // Restart button to retake quiz

// -------------------- Variables to Track Progress --------------------
let currentQuestion = 0; // Keeps track of which question is being displayed
let score = 0; // Counts the number of correct answers

// -------------------- Function to Load a Question --------------------
function loadQuestion() {
    optionArea.innerHTML = ""; // Clears old option buttons
    resultArea.style.display = "none"; // Hides result section while quiz is active

    const current = questions[currentQuestion]; // Gets the current question object
    questionArea.textContent = current.question; // Displays the question text

    // Loop through each option and create a button for it
    current.options.forEach((optionText, index) => {
        const btn = document.createElement("button"); // Create new <button>
        btn.textContent = optionText; // Set text of button to option text
        btn.onclick = () => checkAnswer(index); // When clicked, check if this option is correct
        optionArea.appendChild(btn); // Add button to the options area
    });
}

// -------------------- Function to Check Answer --------------------
function checkAnswer(selectedIndex) {
    // If the selected option index matches the correct index → increase score
    if (selectedIndex === questions[currentQuestion].correct) {
        score++;
    }

    // Move to the next question
    currentQuestion++;

    // If there are more questions → load next one; else → show result
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// -------------------- Function to Show Final Result --------------------
function showResult() {
    questionArea.textContent = "Quiz Completed!"; // Replace question text with completion message
    optionArea.innerHTML = " "; // Clear all option buttons
    resultArea.style.display = "block"; // Display the result area
    resultArea.textContent = `Your score: ${score}/${questions.length}`; // Show final score
}

// -------------------- Restart Button Event --------------------
restartBtn.addEventListener("click", () => {
    currentQuestion = 0; // Reset question index
    score = 0; // Reset score
    loadQuestion(); // Load the first question again
});

// -------------------- Start the Quiz --------------------
loadQuestion(); // Runs immediately when the page loads
