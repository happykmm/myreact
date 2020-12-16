import React from './react.js';
import ReactDOM from './react-dom.js';

class MyCompA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  render() {
    const { prop1, children } = this.props;
    return (
      // <div className='container'>
      //   Hello world!
      //   {prop1}
      //   <div>Click count: {this.state.count}</div>
      //   <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button>
      //   <div>
      //     {children}
      //   </div>
      // </div>
      React.createElement('div', {
        className: 'contianer',
        children: [
          'This is MyCompA',
          React.createElement('div', {
            children: [
              prop1,
            ],
          }),
          React.createElement('div', {
            children: [
              `Click count: ${this.state.count}`,
            ],
          }),
          React.createElement('button', {
            onClick: () => {
              this.setState({ count: this.state.count + 1 });
            },
            children: [
              'Click me',
            ],
          }),
          React.createElement(MyCompB),
          React.createElement('div', { children }),
        ],
      })
    );
  }
}

class MyCompB extends React.Component {
  constructor(props) {
    super(props);
    console.log('MyCompB: constructor is called');
  }

  render() {
    return (
      // <div>This is MyCompB</div>
      React.createElement('div', {
        children: [
          'This is MyCompB'
        ],
      })
    );
  }
}

ReactDOM.render(
  // <MyCompA prop1="prop1">
  //   <MyCompB />
  //   <div>c</div>
  //   {null}
  //   {false}
  // </MyCompA>,
  React.createElement(MyCompA, {
    prop1: 'prop1',
    children: [
      React.createElement('div', { children: 'c' }),
      null,
      false,
    ],
  }),
  document.querySelector('body')
);
