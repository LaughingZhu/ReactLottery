/*
 * @Author: wzi
 * @Date: 2018-04-25 11:43:06
 * @Last Modified by: mg
 * @Last Modified time: 2018-09-16 17:17:23
 * styled-component-增强
 */

import * as styledComponents from 'styled-components';
interface ThemeInterface {
    primary: string;
    red: string;
    blue: string;
    green: string;
    yellow: string;
    gray: string;
    orange: string;
    sky: string;
    purple: string;
    lightGray: string;
    brown: string;
    bingo: string;
}

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeInterface };
export default styled;
