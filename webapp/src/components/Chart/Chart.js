import React from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { format } from "d3-format";
import {
	PriceCoordinate
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale";

import { ema } from "react-stockcharts/lib/indicator";
import  { fitDimensions } from "react-stockcharts/lib/helper";
import { AreaSeries } from "react-stockcharts/lib/series";
import { curveMonotoneX } from "d3-shape";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);



function getMaxUndefined(calculators) {
	return calculators
		.map(each => each.undefinedLength())
		.reduce((a, b) => Math.max(a, b));
}
const LENGTH_TO_SHOW = 180;

class CandleStickChartPanToLoadMore extends React.Component {
	constructor(props) {
		super(props);
		const { data: inputData } = props;

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d, c) => {
				d.ema12 = c;
			})
			.accessor(d => d.ema12);

		const maxWindowSize = getMaxUndefined([
			ema12,
		]);
		/* SERVER - START */
		const dataToCalculate = inputData.slice(-LENGTH_TO_SHOW - maxWindowSize);

		const calculatedData =
			ema12(dataToCalculate
			);
		const indexCalculator = discontinuousTimeScaleProviderBuilder().indexCalculator();

		// console.log(inputData.length, dataToCalculate.length, maxWindowSize)
		const { index } = indexCalculator(calculatedData);
		// /* SERVER - END */

		const xScaleProvider = discontinuousTimeScaleProviderBuilder().withIndex(
			index
		);
		const {
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		} = xScaleProvider(calculatedData.slice(-LENGTH_TO_SHOW));

		// console.log(head(linearData), last(linearData))
		// console.log(linearData.length)

		this.state = {
			ema12,
			linearData,
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor,
			initialIndex: 0
		};
		this.handleDownloadMore = this.handleDownloadMore.bind(this);
	}

	saveCanvas = node => {
		this.canvas = node;
	};
	append = newData => {
		const {
			ema12,
			initialIndex
		} = this.state;

		const maxWindowSize = getMaxUndefined([
			ema12,
		]);
		/* SERVER - START */
		const dataToCalculate = newData.slice(
			-this.canvas.fullData.length - maxWindowSize
		);

		const calculatedData =
			ema12(dataToCalculate
			);
		const indexCalculator = discontinuousTimeScaleProviderBuilder()
			.initialIndex(initialIndex)
			.indexCalculator();

		// console.log(inputData.length, dataToCalculate.length, maxWindowSize)
		const { index } = indexCalculator(calculatedData);
		/* SERVER - END */

		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
			.initialIndex(initialIndex)
			.withIndex(index);
		const {
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		} = xScaleProvider(calculatedData.slice(-this.canvas.fullData.length));

		// console.log(head(linearData), last(linearData))
		// console.log(linearData.length)

		this.setState({
			ema12,
			linearData,
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		});
	};
	componentWillReceiveProps(nextProps) {
		this.append(nextProps.data);
	}
	handleDownloadMore(start, end) {
		if (Math.ceil(start) === end) return;
		// console.log("rows to download", rowsToDownload, start, end)
		const {
			data: prevData,
			ema12,
		} = this.state;
		const { data: inputData } = this.props;

		if (inputData.length === prevData.length) return;

		const rowsToDownload = end - Math.ceil(start);

		const maxWindowSize = getMaxUndefined([
			ema12,
		]);

		/* SERVER - START */
		const dataToCalculate = inputData.slice(
			-rowsToDownload - maxWindowSize - prevData.length,
			-prevData.length
		);

		const calculatedData =
			ema12(dataToCalculate)
		const indexCalculator = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.indexCalculator();
		const { index } = indexCalculator(
			calculatedData.slice(-rowsToDownload).concat(prevData)
		);
		/* SERVER - END */

		const xScaleProvider = discontinuousTimeScaleProviderBuilder()
			.initialIndex(Math.ceil(start))
			.withIndex(index);

		const {
			data: linearData,
			xScale,
			xAccessor,
			displayXAccessor
		} = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));

		// console.log(linearData.length)
		setTimeout(() => {
			// simulate a lag for ajax
			this.setState({
				data: linearData,
				xScale,
				xAccessor,
				displayXAccessor,
				initialIndex: Math.ceil(start)
			});
		}, 300);
	}
	render() {
		const { type, width, height, ratio } = this.props;
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor
		} = this.state;

		
		return (
			<ChartCanvas
				ratio={ratio}
				width={width}
				height={height}
				margin={{ left: 50, right: 85, top: 20, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				onLoadMore={this.handleDownloadMore}
				ref={node => {
					this.saveCanvas(node);
				}}
			>
				<Chart id={0} yExtents={d => {
					//console.log(d.open)
					return d.price
				}}>
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={6} />
					<YAxis axisAt="left" orient="left" />
					<AreaSeries
						yAccessor={d => d.price}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>

					<PriceCoordinate
						at="right"
						orient="right"
						price={data[data.length - 1].price}
						stroke="#3490DC"
						strokeWidth={1}
						fill="#FFFFFF"
						textFill="#22292F"
						arrowWidth={7}
						strokeDasharray="ShortDash"
						displayFormat={format(".2f")}
					/>

				</Chart>
			</ChartCanvas>
		)
	}
}

/*

*/


CandleStickChartPanToLoadMore = fitDimensions(CandleStickChartPanToLoadMore);

export default CandleStickChartPanToLoadMore;
