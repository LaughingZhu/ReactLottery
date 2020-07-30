/*
* @Author: wzi
* @Date:   2016-07-11 18:32:29
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-17 16:51:27
* 这里记录着一些通用的修饰器
* in keyof 表示遍历 常用于 [K in keyof T]
* extends keyof 表示对应
* keyof T的结果为 T上已知的公共属性名的联合。 例如：
* let personProps: keyof Person; // 'name' | 'age'
*/

import * as PropTypes from 'prop-types';
import * as React from 'react';

enum EnumContextType {
    object,
    array,
    bool,
    string,
    number,
}

type ReturnTypes<EnumTypes> = { [key in keyof EnumTypes]: key };
function getContextTypes<EnumTypes>(
    contextTypes: EnumTypes
): ReturnTypes<EnumTypes> {
    return (contextTypes as any) as ReturnTypes<EnumTypes>;
}

export const ContextTypes = getContextTypes(EnumContextType);
interface IContextProp {
    [propName: string]: keyof typeof ContextTypes;
}
/**
 * 拥有从父组件继承的属性context
 * @param  {object}  contextProps 想要继承的属性值，和描述
 * @example {config:obj,
 *           inputs:array,
 *           dispatch:func}
 * @return  {func}   一个修饰器，修饰class, 使得 class 的contextTypes拥有 props
 */
export function hasContext(contextProps: IContextProp): any {
    return (target: React.ComponentClass & React.Component): void => {
        const props = {};

        for (const key in contextProps) {
            Object.assign(props, {
                [key]: PropTypes[contextProps[key] as any].isRequired,
            });
        }
        target.contextTypes = props;
    };
}
/**
 * [context的修饰器]
 * @param  {[type]} contextValue [description]
 * @return {[type]}              [description]
 */
export function provideContext(contextValue) {
    return (target: any) => {
        /**
         * [childContextTypes 这是一个《《静态属性》》，
         * 若写在外部，可以直接 Foo.prop = xx;]
         */
        target.childContextTypes = (() => {
            const types: any = {};

            for (const key in contextValue) {
                Object.assign(types, {
                    [key]: PropTypes[contextValue[key]].isRequired,
                });
            }
            return types;
        })();

        /**
         * [这里必须继承到原型上，是因为装饰器是在编译时进行,getChildContext指向了一个方法，
         * 若需要写在class外，就必须写到原型连上。]
         * @return {[type]} [description]
         */
        target.prototype.getChildContext = function() {
            const contexts = {};
            for (const key in contextValue) {
                Object.assign(contexts, {
                    [key]:
                        contextValue[key] instanceof Array
                            ? this.context[key]
                                ? this.context[key]
                                : this.state[key]
                            : this.props[key],
                });
            }

            return contexts;
        };
    };
}
/**
 *  shouldComponentUpdate的修饰器
 *  @param {object} shouldDiff
 *         {
 *             state:['state1','state2'],
 *             props:['props1','props2'],
 *             context:['props1','props2'],
 *         }
 *   @return {bool}          是否应该更新
 */

export function shouldUpdate(shouldDiff) {
    const vVule = ['props', 'state', 'context'];
    return <T extends React.ComponentType>(target: T) => {
        target.prototype.shouldComponentUpdate = function() {
            const argument = arguments;
            let result = false;
            let location;
            let source;

            for (const key in shouldDiff) {
                let idx = 0;
                if (result === true) {
                    break;
                }
                idx = vVule.indexOf(key);
                if (idx === -1) {
                    continue;
                }
                for (let value of shouldDiff[key]) {
                    value = value.split('.');
                    source = value.reduce(
                        (previous, cur, index) =>
                            index === 0
                                ? (() => {
                                      location = this[key][cur];
                                      return argument[idx][cur];
                                  })()
                                : (() => {
                                      location = location[cur];
                                      return previous[cur];
                                  })(),
                        0
                    );
                    if (location !== source) {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        };
        return target;
    };
}
