import Tooltip from 'material-ui/internal/Tooltip';
import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {CanvasJSChart} from 'canvasjs-react-charts'


export default class Stat extends Component{

    
  render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Statistic by age"
			},
      labels:['traité','10-20'],
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: [
					{ y: 0, label: "childs" },
					{ y: 3, label: "young" },
					{ y: 0, label: "older" }
				
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

  