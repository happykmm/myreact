import { isString, isFunction, isSubClass, extend } from './helpers.js';


class ReactElement {
  constructor({ elementType, props }) {
    this.elementType = elementType;
    this.props = props;
  }
}

function createElement(elementType, props) {
  return new ReactElement({ elementType, props });
}

class ReactComponent {
  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    extend(this.state, newState);

    const reactElement = this.render();
    
    const newDomElement = renderEngine(reactElement);
    const oldDomElement = this.domElement;
    oldDomElement.replaceWith(newDomElement);
    this.domElement = newDomElement;
  }
}

const propKeyToDomAttribute = {
  className: 'class',
};

function renderDomElement(reactElement) {
  const { elementType, props } = reactElement;

  const el = document.createElement(elementType);
  const { children, ...otherProps } = props;

  // render props
  for (const propKey in otherProps) {
    const propValue = otherProps[propKey];
    if (propKey === 'onClick') {
      el.onclick = propValue;
    } else {
      const domAttribute = propKeyToDomAttribute[propKey] || propKey;
      el.setAttribute(domAttribute, propValue);
    }
  }

  // render children
  for (const child of children) {
    if (child instanceof ReactElement) {
      el.appendChild(renderEngine(child));
    } else if (isString(child)) {
      el.innerText += child;
    }
    // ignore falsy value
  }

  return el;
}

function renderReactComponent(reactElement) {
  const {
    elementType: ComponentClass,
    props,
  } = reactElement;

  if (!reactElement.componentInstance) {
    reactElement.componentInstance = new ComponentClass(props);
  }
  const { componentInstance } = reactElement;
  const renderResult = componentInstance.render();
  if (renderResult instanceof ReactElement) {
    // memorize reactElement, in order to compare next time
    componentInstance.reactElement = renderResult;

    const domElement = renderEngine(renderResult);
    // memorize domElement, in order to update next time
    componentInstance.domElement = domElement;

    return domElement;
  } else {
    throw new Error('renderResult is not of type ReactElement');
  }
}

function renderFunctionComponent(reactElement) {

}

function getRenderer(reactElement) {
  const { elementType } = reactElement;

  if (isString(elementType)) {
    return renderDomElement;
  } else if (isFunction(elementType)) {
    if (isSubClass(elementType, ReactComponent)) {
      return renderReactComponent;
    } else {
      return renderFunctionComponent;
    }
  }

  throw new Error('No renderer found for reactElement');
}

export function renderEngine(reactElement) {
  if (reactElement instanceof ReactElement) {
    const renderer = getRenderer(reactElement);
    return renderer(reactElement);
  } else {
    throw new Error('reactElement is not of type ReactElement');
  }
}

const React = {
  Component: ReactComponent,
  createElement,
};

export default React;
