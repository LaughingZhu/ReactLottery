/*
 * @Author: wzi
 * @Date: 2018-02-02 15:54:47
 * @Last Modified by: wzi
 * @Last Modified time: 2018-05-23 10:11:03
 */
import ErrorBoundary from '@components/ErrorBoundary';
import React from 'react';

function ErrorBoundaryDecorator(
    description?: string,
    isClass: boolean = true,
    hide: boolean = global.isJest
): any {
    if (hide) {
        return (a) => a;
    }
    return isClass
        ? // tslint:disable-next-line:variable-name
          (Comp: React.ComponentClass) => {
              return class ErrorBoundaryClass extends ErrorBoundary {
                  static defaultProps = {
                      description,
                  };
                  render() {
                      if (this.state.errorInfo) {
                          return this.getContent();
                      }
                      return <Comp {...this.props} />;
                  }
              };
          }
        : (
              _target: any,
              _propertyKey: string,
              descriptor: PropertyDescriptor
          ) => {
              const original = descriptor.value;
              descriptor.value = function(...arg) {
                  return (
                      <ErrorBoundary description={description}>
                          {original.bind(this)(...arg)}
                      </ErrorBoundary>
                  );
              };
          };
}

export default ErrorBoundaryDecorator;
