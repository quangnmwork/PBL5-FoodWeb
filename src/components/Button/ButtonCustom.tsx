import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface ButtonProp extends ButtonProps {
  textDisplay: string;
  width?: string;
  isLoading?: boolean;
}
const ButtonCustom = (props: ButtonProp) => {
  const { textDisplay, ...rest } = props;
  return (
    <Button width={props.width} isLoading={props.isLoading} {...rest}>
      {textDisplay || ''}
    </Button>
  );
};

export default ButtonCustom;
