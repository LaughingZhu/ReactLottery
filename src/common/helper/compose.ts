/*
 * @Author: wzi
 * @Date: 2018-06-22 15:28:41
 * @Last Modified by: wzi
 * @Last Modified time: 2018-09-26 15:49:18
 */

export type HOC<InjectProps> = <Props extends InjectProps>(
    Component: React.ComponentType<Props>
) => React.ComponentType<GlobalType.Omit<Props, keyof InjectProps>>;

export function compose<T1>(hoc1: HOC<T1>): HOC<T1>;
export function compose<T1, T2>(hoc1: HOC<T1>, hoc2: HOC<T2>): HOC<T1 & T2>;
export function compose<T1, T2, T3>(
    hoc1: HOC<T1>,
    hoc2: HOC<T2>,
    hoc3: HOC<T3>
): HOC<T1 & T2 & T3>;
export function compose<T1, T2, T3, T4>(
    hoc1: HOC<T1>,
    hoc2: HOC<T2>,
    hoc3: HOC<T3>,
    hoc4: HOC<T4>
): HOC<T1 & T2 & T3 & T4>;
export function compose(...hocs: Array<HOC<any>>) {
    return (c: React.ComponentType) => hocs.reduce((acc, hoc) => hoc(acc), c);
    // let func = null;
    // for (
    //     let _len = arguments.length, funcs = Array(_len), _key = 0;
    //     _key < _len;
    //     _key++
    // ) {
    //     funcs[_key] = arguments[_key];
    //     func = funcs;
    // }

    // return func.reduce(
    //     function(acc, hoc) {
    //         return function() {
    //             return acc(hoc.apply(undefined, arguments));
    //         };
    //     },
    //     function(arg) {
    //         return arg;
    //     }
    // );
}
