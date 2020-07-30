/*
 * @Author: wzi
 * @Date: 2018-10-01 10:47:26
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-03 11:54:01
 */

declare interface RouletteSlotDataItem {
    // 名称
    label: string | JSX.Element;
    // 图片
    img: string;
    // 商品 ID
    id: number;
}
declare type RouletteSlotData = RouletteSlotDataItem[];

declare type ReactRouletteSlotProps = {
    data: RouletteSlotData;
    // 每行个数
    row?: number;
    action: ActionType;
    alert: Function;
    // 宽跟高
    width: number;
    height: number;
    isOver: boolean;
    BingoItem?: (props: { data: RouletteSlotDataItem }) => JSX.Element;
    LuckyButton?: () => JSX.Element;
};
declare type DataItem = {
    type: 'item' | 'button';
    data?: RouletteSlotDataItem;
    // 实际上数据的顺序
    position?: number;
};
declare type ReturnData = { data: number | string; isWin?: boolean };
declare type ActionType = (cb: (res: ReturnData) => void) => void;

type ReactRouletteSlotState = {
    // 处理过后的数据
    board: DataItem[][];
    boardData: DataItem[];
    // 是否在运行中
    run: boolean;
    pointer: number;
};
declare class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {}
