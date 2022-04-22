import { Box, useStyleConfig } from '@chakra-ui/react';

const CustomCard = (props: any) => {
  const { ...rest } = props;
  const styles = useStyleConfig('Card');
  return <Box __css={styles} {...rest}></Box>;
};

export default CustomCard;
