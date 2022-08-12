import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionReciveButton, showTimer, timeOver } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    this.timeToAnswer();
  }

  timeToAnswer = () => {
    const { showTimerAction, timeOverAction, reciveButton } = this.props;
    const TIMEINTERVAL = 1000;
    setInterval(() => {
      const { timer } = this.props;
      let maxTimer = timer;
      if (maxTimer > 0) {
        maxTimer -= 1;
        showTimerAction(maxTimer);
      } else if (maxTimer === 0) {
        timeOverAction(true);
        showTimerAction(0);
        reciveButton(true);
      }
    }, TIMEINTERVAL);
  }

  render() {
    const { timer } = this.props;
    return (
      <p className="timer">
        Timer:
        {' '}
        { timer }
      </p>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  showTimerAction: PropTypes.func.isRequired,
  timeOverAction: PropTypes.func.isRequired,
  reciveButton: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showTimerAction: (payload) => dispatch(showTimer(payload)),
  timeOverAction: (payload) => dispatch(timeOver(payload)),
  reciveButton: (payload) => dispatch(actionReciveButton(payload)),
});

const mapStateToProps = (store) => ({
  timer: store.game.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
