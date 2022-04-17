import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface ButtonProp extends ButtonProps {
  textDisplay: string;
  width?: string;
  isLoading?: boolean;
}
const ButtonCustom = (props: ButtonProp) => {
  const { ...rest } = props;
  return (
    <Button width={props.width} isLoading={props.isLoading} {...rest}>
      {props.textDisplay || ''}
    </Button>
  );
};

export default ButtonCustom;
