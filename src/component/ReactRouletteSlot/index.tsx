/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:41:42
 */
/// <reference path='index.d.ts' />
import React from 'react';
import { shouldUpdate } from '../../common/decorator/decorator';
// import { compose } from '../../common/helper/compose';
import emptyEnhancer from '../../common/HOC/Empty';
import errorBoundaryEnhancer from '../../common/HOC/ErrorBoundary';
import Alert from '../Alert';
import { Toast } from 'antd-mobile';
import './style.less'




const MIN_ROUND = 1;

@shouldUpdate({
	props: ['data', 'action', 'alert'],
	state: ['pointer', 'run'],
})

export class ReactRouletteSlot extends React.Component<
    ReactRouletteSlotProps,
    ReactRouletteSlotState
> {
	timer = null;

	// 记录转了几圈
	round: number = 0;

	// 记录结束时转了几圈
	endRound: number = 0;

	// 记录目标
	target: ReturnData = null;

	// 抽奖按钮的坐标
	luckyButtonPosition: { x: number; y: number; } = { x: 0, y: 0, };

	// 列
	row: number = 0;
	
	// 行
	col: number = 0;
	// 单元高度
	itemHeight: number = 0;




	state = {
		board: [[]],
		boardData: [],
		run: false,
		// 记录当前的active 位置
		pointer: -1,
	};


	componentWillMount() {
		this.dataHandler();
	}
	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	isActive = (position: number) => this.state.pointer === position;
	// 活动棋盘的数据
	getBoardData = () => this.state.boardData;

	// 寻找目标节点
	findTargetPointer = (target: number | string): DataItem =>
		this.getBoardData().find((cur) => {
			if (cur.type === 'button') {
				return false;
			}
			return cur.data.id === target;
		}
	);


	// 获得几列
	getRow = () => (this.props.row || this.props.data.length < 9 ? 3 : 4);
	
	// 获得几行
	getCol = () => (this.props.data.length - 2 * this.row) / 2 + 2;
	
	// 获得单元高度
	getItemHeight = () => this.props.height / this.col - (this.col - 2) * 1;
	
	// 获得按钮的坐标数据
	setLuckyButtonPosition = () => {
		this.luckyButtonPosition = {
			x: this.row - 2,
			y: (this.props.data.length - this.row * 2) / 2,
		};
	};
	// 生成棋盘
	getBoard = (): [DataItem[][], DataItem[]] => {
		const board = [];
		const boardData = [];
		let position = 0;
		let Y = 0;
		for (let x = 0; x < this.col; x++) {
			board[x] = [];     

			for (let y = 0; y < this.row; y++) {
				Y = y;
				if (x === 0) {
					position = y;
				} else if (x === this.col - 1) {
					position = this.row + this.col - 2 + y;
					Y = this.row - y - 1;
				} else if (y === 0 || y === 1) {
					if (y === 0) {
						position = this.props.data.length - x;
					} else { 
						position = this.row + x - 1;
					}
				}
				if (position === -1) {
					break;
				}

				board[x][Y] = {
					position,
					data: this.props.data[position],
					type: 'item',
				};
				position = -1;

				boardData.push(board[x][Y]);
			}

		}
		return [board, boardData];
	};
	// 加入抽奖按钮
	joinButton = (board: DataItem[][], boardData: DataItem[]) => {
		const temp = board[1][1];
		const button: DataItem = { type: 'button' };
		board[1][1] = button;
		board[1][2] = temp;
		boardData.splice(this.row + 1, 0, button);
	};
	// 根据数据生成行数, 列数, 棋盘, 抽奖按钮的数据
	dataHandler = () => {
		this.row = this.getRow();
		this.col = this.getCol();

		const [board, boardData] = this.getBoard();
		this.joinButton(board, boardData);

		this.itemHeight = this.getItemHeight();
		this.setState({
			board,
			boardData,
		});

		this.setLuckyButtonPosition();
	};
	// 请求开奖结果的回调
	onResultReturn = (res: ReturnData) => {
		this.target = res;
	};
	// 请求数据
	onFetch() {
		setTimeout(() => {
			this.props.action(this.onResultReturn);
		}, 2000);
	}
	// 抽奖
	onClick = () => {
		if(this.props.isOver) {
				// 次数用完
			Toast.info('您的抽奖次数已用完！')
			this.reset(false)
		} else if(!this.state.run) {
			this.round = 0;
			this.endRound = 0;
			// 点击启动跑马灯
			this.setState({
				run: true,
				pointer: 0,
			});
			this.onFetch();
			this.run();
		}else {

		}
	};
	
	onSuccess = (target: DataItem, isWin: boolean = true) => {
		const CurBingoItem = this.props.BingoItem || this.BingoItem;
		if(target.data.id === 8) {
			Alert.show({
				title: '很遗憾',
				content: <CurBingoItem data={target.data} />,
			});
		} else if(target.data.id <8) {
			Alert.show({
				title: '恭喜您中奖了',
				alert : () => this.props.alert(target.data.id),
				content: <CurBingoItem  data={target.data} />,
			});
		} else {}
		return this.reset(false);
	};
	
	onFail = () => {
			// Alert.show({ content: '您的次数已用完' });
		return this.reset(true);
	};
	
	getTime = (time: number, interval: number = -50) => {
		if (time < 100) {
			return 100;
		} else {
			return time + interval;
		}
	};
	
	position = () => {
		let pointer = this.state.pointer + 1;
		let round = this.round;
		if (pointer >= this.props.data.length) {
			pointer = 0;
			round++;
		}

		this.round = round;
		this.setState({
			pointer,
		});
		return [pointer, round];
	};
	
	reset = (status: any) => {
		if(status) {
			this.setState({
				run: false,
				pointer: 7,
			});
		} else {
			this.setState({
				run: false,
			});
		}
		return clearInterval(this.timer);
	};
	runBeforeEnd = (pointer: number, time: number) => {
		const target = this.findTargetPointer(this.target.data);
		if (!target) {
			return this.onFail();
		}
		if (this.endRound < 2) {
			if (pointer === target.position) {
				this.endRound = this.endRound + 1;
			}
			return this.run(this.getTime(time));
		}

		if (target.position === pointer) {
			return this.onSuccess(target, this.target.isWin);
		}
		// 进入结束流程
		this.run(this.getTime(time, 30));
	};
	run = (time: number = 500) => {
		this.timer = setTimeout(() => {
			const [pointer, round] = this.position();
			if (round > MIN_ROUND && this.target !== null) {
				this.runBeforeEnd(pointer, time);
			} else {
				this.run(this.getTime(time));
			}
		}, time);
	};
	// 抽奖按钮
	LuckyButton = () => (
		<div className='lucky'
			onClick={this.onClick}
			style={{
				opacity: `${this.state.run ? 0.8 : 1}`
			}}
		>
			{this.props.LuckyButton ? (
				<this.props.LuckyButton />
			) : (
				<this.LuckyContent />
			)}
		</div>
	);
	LuckyContent = () => (
		<div className='lucky-label'>
			<div>点击</div>
			<div>抽奖</div>
		</div>
	);

	BingoItem = ({ data }: { data: RouletteSlotDataItem }) => (
		<div height={this.itemHeight * 1.5}>
			<div className='content-item flex'>
			<img src={data.img} height={this.itemHeight * 1.5} />
		</div>
		<div className='content-item flex' >
			<div className='content-item-label'>{data.label}</div>
		</div>
		</div>
	);

	ItemContent = ({
		data,
		imgSize = this.itemHeight / 2,
	}: {
		data: RouletteSlotDataItem;
		imgSize?: number;
	}) => (
		<>
			<div className='content-item flex'>
				<img className='img' src={data.img} height={imgSize} />
			</div>
			<div className='content-item flex' >
				<div className='content-item-label'>{data.label}</div>
			</div>
		</>
	);
	
	// 物品节点
	Item = (props: { position: number; data: RouletteSlotDataItem }) => (
			<div
				className='content'
				style={{
					backgroundColor: `${this.isActive(props.position) ? '#ffc536' : '#fdf2f0'}`
				}}
				// height={this.itemHeight}
			>
				<this.ItemContent {...props} />
			</div>
	);
	// 每个节点
	Grid = (item: DataItem, index: number) =>
		item.type === 'item' ? (
			<this.Item data={item.data} position={item.position} key={index} />
		) : (
			<this.LuckyButton key={index} />
		);
	// 每一行
	Line = (line: DataItem[], key: number) => (
		<div className='wrapper-line flex' key={key}>{line.map(this.Grid)}</div>
	);
	// 棋盘
	Board = () => (
		<div className='wrapper' >
			{this.state.board.map(this.Line)}
		</div>
	);

	render() {
		return ( 
			<div className='border flex'>
				<this.Board />
			</div>
		);
	}
}
export default (
	emptyEnhancer(
		({ data }: { data: RouletteSlotData }) =>
			!data || data.length === 0 || data.length % 2 !== 0,
		() => {
			Alert.show({ content: '数据不符合要求' });
			return null;
		}
	),
	errorBoundaryEnhancer('角子机载入失败')
)(ReactRouletteSlot);
