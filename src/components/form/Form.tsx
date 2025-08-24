import { FormProvider, type UseFormReturn } from "react-hook-form";

interface Props {
  children?: React.ReactNode;
  methods: UseFormReturn<any>;
}

export const Form: React.FC<Props> = ({ children, methods }) => {
  return <FormProvider {...methods}>{children}</FormProvider>;
};
