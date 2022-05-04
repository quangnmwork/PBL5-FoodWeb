import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Text,
  useDisclosure,
  Flex,
  TableContainer,
  Table,
  Tr,
  Td,
  Image,
  Input,
  Tbody,
  Textarea
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { Food } from '../../models/Food.model';

import ModalCustom from '../Modal/ModalCustom';
interface SellerFoodItemEditProps {
  food: Food;
}
const SellerFoodItemEdit = (props: SellerFoodItemEditProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<EditIcon />} onClick={onOpen}>
        Chỉnh sửa
      </Button>
      <ModalCustom
        header={<Text fontWeight={'bold'}>Chỉnh sửa món ăn</Text>}
        onClose={onClose}
        isOpen={isOpen}
        footer={
          <Flex>
            <Button leftIcon={<AiOutlineSave />}>Lưu</Button>
          </Flex>
        }
        body={
          <TableContainer>
            <Table variant={'unstyled'}>
              <Tbody>
                <Tr>
                  <Td>Tên món ăn</Td>
                  <Input defaultValue={props.food.nameFood} />
                </Tr>
                <Tr>
                  <Td>Giá</Td>
                  <Input defaultValue={props.food.priceFood} />
                </Tr>
                <Tr>
                  <Td py={'1rem'}>Mô tả món ăn</Td>
                  <Td padding={'0'} py={'1rem'}>
                    <Textarea
                      focusBorderColor={'main.100'}
                      defaultValue={props.food.descriptionFood}
                      minHeight={'10rem'}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Ảnh trưng bày</Td>
                  <Td padding={'0'}>
                    <Input
                      type={'file'}
                      accept={'image/*'}
                      paddingTop={'0.3rem'}
                      paddingLeft={'0.1rem'}
                    />
                  </Td>
                </Tr>

                <Tr>
                  <Td></Td>
                  <Td padding={'0'} width={'100%'}>
                    <Image src={props.food.imageFood} />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        }
      />
    </>
  );
};

export default SellerFoodItemEdit;
