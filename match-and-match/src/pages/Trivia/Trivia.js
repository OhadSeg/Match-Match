import React, { useEffect, useState } from 'react';
import classes from './Trivia.module.css';
import he from 'he';
import { Link } from 'react-router-dom';

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // Fetch questions from API and set them in the state
    const fetchQuestions = async () => {
      // Your API call to fetch questions
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=12');
      const data = await response.json();
      const decodedQuestions = data.results.map((question) => ({
        ...question,
        question: he.decode(question.question),
        incorrect_answers: question.incorrect_answers.map((choice) => he.decode(choice)),
        correct_answer: he.decode(question.correct_answer),
      }));
      setQuestions(decodedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleChoiceSelect = (question, choice) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [question]: choice,
    }));

    if (isAnswerCorrect(question, choice)) {
      setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
    }
  };

  const isAnswerCorrect = (questionId, selectedChoice) => {
    const question = questions.find((q) => q.question === questionId);
    return question.correct_answer === selectedChoice;
  };

  return (
    <div className={classes.triviaContainer}>
      <h2 className={classes.triviaHeader}>Trivia Questions</h2>
      <p>Correct Answers: {correctCount}</p>
      {questions.map((question, index) => (
        <div className={classes.triviaQuestion} key={index}>
          <h3>{question.question}</h3>
          <ul className={classes.triviaChoices}>
            {/* Render the correct answer first */}
            <li>
              <button
                onClick={() => handleChoiceSelect(question.question, question.correct_answer)}
                className={
                  selectedAnswers[question.question] === question.correct_answer
                    ? isAnswerCorrect(question.question, question.correct_answer)
                      ? `${classes.triviaButton} ${classes.correctAnswer}`
                      : `${classes.triviaButton} ${classes.wrongAnswer}`
                    : classes.triviaButton
                }
              >
                {question.correct_answer}
              </button>
            </li>
            {/* Render the incorrect answers */}
            {question.incorrect_answers.map((choice, choiceIndex) => (
              <li key={choiceIndex}>
                <button
                  onClick={() => handleChoiceSelect(question.question, choice)}
                  className={
                    selectedAnswers[question.question] === choice
                      ? isAnswerCorrect(question.question, choice)
                        ? `${classes.triviaButton} ${classes.correctAnswer}`
                        : `${classes.triviaButton} ${classes.wrongAnswer}`
                      : classes.triviaButton
                  }
                >
                  {choice}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link to="/chat" className={classes.goBackLink}>
        Go Back
      </Link>
    </div>
  );
};

export default Trivia;



