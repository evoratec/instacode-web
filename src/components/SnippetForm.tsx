import { useForm } from 'react-hook-form';
import { SUPPORTED_LANGUAGES } from '../constants/supported-languages';
import { Button } from '../ui/Button';
import { Error } from '../ui/Error';
import { Form, Label } from '../ui/form/Form';
import { Input, Select, TextArea } from '../ui/form/Input';
import { requiredValidation } from '../utils/form';
import FormCodeBlock, { Props as FormCodeBlockProps } from './FormCodeBlock';

export type SnippetParams = {
  title: string;
  code: string;
  description: string;
  language: string;
};

export type Props = {
  onSubmit: (values: SnippetParams) => Promise<void>;
};

const SnippetForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      code: '',
      language: '',
      description: ''
    }
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        <Input hasError={!!errors.title} type="text" placeholder="Título" {...register('title', requiredValidation)} />

        {errors.title ? <Error>{errors.title.message}</Error> : null}
      </Label>

      <Label>
        <Select hasError={!!errors.language} {...register('language', requiredValidation)} defaultValue="">
          <option value="">Lenguaje de código</option>

          {SUPPORTED_LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>

        {errors.language ? <Error>{errors.language.message}</Error> : null}
      </Label>

      <Label>
        <TextArea
          rows={10}
          hasError={!!errors.code}
          placeholder="Escribe tu código!"
          {...register('code', requiredValidation)}
        />

        {errors.code ? <Error>{errors.code.message}</Error> : null}
      </Label>

      <FormCodeBlock control={control as unknown as FormCodeBlockProps['control']} />

      <Label>
        <TextArea
          hasError={!!errors.description}
          placeholder="Describe tu snippet"
          {...register('description', requiredValidation)}
        />

        {errors.description ? <Error>{errors.description.message}</Error> : null}
      </Label>

      <Button type="submit">Entrar</Button>
    </Form>
  );
};

export default SnippetForm;