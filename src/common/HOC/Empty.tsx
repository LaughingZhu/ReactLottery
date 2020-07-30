/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 15:28:26
 */

import { branch, renderComponent } from 'recompose';
import { compose } from '../helper/compose';
const Empty = () => {
    return null;
};

const emptyEnhancer = (condition, Holder = Empty) =>
    compose(branch(condition, renderComponent(Holder)));
export default emptyEnhancer;
