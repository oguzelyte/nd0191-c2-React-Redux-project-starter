import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import Switcher11 from './Toggle';
import { useState } from 'react';

const Dashboard = (props) => {
  const [showUnanswered, setShowUnanswered] = useState(true);

  const toggleQuestionsBlock = (show) => {
    setShowUnanswered(show);
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" data-testid="questions-list">
        <Switcher11 toggleQuestionsBlock={toggleQuestionsBlock}></Switcher11>

        {showUnanswered && (
          <div>
            <h2 className="pt-4 pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">Unanswered questions</h2>
            <ul className="dashboard-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {props.unansweredQuestions.map((id) => (
                <li key={id} id={id}>
                  <QuestionCard answered={false} id={id} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {props.unansweredQuestions.length === 0 && <div>No unanswered questions found.</div>}

        {!showUnanswered && (
          <div>
            <h2 className="pt-4 pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">Answered questions</h2>
            <ul className="dashboard-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {props.answeredQuestions.map((id) => (
                <li key={id} id={id}>
                  <QuestionCard answered={true} id={id} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {props.answeredQuestions.length === 0 && <div>No answered questions found.</div>}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions }, ownProps) => ({
  answeredQuestions: Object.keys(questions)
    .filter((question) => Object.keys(ownProps.authedUserData.answers).includes(question))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

  unansweredQuestions: Object.keys(questions)
    .filter((question) => !Object.keys(ownProps.authedUserData.answers).includes(question))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
});

export default connect(mapStateToProps)(Dashboard);
