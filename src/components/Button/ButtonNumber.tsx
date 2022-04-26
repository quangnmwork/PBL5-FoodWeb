import {
  Flex,
  IconButton,
  Input,
  Box,
  useControllableState
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface ButtonNumberProps {
  value?: number;
}

const ButtonNumber = React.forwardRef<HTMLInputElement, ButtonNumberProps>(
  (props, ref) => {
    const [value, setValue] = useControllableState({
      defaultValue: props.value || 1
    });
    const handlerCurrentValue = (isIncrease: boolean) => {
      if (isIncrease) {
        setValue(value + 1);
      } else {
        setValue(value - 1);
      }
    };
    console.log(value);
    return (
      <Flex alignItems={'center'}>
        <IconButton
          aria-label="minus"
          icon={<AiOutlineMinus />}
          onClick={() => {
            handlerCurrentValue(false);
          }}
        ></IconButton>
        <Box minWidth={'30%'}>
          <Input
            ref={ref}
            defaultValue={value}
            htmlSize={value.toString().length}
            value={value || '1'}
            padding={'0'}
            textAlign={'center'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(parseInt(event.target.value));
            }}
          />
        </Box>
        <IconButton
          aria-label="plus"
          icon={<AiOutlinePlus />}
          onClick={() => {
            handlerCurrentValue(true);
          }}
        ></IconButton>
      </Flex>
    );
  }
);
ButtonNumber.displayName = 'ButtonNumber';
export default ButtonNumber;
