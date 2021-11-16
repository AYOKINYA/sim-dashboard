import {resolve} from 'chart.js/helpers'
import {utils} from './utils';

function drawDoughnutLabel(chart) {

	if (chart.chartArea && chart._metasets.length) {

		const inputs = chart._metasets[0].label.split('-');
		const fontColor = inputs[0] === 'receipt' ? 'rgba(242,197,19,1)' : 'rgba(0,44,95,1)'
		const textValue = parseInt(inputs[1]);

		const values = {
			font: 'Nanum Barun Gothic Bold', 
			color: fontColor,
			labels: [
			{
				text: textValue,
				font: {
					family: 'Nanum Barun Gothic Bold',
					size: '100'
				},
				color: fontColor
			},
			{
				text: "sec",
				font: {
					family: 'Nanum Barun Gothic Bold',
					size: '24'
				},
			},
			]
		};

		const {ctx, chartArea: {top, right, bottom, left}} = chart;
		const { labels } = values;
		const color = utils.defaults.font.color;

		ctx.save();
		const innerLabels = [];
		labels.forEach(function (label) {
			const text =
			typeof label.text === "function" ? label.text(chart) : label.text;
			const innerLabel = {
				text: text,
				font: utils.parseFont(resolve([label.font, values.font, {}], ctx, 0)),
				color: resolve(
					[label.color, values.color, color],
					ctx,
					0
				),
		};
			innerLabels.push(innerLabel);
		});

		let textAreaSize = utils.textSize(ctx, innerLabels);

		// Calculate the adjustment ratio to fit the text area into the doughnut inner circle
		const hypotenuse = Math.sqrt(
			Math.pow(textAreaSize.width, 2) + Math.pow(textAreaSize.height, 2)
		);
		const innerDiameter =  chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2;
		const fitRatio = innerDiameter / hypotenuse;

		// Adjust the font if necessary and recalculate the text area after applying the fit ratio
		if (fitRatio < 1) {
			innerLabels.forEach(function (innerLabel) {
				innerLabel.font.size = Math.floor(innerLabel.font.size * fitRatio);
				innerLabel.font.lineHeight = undefined;
				innerLabel.font = utils.parseFont(
					resolve([innerLabel.font, {}], ctx, 0)
				);
			});
			textAreaSize = utils.textSize(ctx, innerLabels);
		}

		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// The center of the inner circle
		const centerX = (left + right) / 2;
		const centerY = (top + bottom) / 2;

		// The top Y coordinate of the text area
		const topY = centerY - textAreaSize.height / 2;

		let i;
		const ilen = innerLabels.length;
		let currentHeight = 0;
		for (i = 0; i < ilen; ++i) {
			ctx.fillStyle = innerLabels[i].color;
			ctx.font = innerLabels[i].font.string;

			// The Y center of each line
			const lineCenterY =
				topY + innerLabels[i].font.lineHeight / 2 + currentHeight;
			currentHeight += innerLabels[i].font.lineHeight;

			// Draw each line of text
			ctx.fillText(innerLabels[i].text, centerX, lineCenterY);
		}

	}
}

export default drawDoughnutLabel;