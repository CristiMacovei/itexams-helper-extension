function fetchQuestions() {
  return document.querySelectorAll('div#accordion > div.card');
}

window.addEventListener('load', async (evt) => {
  // grab the questions
  const questions = fetchQuestions();

  console.log(questions);

  questions.forEach((q) => {
    const answerDiv = q.querySelector('div.answer_block');

    const answer = answerDiv.getAttribute('data-answer');
    console.log(answer);

    const submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-warning');
    submitButton.textContent = 'Submit answer';

    answerDiv.parentElement.insertBefore(
      submitButton,
      answerDiv.parentElement.firstChild
    );

    const choicesList = Array.from(q.querySelectorAll('ul.choices-list > li'));

    console.log(choicesList);
    if (choicesList.length === 0) {
      // not multiple choice

      return;
    }

    const checkboxesMap = new Map();

    choicesList.forEach((li) => {
      const newCheckbox = document.createElement('input');
      newCheckbox.type = 'checkbox';

      li.insertBefore(newCheckbox, li.firstChild);

      const answerLabel = li
        .querySelector('strong')
        .textContent.replaceAll('.', '')
        .trim();

      checkboxesMap.set(answerLabel, newCheckbox);
    });

    submitButton.addEventListener('click', (evt) => {
      const yourResponse = Array.from(checkboxesMap)
        .filter(([label, checkbox]) => checkbox.checked)
        .map(([label, checkbox]) => label)
        .join(',');

      if (yourResponse === answer) {
        alert('corect');
      } else {
        alert(`${yourResponse} !== ${answer}`);
      }
    });
  });
});
