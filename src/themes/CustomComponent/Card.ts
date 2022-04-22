const Card = {
  baseStyle: {
    display: 'block',
    boxShadow: 'md',
    background: 'white'
  },
  variants: {
    rounded: {
      borderRadius: 'xl',
      boxShadow: 'xl'
    },
    smooth: {
      borderRadius: '2px',
      boxShadow: 'md'
    }
  },
  // The default variant value
  defaultProps: {
    variant: 'smooth'
  }
};
export default Card;
