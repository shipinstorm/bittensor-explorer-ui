/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import Chart from "react-apexcharts";

import LoadingSpinner from "../../assets/loading.svg";
import verifiedDelegates from "../../delegates.json";
import { useMemo } from "react";
import { nFormatter, rawAmountToDecimal } from "../../utils/number";
import {
	AccountDelegateHistory,
	AccountDelegateHistoryResponse,
} from "../../model/accountDelegateHistory";
import { DelegateInfo } from "../../model/delegate";

const spinnerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export type AccounDelegateHistoryChartProps = {
	delegateHistory: AccountDelegateHistoryResponse;
};

export const AccounDelegateHistoryChart = (
	props: AccounDelegateHistoryChartProps
) => {
	const theme = useTheme();

	const { delegateHistory } = props;

	const loading = delegateHistory.loading;
	const timestamps = useMemo(() => {
		if (!delegateHistory.data) return [];
		const resp = (delegateHistory.data as any).reduce(
			(prev: string[], cur: AccountDelegateHistory) => {
				if(prev.find(x => x === cur.timestamp) === undefined)
					prev.push(cur.timestamp);
				return prev;
			},
			[]
		);
		return resp;
	}, [delegateHistory]);

	const maxDelegate = useMemo(() => {
		if (!delegateHistory.data) return 0;
		const resp = (delegateHistory.data as any).reduce(
			(prev: number, cur: AccountDelegateHistory) => {
				const now = rawAmountToDecimal(cur.amount.toString()).toNumber();
				return now > prev ? now : prev;
			},
			0
		);
		return resp;
	}, [delegateHistory]);

	const delegates = useMemo(() => {
		if (!delegateHistory.data) return [];
		const resp = (delegateHistory.data as any).reduce(
			(prev: ApexAxisChartSeries, cur: AccountDelegateHistory) => {
				const info = (verifiedDelegates as Record<string, DelegateInfo>)[cur.delegate];
				const delegate = info?.name || cur.delegate;
				let serie = prev.find((x) => x.name === delegate);
				if (serie === undefined)
					prev.push({
						name: delegate,
						type: "area",
						data: [],
					});
				serie = prev.find((x) => x.name === delegate);
				serie?.data.push({
					x: cur.timestamp,
					y: rawAmountToDecimal(cur.amount.toString()).toNumber(),
				} as any);
				return prev;
			},
			[]
		);
		return resp;
	}, [delegateHistory]);

	return loading ? (
		<div css={spinnerContainer}>
			<img src={LoadingSpinner} />
		</div>
	) : (
		<Chart
			height={400}
			series={delegates}
			options={{
				chart: {
					toolbar: {
						show: true,
					},
					zoom: {
						enabled: false,
					},
				},
				colors: [
					theme.palette.error.main,
					theme.palette.success.main,
					theme.palette.neutral.main,
				],
				dataLabels: {
					enabled: false,
				},
				fill: {
					type: "gradient",
					gradient: {
						shade: "dark",
						shadeIntensity: 1,
						inverseColors: false,
						type: "vertical",
						opacityFrom: 0.6,
						opacityTo: 0.1,
						stops: [0, 90, 100],
					},
				},
				grid: {
					show: false,
				},
				labels: timestamps,
				legend: {
					show: false,
				},
				markers: {
					size: 0,
				},
				noData: {
					text: "Loading ...",
					align: "center",
					verticalAlign: "middle",
					offsetX: 0,
					offsetY: 0,
					style: {
						color: "#FFFFFF",
					},
				},
				responsive: [
					{
						breakpoint: 767,
						options: {
							chart: {
								height: 320,
							},
						},
					},
					{
						breakpoint: 599,
						options: {
							chart: {
								height: 270,
							},
						},
					},
				],
				stroke: {
					width: 1,
				},
				tooltip: {
					theme: "dark",
					shared: true,
					intersect: false,
					x: {
						format: "dd MMM yy",
					},
					y: {
						formatter: (val: number) => nFormatter(val, 2).toString(),
					},
				},
				xaxis: {
					axisTicks: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					labels: {
						style: {
							fontSize: "11px",
							colors: "#7F7F7F",
						},
					},
					type: "datetime",
				},
				yaxis: {
					labels: {
						style: {
							colors: "#a8a8a8",
						},
						formatter: (val: number) => nFormatter(val, 2).toString(),
					},
					axisTicks: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					min: 0,
					max: maxDelegate,
				},
			}}
		/>
	);
};
