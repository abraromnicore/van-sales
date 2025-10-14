import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { getRequest } from '@utils/api/request-service.ts';
import { LOGIN_API_URL } from '@utils/constant/api-url.constants.ts';
import { loginSchema } from '@/schemas/auth/login.schema.ts';
import { setPermissions } from '@utils/utils.ts';
import { DASHBOARD_ROUTE } from '@utils/constant/app-route.constants.ts';

export const useLogin = () => {
  const navigate = useNavigate();
  const { showError } = useAppToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema, { abortEarly: false }),
    mode: 'onTouched',
  });

  const onSubmit = async () => {
    try {
      const response = await getRequest(LOGIN_API_URL + `/supervisor`);
      // navigate(DASHBOARD_ROUTE); return;
      if (response.status === 200) {
        const permissions = response.data.permissions;
        setPermissions(permissions);
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