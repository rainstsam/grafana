import React, { FC } from 'react';
import { ReactTableCellProps, TableCellDisplayMode } from './types';
import { BarGauge, BarGaugeDisplayMode } from '../BarGauge/BarGauge';
import { Scale, ScaleMode, VizOrientation } from '@grafana/data';

const defaultScale: Scale = {
  mode: ScaleMode.Absolute,
  thresholds: [
    {
      color: 'blue',
      value: -Infinity,
    },
    {
      color: 'green',
      value: 20,
    },
  ],
};

export const BarGaugeCell: FC<ReactTableCellProps> = props => {
  const { column, tableStyles, cell } = props;
  const { field } = column;

  if (!field.display) {
    return null;
  }

  const displayValue = field.display(cell.value);
  let barGaugeMode = BarGaugeDisplayMode.Gradient;

  if (field.config.custom && field.config.custom.displayMode === TableCellDisplayMode.LcdGauge) {
    barGaugeMode = BarGaugeDisplayMode.Lcd;
  }

  const { scale } = field.config;

  return (
    <div className={tableStyles.tableCell}>
      <BarGauge
        width={column.width - tableStyles.cellPadding * 2}
        height={tableStyles.cellHeightInner}
        scale={scale || defaultScale}
        value={displayValue}
        maxValue={field.config.max || 100}
        minValue={field.config.min || 0}
        orientation={VizOrientation.Horizontal}
        theme={tableStyles.theme}
        itemSpacing={1}
        lcdCellWidth={8}
        displayMode={barGaugeMode}
      />
    </div>
  );
};
