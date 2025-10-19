// /**
//  * Fixes SVG attributes to be React-compliant
//  * @param {Object} props - The props object containing SVG attributes
//  * @returns {Object} - New props object with React-compliant attribute names
//  */
// export const fixSvgProps = (props) => {
//   if (!props) return {};
  
//   const newProps = { ...props };
  
//   // Convert kebab-case attributes to camelCase for React
//   if ('clip-rule' in newProps) {
//     newProps.clipRule = newProps['clip-rule'];
//     delete newProps['clip-rule'];
//   }
  
//   if ('fill-rule' in newProps) {
//     newProps.fillRule = newProps['fill-rule'];
//     delete newProps['fill-rule'];
//   }
  
//   if ('stroke-width' in newProps) {
//     newProps.strokeWidth = newProps['stroke-width'];
//     delete newProps['stroke-width'];
//   }
  
//   if ('stroke-linecap' in newProps) {
//     newProps.strokeLinecap = newProps['stroke-linecap'];
//     delete newProps['stroke-linecap'];
//   }
  
//   if ('stroke-linejoin' in newProps) {
//     newProps.strokeLinejoin = newProps['stroke-linejoin'];
//     delete newProps['stroke-linejoin'];
//   }
  
//   return newProps;
// };

// /**
//  * Wraps an SVG component to fix its props
//  * @param {React.Component} SvgComponent - The SVG component to wrap
//  * @returns {React.Component} - Wrapped component with fixed props
//  */
// export const withFixedSvgProps = (SvgComponent) => {
//   return (props) => {
//     const fixedProps = fixSvgProps(props);
//     return <SvgComponent {...fixedProps} />;
//   };
// };
