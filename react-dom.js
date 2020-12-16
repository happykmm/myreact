import { renderEngine } from './react.js';

const ReactDOM = {
  render: (reactElement, domContainer) => {
    const domElement = renderEngine(reactElement);
    domContainer.appendChild(domElement);
  }
}

export default ReactDOM;
