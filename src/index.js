import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.styl';

const APP_DOMAIN = `https://us-central1-staticjson.cloudfunctions.net/app`;
const SUBMIT_URL = `${APP_DOMAIN}/submit`;
const SERVE_URL = `${APP_DOMAIN}/serve`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      json: '{}',
      url: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ json: e.target.value });
  }

  async onSubmit() {
    let parsedJSON;
    try {
      parsedJSON = JSON.parse(this.state.json);
    } catch(e) {
      console.error(`That's not JSON brah`);
      return;
    }
    const config = {
      method: 'POST',
      body: JSON.stringify(parsedJSON)
    };
    const response = await fetch(SUBMIT_URL, config);
    const json = await response.json();
    this.setState({ url: json.url });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <p className={styles.test}>Enter some JSON</p>
        <textarea className={styles.input} onChange={this.onChange} value={this.state.json}/>
        <button className={styles.submit} onClick={this.onSubmit}>Submit</button>
        {this.state.url ? (
          <div>
            <a href={`${SERVE_URL}/${this.state.url}`}>{SERVE_URL}/{this.state.url}</a>
          </div>
        ) : false}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
