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
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { sellerAPI } from '../../api/repositoryFactory';
import { Food } from '../../models/Food.model';
import { categories, returnIdCategory } from '../../utils/constants';

import ModalCustom from '../Modal/ModalCustom';
interface SellerFoodItemEditProps {
  food: Food;
  onChange?: any;
}

const SellerFoodItemEdit = (props: SellerFoodItemEditProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectAvatar, setSelectAvatar] = useState<File | undefined>();
  const [currentAvatar, setCurrentAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const nameRef = React.createRef<HTMLInputElement>();
  const priceRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const typeRef = React.createRef<HTMLSelectElement>();
  const toast = useToast();
  const onImageUploadChanging = (event: any) => {
    const currentTarget = event.target as HTMLInputElement;
    if (!currentTarget.files || currentTarget.files.length == 0) {
      setSelectAvatar(undefined);
      return;
    } else setSelectAvatar(currentTarget.files[0]);
    const url = URL.createObjectURL(currentTarget.files[0]);
    setCurrentAvatar(url);
  };
  useEffect(() => {
    if (!selectAvatar) return;
    return () => URL.revokeObjectURL(URL.createObjectURL(selectAvatar));
  }, [selectAvatar]);
  const onEditFood = async () => {
    try {
      setLoading(true);
      const foodData = new FormData();
      foodData.append('NameFood', nameRef.current?.value || '');
      foodData.append('PriceFood', priceRef.current?.value || '');
      foodData.append('DescriptionFood', descriptionRef.current?.value || '');
      foodData.append(
        'CategoryId',
        returnIdCategory(typeRef.current?.value || 'Đồ ăn').toString()
      );
      if (selectAvatar) {
        foodData.append('ImageFood', selectAvatar);
      }
      await sellerAPI.editFood(props.food.idFood, foodData);
      toast({
        status: 'success',
        title: 'Cập nhật thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        status: 'error',
        title: 'Có lỗi xảy ra , vui lòng thử lại',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });
    }
  };
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
            <Button
              leftIcon={<AiOutlineSave />}
              isLoading={loading}
              onClick={onEditFood}
            >
              Lưu
            </Button>
          </Flex>
        }
        body={
          <TableContainer>
            <Table variant={'unstyled'}>
              <Tbody>
                <Tr>
                  <Td>Tên món ăn</Td>
                  <Input defaultValue={props.food.nameFood} ref={nameRef} />
                </Tr>
                <Tr>
                  <Td>Giá</Td>
                  <Input defaultValue={props.food.priceFood} ref={priceRef} />
                </Tr>
                <Tr>
                  <Td py={'1rem'}>Mô tả món ăn</Td>
                  <Td padding={'0'} py={'1rem'}>
                    <Textarea
                      focusBorderColor={'main.100'}
                      defaultValue={props.food.descriptionFood}
                      minHeight={'10rem'}
                      ref={descriptionRef}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Phân loại</Td>
                  <Td padding={'0'}>
                    <Select
                      defaultValue={props.food.nameCategory}
                      ref={typeRef}
                    >
                      {categories.map((category, index) => (
                        <option value={category.idCategory} key={index}>
                          {category.nameCategory}
                        </option>
                      ))}
                    </Select>
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
                      onChange={onImageUploadChanging}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td padding={'0'} width={'100%'}>
                    <Image
                      src={currentAvatar || props.food.imageFood}
                      maxHeight={'5rem'}
                    />
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
