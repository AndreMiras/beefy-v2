import type { Theme } from '@material-ui/core';

const arrowWidth = 12;
const arrowHeight = 8;

export const styles = (theme: Theme) => ({
  trigger: {
    display: 'inline-flex',
  },
  tooltip: {
    minWidth: `${arrowWidth * 3}px`,
    maxWidth: 'min(calc(100% - 16px), 440px)',
    zIndex: 1301, // Modal is 1300
    '&[x-placement*="top"]': {
      marginBottom: `${arrowHeight}px`,
      '& $arrow': {
        bottom: `-${arrowHeight}px`,
        '&::before': {
          borderWidth: `${arrowHeight}px ${arrowWidth / 2}px 0 ${arrowWidth / 2}px`,
          borderColor: 'currentColor transparent transparent transparent',
        },
      },
    },
    '&[x-placement*="bottom"]': {
      marginTop: `${arrowHeight}px`,
      '& $arrow': {
        top: `-${arrowHeight}px`,
        '&::before': {
          borderWidth: `0 ${arrowWidth / 2}px ${arrowHeight}px ${arrowWidth / 2}px`,
          borderColor: 'transparent transparent currentColor transparent',
        },
      },
    },
    '&[x-placement*="left"]': {
      marginRight: `${arrowHeight}px`,
      '& $arrow': {
        right: `-${arrowHeight}px`,
        '&::before': {
          borderWidth: `${arrowWidth / 2}px 0 ${arrowWidth / 2}px ${arrowHeight}px`,
          borderColor: ' transparent transparent transparent currentColor',
        },
      },
    },
    '&[x-placement*="right"]': {
      marginLeft: `${arrowHeight}px`,
      '& $arrow': {
        left: `-${arrowHeight}px`,
        '&::before': {
          borderWidth: `${arrowWidth / 2}px ${arrowHeight}px ${arrowWidth / 2}px 0`,
          borderColor: 'transparent currentColor transparent transparent',
        },
      },
    },
    '&[x-placement*="top"], &[x-placement*="bottom"]': {
      '&[x-placement*="-start"] $content': {
        marginLeft: `-${arrowWidth / 2}px`,
      },
      '&[x-placement*="-end"] $content': {
        marginRight: `-${arrowWidth / 2}px`,
      },
    },
    '&[x-placement*="left"], &[x-placement*="right"]': {
      '&[x-placement*="-start"] $content': {
        marginTop: `-${arrowWidth / 2}px`,
      },
      '&[x-placement*="-end"] $content': {
        marginBottom: `-${arrowWidth / 2}px`,
      },
    },
  },
  arrow: {
    position: 'absolute' as const,
    zIndex: 15,
    color: 'var(--tooltip-background-color, #fff)',
    '&::before': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  content: {
    ...theme.typography['body-lg'],
    color: 'var(--tooltip-title-color, #000)',
    background: 'var(--tooltip-background-color, #fff)',
    padding:
      'var(--tooltip-content-vertical-padding, 12px) var(--tooltip-content-horizontal-padding, 16px)',
    borderRadius: 'var(--tooltip-content-border-radius, 8px)',
    textAlign: 'left' as const,
    boxShadow: '0px 4px 8px 8px rgba(0, 0, 0, 0.2)',
  },
  basicTitle: {
    ...theme.typography['body-lg-med'],
    fontSize: `var(--tooltip-body-font-size, ${theme.typography['body-lg-med'].fontSize})`,
    color: 'var(--tooltip-title-color, #000)',
    '& + $basicContent': {
      marginTop: 'var(--tooltip-content-vertical-gap, 8px)',
    },
  },
  basicContent: {
    ...theme.typography['body-lg'],
    fontSize: `var(--tooltip-body-font-size, ${theme.typography['body-lg'].fontSize})`,
    color: 'var(--tooltip-content-color, #000)',
  },
  icon: {
    color: 'var(--tooltip-icon-color, inherit)',
    fontSize: 'var(--tooltip-icon-size, 20px)',
    width: 'var(--tooltip-icon-size, 20px)',
    height: 'var(--tooltip-icon-size, 20px)',
    '& .MuiSvgIcon-root': {
      fontSize: 'inherit',
      display: 'block',
    },
  },
  dark: {
    '--tooltip-background-color': theme.palette.tooltip.dark.background,
    '--tooltip-title-color': theme.palette.tooltip.dark.text.title,
    '--tooltip-content-color': theme.palette.tooltip.dark.text.content,
    '--tooltip-value-color': theme.palette.tooltip.dark.text.value,
    '--tooltip-label-color': theme.palette.tooltip.dark.text.label,
    '--tooltip-link-color': theme.palette.tooltip.dark.text.link,
  },
  compact: {
    '--tooltip-content-vertical-padding': '8px',
    '--tooltip-content-horizontal-padding': '8px',
    '--tooltip-content-vertical-gap': '4px',
    '--tooltip-content-horizontal-gap': '12px',
    '--tooltip-content-border-radius': '4px',
    '--tooltip-body-font-size': theme.typography['body-sm'].fontSize,
    '--tooltip-subline-font-size': theme.typography['subline-sm'].fontSize,
  },
});
