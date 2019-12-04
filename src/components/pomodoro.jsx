import React, { Component } from 'react';

class Pomodoro extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    breakLength: 5,
    sessionLength: 25,
    phase: 'Session'
  };
  initials = { ...this.state };
  isOn = false;
  start = () => {
    if (this.isOn === false && this.state.seconds >= 0) {
      this.isOn = true;
      this.timer = setInterval(() => {
        if (this.state.seconds === 0 && this.state.minutes > 0) {
          this.setState({ minutes: this.state.minutes - 1, seconds: 60 });
        }

        if (this.state.seconds === 0 && this.state.minutes === 0) {
          if (this.state.phase === 'Break') {
            var audio = new Audio(
              'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
            );
            audio.play();
          }
          this.setState({
            phase: this.state.phase === 'Break' ? 'Session' : 'Break',
            minutes:
              this.state.phase === 'Break'
                ? this.state.sessionLength - 1
                : this.state.breakLength - 1,
            seconds: 60
          });
        }
        this.setState({
          seconds: this.state.seconds - 1
        });
      }, 1000);
    }
  };

  stop = () => {
    if (this.isOn === true) {
      this.isOn = false;
      clearInterval(this.timer);
    }
  };
  reset = () => {
    this.setState({
      minutes: 25,
      seconds: 0,
      sessionLength: 25,
      breakLength: 5
    });
    this.stop();
  };
  handleBreakIncrement = () => {
    if (this.state.breakLength < 60 && this.isOn === false)
      this.setState({ breakLength: this.state.breakLength + 1 });
  };
  handleBreakDecrement = () => {
    if (this.state.breakLength > 1 && this.isOn === false)
      this.setState({ breakLength: this.state.breakLength - 1 });
  };
  handleSessionIncrement = () => {
    if (this.state.sessionLength < 60 && this.isOn === false)
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        minutes: this.state.sessionLength + 1,
        seconds: 0
      });
  };
  handleSessionDecrement = () => {
    if (this.state.sessionLength > 1 && this.isOn === false)
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        minutes: this.state.minutes - 1,
        seconds: 0
      });
  };
  render() {
    const { minutes, seconds, breakLength, sessionLength } = this.state;
    return (
      <div className="container">
        <h1>Pomodoro Clock</h1>
        <div className="settings">
          {' '}
          <div id="break">
            <div id="break-label">Break length</div>
            <div className="controls">
              <div id="break-decrement" onClick={this.handleBreakDecrement}>
                -
              </div>
              <div id="break-length">{breakLength}</div>
              <div id="break-increment" onClick={this.handleBreakIncrement}>
                +
              </div>
            </div>
          </div>
          <div id="session">
            <div id="session-label">Session length</div>
            <div className="controls">
              <div id="session-decrement" onClick={this.handleSessionDecrement}>
                -
              </div>
              <div id="session-length">{sessionLength}</div>
              <div id="session-increment" onClick={this.handleSessionIncrement}>
                +
              </div>
            </div>
          </div>
        </div>

        <div className="timer">
          <h3 id="phase">{this.state.phase}</h3>
          <div id="time-left">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        <button id="start" onClick={this.start}>
          <i className="fa fa-play-circle fa-2x"></i>
        </button>
        <button id="stop" onClick={this.stop}>
          <i className="fa fa-pause-circle fa-2x"></i>
        </button>
        <button id="reset" onClick={this.reset}>
          <i className="fa fa-repeat fa-2x"></i>
        </button>
      </div>
    );
  }
}

export default Pomodoro;
