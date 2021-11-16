function drawLineTooltip (chart) {
  if (chart.chartArea) {
		const {ctx} = chart;
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoint = chart.tooltip._active[0];
      const { x } = activePoint.element;
      const topY = activePoint.element.cp2y > activePoint.element.cp1y ? activePoint.element.cp2y : activePoint.element.cp1y;
      const bottomY = chart.scales.yAxes.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 3]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(141,161,185,1)';
      ctx.stroke();
      ctx.restore();
    }
	}
} 
export default drawLineTooltip;
