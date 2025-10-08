import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { roleSchema } from '@/schemas/um/roles/role.schema.ts';
import { useAppDispatch } from '@/store/hooks.ts';

export const useUpdateRole = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roleSchema, { abortEarly: false }),
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    // const payload: Omit<DriverType, '_id'> = formData;
    console.log(formData);
    /*try {
      return await dispatch(createDriver(payload)).unwrap();
    } catch (e: any) {
      throw e;
    }*/
  };

  const submitHandler = handleSubmit(onSubmit);

  return {
    control,
    errors,
    submitHandler,
  };

};