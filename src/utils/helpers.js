export function formatQuestion(question) {
  const { author, id, timestamp } = question;

  return {
    id,
    author,
    date: formatDate(timestamp)
  };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function sortUsersByActivity(users) {
  const usersArray = Object.values(users);

  return usersArray.sort((a, b) => {
    const sumA = Object.keys(a.answers).length + a.questions.length;
    const sumB = Object.keys(b.answers).length + b.questions.length;

    return sumB - sumA;
  });
}
