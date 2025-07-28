import React from 'react';
import { Tooltip, type TooltipProps, Fade } from '@mui/material';

interface CustomTooltipProps extends Omit<TooltipProps, 'componentsProps'> {
  // Custom styling options
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string | number;
  padding?: string;
  boxShadow?: string;
  backdropFilter?: string;
  maxWidth?: string;

  // Arrow options
  showArrow?: boolean;
  arrowColor?: string;

  // Animation options
  transitionDuration?: number;

  // Override componentsProps if needed
  customComponentsProps?: TooltipProps['componentsProps'];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  title,
  placement = 'bottom',
  TransitionComponent = Fade,

  // Custom styling props with defaults
  backgroundColor = 'rgba(0, 0, 0, 0.9)',
  textColor = 'white',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  borderRadius = '8px',
  fontSize = '0.75rem',
  fontWeight = 500,
  padding = '8px 12px',
  boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter = 'blur(12px)',
  maxWidth = 'none',

  // Arrow options
  showArrow = false,
  arrowColor,

  // Animation options
  transitionDuration = 300,

  // Custom overrides
  customComponentsProps,

  // All other MUI Tooltip props
  ...otherProps
}) => {
  // Build the tooltip styles
  const tooltipStyles = {
    tooltip: {
      backgroundColor,
      color: textColor,
      border: borderColor ? `1px solid ${borderColor}` : 'none',
      borderRadius,
      fontSize,
      fontWeight,
      padding,
      boxShadow,
      backdropFilter,
      maxWidth,
      // Allow WebKit prefix for better browser support
      WebkitBackdropFilter: backdropFilter,
    },
    arrow: showArrow
      ? {
          color: arrowColor || backgroundColor,
        }
      : {
          display: 'none',
        },
  };

  // Merge custom styles with any provided componentsProps
  const finalComponentsProps = customComponentsProps
    ? {
        ...customComponentsProps,
        tooltip: {
          ...tooltipStyles.tooltip,
          ...customComponentsProps.tooltip,
        },
        arrow: {
          ...tooltipStyles.arrow,
          ...customComponentsProps.arrow,
        },
      }
    : {
        tooltip: tooltipStyles.tooltip,
        arrow: tooltipStyles.arrow,
      };

  const TransitionProps = { timeout: transitionDuration };

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow={showArrow}
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      componentsProps={finalComponentsProps}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
