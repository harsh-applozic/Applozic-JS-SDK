import React from 'react';
import { ProvideBase } from '../..';
import { BaseProps } from '../../providers/useBase';
import { ViewProps } from '../ViewProps';

import FullViewWithoutBase from './FullViewWithoutBase';

export interface FullViewProps extends ViewProps, BaseProps {}

const FullView = ({
  colorMode,
  useSystemColorMode,
  environment,
  ...rest
}: FullViewProps) => {
  return (
    <ProvideBase
      colorMode={colorMode}
      useSystemColorMode={useSystemColorMode}
      environment={environment}
    >
      <FullViewWithoutBase {...rest} />
    </ProvideBase>
  );
};

export default FullView;
