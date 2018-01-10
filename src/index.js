import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';


class App extends React.Component {
  render() {
    console.log(styles);
    console.log(styles.test);
    return (
      <div className={styles.workCunt}>
        <p className={styles.test}>Enter some JSON</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
