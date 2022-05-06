import { AddIcon } from '@chakra-ui/icons';
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
import { sellerAPI } from '../../api/repositoryFactory';
import { categories, returnIdCategory } from '../../utils/constants';
import ModalCustom from '../Modal/ModalCustom';
interface SellerFoodPostProps {
  onCreate?: any;
}
const SellerFoodPost = (props: SellerFoodPostProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = React.createRef<HTMLInputElement>();
  const priceRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const typeRef = React.createRef<HTMLSelectElement>();
  const [selectAvatar, setSelectAvatar] = useState<File | undefined>();
  const [currentAvatar, setCurrentAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
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
    return () => {
      URL.revokeObjectURL(URL.createObjectURL(selectAvatar));
    };
  }, [selectAvatar]);
  const onCreate = async () => {
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
      foodData.append('isHidden', 'false');
      if (selectAvatar) {
        foodData.append('ImageFood', selectAvatar);
      }
      console.log(foodData.getAll('DescriptionFood'));

      const res = await sellerAPI.createFood(foodData);
      props.onCreate(res.data.idFood);
      toast({
        status: 'success',
        title: 'Tạo món ăn thành công',
        position: 'bottom-right',
        duration: 1500,
        variant: 'subtle'
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);

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
      <Button leftIcon={<AddIcon />} onClick={onOpen}>
        Thêm món mới
      </Button>
      <ModalCustom
        header={<Text fontWeight={'bold'}>Chỉnh sửa món ăn</Text>}
        onClose={onClose}
        isOpen={isOpen}
        footer={
          <Flex>
            <Button isLoading={loading} onClick={onCreate}>
              Tạo món mới
            </Button>
          </Flex>
        }
        body={
          <TableContainer>
            <Table variant={'unstyled'}>
              <Tbody>
                <Tr>
                  <Td>Tên món ăn</Td>
                  <Input ref={nameRef} />
                </Tr>
                <Tr>
                  <Td>Giá</Td>
                  <Input ref={priceRef} />
                </Tr>
                <Tr>
                  <Td py={'1rem'}>Mô tả món ăn</Td>
                  <Td padding={'0'} py={'1rem'}>
                    <Textarea
                      focusBorderColor={'main.100'}
                      minHeight={'10rem'}
                      ref={descriptionRef}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Phân loại</Td>
                  <Td padding={'0'}>
                    <Select defaultValue={'Đồ ăn'} ref={typeRef}>
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
                    <Image src={currentAvatar} maxHeight={'5rem'} />
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

export default SellerFoodPost;
