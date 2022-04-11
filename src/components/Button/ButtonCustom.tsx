import { Button } from '@chakra-ui/react';
import React from 'react';
import { ComponentEvent } from '../../models/ComponentEvent.model';

interface ButtonProps extends ComponentEvent<HTMLButtonElement> {
  textDisplay: string;
  width?: string;
}
const ButtonCustom = (props: ButtonProps) => {
  return (
    <Button onClick={props.onClick} width={props.width}>
      {props.textDisplay}
    </Button>
  );
};

export default ButtonCustom;
