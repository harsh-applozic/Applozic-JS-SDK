import React from 'react';
import { ProvideApplozicClient } from '../../providers/useApplozicClient';
import { ViewProps } from '../ViewProps';
import PluginViewWithLogin from './PluginViewWithLogin';
import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import PluginViewToggle from './PluginViewToggle';
import { useDimensions } from '../../utils/useDimensions';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const PluginViewWithoutBase = ({
  applicationId,
  giphyApiKey,
  gMapsApiKey,
  ...rest
}: ViewProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '300px',
          background: '#fff'
        }}
        variants={sidebar}
      />
      <motion.div variants={variants}>
        {isOpen && (
          <ProvideApplozicClient
            applicationId={applicationId}
            giphyApiKey={giphyApiKey}
            gMapsApiKey={gMapsApiKey}
          >
            <PluginViewWithLogin {...rest} />
          </ProvideApplozicClient>
        )}
      </motion.div>
      <PluginViewToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default PluginViewWithoutBase;