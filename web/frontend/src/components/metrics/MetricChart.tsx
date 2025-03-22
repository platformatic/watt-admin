import React, { useEffect, useRef, useState } from 'react'
import styles from './MetricChart.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import * as d3 from 'd3'
import colorSetMem from './memory.module.css'
import colorSetCpu from './cpu.module.css'
import colorSetReq from './req.module.css'
import colorSetLatency from './latency.module.css'
import { xMargin, yMargin, yMarginWithoutXAxis, radiusDotsTooltip } from './chart_constants'
import { getTicks } from './utils'
import { POSITION_ABSOLUTE, POSITION_FIXED } from '../../ui-constants'
import { findY } from './chart_utils'
import { MetricType } from '../application/NodeJSMetric'

type Point = Date | number[] | number

export interface DataPoint {
  time: Date;
  values: number[];
  [key: string]: Point
}

interface LabelObject {
  name: string;
  value: string;
}

interface D3Event extends MouseEvent {
  clientX: number;
}

type Label = string | LabelObject

interface MetricChartProps {
  data: DataPoint[];
  unit: string;
  timeline: boolean;
  labels: Label[];
  colorSet: MetricType;
  percentiles?: Record<string, string>;
  lowerMaxY: number;
  tooltipPosition: string;
}

type D3Selection<T extends d3.BaseType, D = unknown> = d3.Selection<T, D, null, undefined>
type D3SVGSelection = D3Selection<SVGSVGElement>
type D3SVGPathElement = SVGPathElement & { getTotalLength(): number }
type D3SVGCircleSelection = D3Selection<SVGCircleElement>

const getNum = (point: Point) => typeof point === 'number' ? point : 0

export const getMetricColor = (metricType: MetricType) => {
  let colorStyles: Record<string, string>
  switch (metricType) {
    case 'mem':
      colorStyles = colorSetMem
      break
    case 'cpu':
      colorStyles = colorSetCpu
      break
    case 'req':
      colorStyles = colorSetReq
      break
    case 'latency':
      colorStyles = colorSetLatency
      break
    default:
      throw new Error(`Unhandled metric type: ${metricType}`)
  }
  return colorStyles
}

const MetricChart: React.FC<MetricChartProps> = ({
  data,
  unit,
  timeline,
  labels,
  colorSet,
  percentiles,
  lowerMaxY,
  tooltipPosition
}: MetricChartProps) => {
  const yMin = 0
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const keyForCheckMax = 'p99'

  const colorStyles = getMetricColor(colorSet)
  const numberOfLines = labels.length

  // We assume the data is an array of objects with a time and a value
  // The setter is missing on purpose. We don't want to trigger a rerender when the mouse position changes
  const [mousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (svgRef.current && tooltipRef.current && data.length > 0) {
      const h = svgRef.current.clientHeight
      const w = svgRef.current.clientWidth
      const marginOnY = timeline ? yMargin : yMarginWithoutXAxis

      const svg: D3SVGSelection = d3.select(svgRef.current)
      const tooltip: D3Selection<HTMLDivElement> = d3.select(tooltipRef.current)

      svg.selectAll('*').remove() // clean up the svg

      const effectiveWidth = w - (xMargin)
      const y = d3.scaleLinear<number>().domain([yMin, 0]).range([h - marginOnY, 0])
      const x = d3.scaleTime<number>().domain([new Date(), new Date()]).range([xMargin, w])

      // We need to slice it here otherwise we cannot pause / resume the chart scrolling
      const latestData = [...data]
      const firstDatum = latestData[0]
      const lastDatum = latestData[latestData.length - 1]
      const firstTime = firstDatum.time
      const lastTime = lastDatum.time
      x.domain([firstTime, lastTime])

      if (percentiles) {
        latestData.shift()
      }

      // We need to get the max y for all values to correctly set the y domain
      let allCurrentValues: number[] = []
      if (percentiles) {
        allCurrentValues = [100]
        for (let i = 0; i < latestData.length; i++) {
          const val = latestData[i][keyForCheckMax]
          if (typeof val === 'number') {
            allCurrentValues.push(val)
          }
        }
      } else {
        for (let i = 0; i < latestData.length; i++) {
          if (latestData[i].values) {
            const filteredValues = latestData[i].values?.filter(v => v !== undefined && v !== null)
            if (filteredValues) {
              allCurrentValues.push(...filteredValues)
            }
          }
        }
      }

      const maxValue = Math.max(...allCurrentValues, lowerMaxY)
      const yMax = maxValue + (maxValue * 0.1) // We add 10% to the max to have some space on top
      y.domain([yMin, yMax])
      const yAxisTickValues = getTicks(yMin, maxValue, 2, false)

      const timeRange = lastTime.getTime() - firstTime.getTime()
      const numberOfTicks = 7
      const tickValues: Date[] = []
      for (let i = 0; i < numberOfTicks; i++) {
        const tickTime = new Date(firstTime.getTime() + (timeRange * (i / (numberOfTicks - 1))))
        tickValues.push(tickTime)
      }

      let yAxis = d3.axisLeft<number>(y).tickValues(yAxisTickValues)
      if (colorSet === 'req') {
        yAxis = yAxis.tickFormat(d => {
          if (d >= 1000000) {
            return (d / 1000000).toFixed(0) + 'M'
          } else if (d >= 1000) {
            return (d / 1000).toFixed(0) + 'K'
          } else {
            return d.toString()
          }
        })
      }

      svg.attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', `translate(${xMargin}, ${xMargin})`)

      const $yAxis = svg
        .append('g')
        .attr('transform', `translate(${xMargin})`)

      svg.append('g')
        .attr('class', styles.grid)
        .call(d3.axisLeft<number>(y).tickValues(yAxisTickValues).tickSize(-effectiveWidth).tickFormat(() => ''))
        .attr('transform', `translate(${xMargin})`)
        .call(g => g.select('.domain').remove())

      $yAxis
        .call(yAxis)
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick > line').remove())
        .attr('class', styles.axis)

      if (timeline) {
        const xAxis = d3.axisBottom<Date>(x)
          .tickValues(tickValues)
          .tickFormat(d3.timeFormat('%H:%M:%S'))
          .tickSizeOuter(0)

        const $xAxis = svg
          .append('g')
          .attr('transform', `translate(5, ${h - yMargin})`)

        $xAxis
          .call(xAxis)
          .call(g => g.select('.domain').remove())
          .call(g => g.selectAll('.tick > line').remove())
          .attr('class', styles.axis)
          .selectAll('text')
          .attr('dy', '1em')
          .style('text-anchor', 'start')
      }

      const paths: D3SVGPathElement[] = []
      const tooltipDots: D3SVGCircleSelection[] = []

      if (percentiles) {
        const chart = svg.selectAll<SVGElement, DataPoint>('.chart')
          .data(latestData)
          .enter()

        const barWidth = 2
        const barOffset = -(barWidth * 2)

        if (percentiles) {
          Object.keys(percentiles).forEach(percentile => {
            chart.append('rect')
              .attr('fill', percentiles[percentile])
              .attr('x', d => x(d.time) + barOffset)
              .attr('y', d => y(getNum(d[percentile])))
              .attr('width', barWidth)
              .attr('height', d => h - marginOnY - y(getNum(d[percentile])))
              .transition()
              .duration(1000)
          })
        }
      } else {
        for (let i = 0; i < numberOfLines; i++) {
          const dataToUse = latestData.filter(p =>
            p.values && i < p.values.length && p.values[i] > 0
          )
          if (dataToUse.length === 0) {
            continue
          }

          const pathNode = svg
            .append('path')
            .attr('class', `${styles.line} ${colorStyles[`color-${i}`]}`)
            .datum(latestData)
            .attr('d', d3.line<DataPoint>()
              .x(p => x(p.time))
              .y((p) => y(p.values && i < p.values.length ? p.values[i] || 0 : 0))
              .curve(d3.curveBasis)
            )
            .transition()
            .duration(1000)
            .node()

          // Only add the path if it exists
          if (pathNode) {
            paths.push(pathNode)
          }

          tooltipDots.push(svg
            .append('circle')
            .attr('r', 5)
            .attr('class', colorStyles[`color-${i}`])
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .style('pointer-events', 'none')
          )
        }
      }

      if (percentiles) {
        svg.on('mouseover pointermove', showBarTooltip)
          .on('pointerleave', hideBarTooltip)
        showBarTooltip()
      } else {
        svg.on('mouseover pointermove', showCircles)
          .on('pointerleave', hideCircles)
        showCircles()
      }

      function showCircles (event?: MouseEvent) {
        let xPos: number, yPos: number
        if (event) {
          [xPos, yPos] = d3.pointer(event)
          mousePosition.x = xPos
          mousePosition.y = yPos
        } else {
          if ((mousePosition.x === 0 && mousePosition.y === 0) || tooltipPosition === POSITION_FIXED) {
            return
          }
          xPos = mousePosition.x
          yPos = mousePosition.y
        }

        const time = (x.invert(xPos)).getTime()
        const closestIndex = d3.bisect(latestData.map(d => d.time.getTime()), time)
        const dataPoint = latestData[closestIndex - 1] || latestData[0]
        if (!dataPoint) {
          return
        }
        for (let i = 0; i < numberOfLines; i++) {
          const path = paths[i]
          if (!path) continue

          // if the pointer is out of the "data area"
          // (on the left or on the right)
          // hide the dots
          if (xPos < xMargin || xPos > (w - radiusDotsTooltip)) {
            tooltipDots[i].style('opacity', 0)
            continue
          }
          tooltipDots[i]
            .style('opacity', 1)
            .attr('cx', xPos)
            .attr('cy', findY(path, path.getTotalLength(), xPos, w))
            .raise()
        }

        // Prepare the tooltip
        const timeString = d3.timeFormat('%H:%M:%S.%L %p')(dataPoint.time)
        const valuesData = (dataPoint.values || []).map((v, i) => {
          return {
            label: typeof labels[i] === 'string' ? labels[i] : (labels[i]).name,
            value: Math.round((v || 0) * 100) / 100,
            colorSeparator: colorStyles[`background-color-${i}`]
          }
        })

        tooltip.html(`
        <div ${styles.tooltipContainer}>
          <div class="${styles.tooltipTime}">
            <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.time}">${timeString}</div>
          </div>
          <div class="${styles.tooltipTable}">
            ${valuesData.map(v => {
              return `
                <div class="${styles.tooltipLine}">
                  <div class="${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}">  
                    <hr class="${styles.verticalSeparatorTooltip} ${v.colorSeparator}" />
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack}">${v.label}</div>
                  </div>
                  <div class="${styles.tooltipValueContainer}">
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.tooltipValue}">${v.value}</div>
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.tooltipUnit}">${unit}</div>
                  </div>
                </div>
            `
            }).join('')}
          </div>
        </div>`)

        let maxY = 0
        if (dataPoint.values && dataPoint.values.length > 0) {
          const filteredValues = dataPoint.values.filter(v => v !== undefined && v !== null)
          maxY = filteredValues.length > 0
            ? y(Math.max(...filteredValues))
            : 0
        }

        displayTooltip(xPos, maxY, valuesData.length, event)
      }

      function hideCircles () {
        tooltipDots.forEach(t => t.style('opacity', 0))
        mousePosition.x = 0
        mousePosition.y = 0
        tooltip.style('opacity', 0)
      }

      function showBarTooltip (event?: MouseEvent) {
        let xPos: number, yPos: number
        if (event) {
          [xPos, yPos] = d3.pointer(event)
          mousePosition.x = xPos
          mousePosition.y = yPos
        } else {
          if ((mousePosition.x === 0 && mousePosition.y === 0) || tooltipPosition === POSITION_FIXED) {
            return
          }
          xPos = mousePosition.x
          yPos = mousePosition.y
        }

        const time = (x.invert(xPos)).getTime()
        const dataPoint = latestData.find(d => d.time.getTime() >= time)
        if (!dataPoint) {
          return
        }

        // Prepare the tooltip
        const timeString = d3.timeFormat('%H:%M:%S.%L %p')(dataPoint.time)

        const typedLabels = labels
        const valuesData = typedLabels.map((label, i) => {
          const name = typeof label === 'string' ? label : label.value
          return {
            name,
            value: Math.round(getNum(dataPoint[name]) * 100) / 100,
            colorSeparator: colorSetLatency[`background-color-${i}`]
          }
        })

        tooltip.html(`
        <div ${styles.tooltipContainer}>
          <div class="${styles.tooltipTime}">
            <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.time}">${timeString}</div>
          </div>
          <div class="${styles.tooltipTable}">
            ${valuesData.map(v => {
              return `
                <div class="${styles.tooltipLine}">
                  <div class="${commonStyles.tinyFlexRow} ${commonStyles.itemsCenter}">  
                    <hr class="${styles.verticalSeparatorTooltip} ${v.colorSeparator}" />
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack}">${v.name}</div>
                  </div>
                  <div class="${styles.tooltipValueContainer}">
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.tooltipValue}">${v.value}</div>
                    <div class="${typographyStyles.desktopBodySmallest} ${typographyStyles.textRichBlack} ${styles.tooltipUnit}">${unit}</div>
                  </div>
                </div>
            `
            }).join('')}
          </div>
        </div>`)

        const maxY = y(getNum(dataPoint[keyForCheckMax]))
        displayTooltip(xPos, maxY, valuesData.length, event)
      }

      function hideBarTooltip () {
        mousePosition.x = 0
        mousePosition.y = 0
        tooltip.style('opacity', 0)
      }

      function displayTooltip (xPos: number, maxY: number, itemsCount: number, event?: D3Event) {
        const tooltipWidth = 160
        const tooltipHeight = itemsCount * 15
        let tx = xPos + tooltipWidth < w ? xPos : w - tooltipWidth
        let ty = maxY - (tooltipHeight + 30)

        if (tooltipPosition === POSITION_FIXED && event && svgRef.current) {
          tx = event.clientX - (tooltipWidth / 2) - 50
          ty = svgRef.current.getBoundingClientRect().bottom - svgRef.current.getBoundingClientRect().height - tooltipHeight - 75 + maxY
        }

        tooltip.style('left', tx + 'px').style('top', ty + 'px')

        if (xPos < xMargin) {
          tooltip.style('opacity', 0)
        } else {
          tooltip.style('opacity', 0.9)
        }
      }
    }
  }, [svgRef, tooltipRef, data, percentiles, colorSet, labels, lowerMaxY, numberOfLines, percentiles, timeline, tooltipPosition, unit, yMin])

  return (
    <div className={`${commonStyles.tinyFlexBlock} ${commonStyles.fullWidth}`}>
      <svg
        ref={svgRef} style={{ width: '100%', height: '96px' }}
      />
      <div ref={tooltipRef} className={`${tooltipPosition === POSITION_ABSOLUTE ? styles.tooltipAbsolute : styles.tooltipFixed} ${styles.tooltip}`} />
    </div>
  )
}

export default MetricChart
