import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/store/hooks.ts';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { postRequest } from '@utils/api/request-service.ts';
import { LOGIN_API_URL } from '@utils/constant/api-url.constants.ts';
import { loginSchema } from '@/schemas/auth/login.schema.ts';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useAppToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema, { abortEarly: false }),
    mode: 'onTouched',
  });

  const onSubmit = async (formData: any) => {
    try {
      const response = await postRequest(LOGIN_API_URL, formData);
      if (response.status === 200) {
        navigate(DASHBOARD_ROUTE);
      }
    } catch (e) {
      showError('Login User', 'Unable to Login');
    }

  };

  const submitHandler = handleSubmit(onSubmit);

  return {
    control,
    errors,
    submitHandler,
    isValid,
    touchedFields,
  };

};