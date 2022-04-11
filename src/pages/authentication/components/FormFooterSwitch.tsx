import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
interface FormFooterSwitchProps {
  message: string;
  messageActionType: 'sign-in' | 'sign-up';
}
const FormFooterSwitch = (props: FormFooterSwitchProps) => {
  const navigate = useNavigate();
  const switchType = () => {
    if (props.messageActionType == 'sign-in') {
      navigate('/auth/sign-up', { replace: true });
    } else {
      navigate('/auth/sign-in', { replace: true });
    }
  };
  return (
    <Text fontSize={'md'} textAlign={'center'} mt={'1rem'}>
      {props.message}
      <Text
        onClick={switchType}
        as={'span'}
        sx={{
          display: 'inline',
          ml: '.2rem',
          cursor: 'pointer',
          color: 'main.600'
        }}
      >
        {props.messageActionType == 'sign-in' ? 'Đăng ký' : 'Đăng nhập'}
      </Text>
    </Text>
  );
};

export default FormFooterSwitch;
