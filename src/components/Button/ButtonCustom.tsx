import { Button } from '@chakra-ui/react';
import React from 'react';

interface ButtonProps {
  textDisplay: string;
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}
const ButtonCustom = (props: ButtonProps) => {
  return <Button onClick={props.onClick}>{props.textDisplay}</Button>;
};

export default ButtonCustom;
