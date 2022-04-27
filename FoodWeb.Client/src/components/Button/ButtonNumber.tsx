/* eslint-disable react/prop-types */
import { Flex, IconButton, Input, Box, InputProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface ButtonNumberProps extends InputProps {
  value?: number;
  increase?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  decrease?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const ButtonNumber = React.forwardRef<HTMLInputElement, ButtonNumberProps>(
  (props, ref) => {
    const [value, setValue] = useState<number>(1);
    useEffect(() => {
      setValue(props.value || 1);
    }, [props.value]);
    const handlerIncreaseValue = (
      event: React.SyntheticEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setValue((prevValue) => prevValue + 1);
    };
    const handlerDecreaseValue = (
      event: React.SyntheticEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setValue((prevValue) => prevValue - 1);
    };
    const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseInt(event.target.value));
    };
    // console.log('SetValue', value);
    return (
      <Flex alignItems={'center'}>
        <IconButton
          aria-label="minus"
          icon={<AiOutlineMinus />}
          onClick={props.decrease || handlerDecreaseValue}
        ></IconButton>
        <Box width={'30%'}>
          <Input
            ref={ref}
            value={value > 0 ? value : 1}
            padding={'0'}
            textAlign={'center'}
            onChange={props.onChange || handlerOnChange}
          />
        </Box>
        <IconButton
          aria-label="plus"
          icon={<AiOutlinePlus />}
          onClick={props.increase || handlerIncreaseValue}
        ></IconButton>
      </Flex>
    );
  }
);
ButtonNumber.displayName = 'ButtonNumber';
export default ButtonNumber;
