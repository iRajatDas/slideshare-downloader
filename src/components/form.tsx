'use client';

import React, { FC } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Input } from '@/components/ui/input';
import { BsFiletypePdf } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSlideFormStore } from '../lib/store';

interface SlideFormProps {}

const formSchema = z.object({
  url: z.string().nonempty('Slideshare URL is required'),
});

type FormType = z.infer<typeof formSchema>;

type Slide = {
  url: string;
};

type Slides = {
  slides: Slide[];
};

const SlideForm: FC<SlideFormProps> = ({}) => {
  const zSlides = useSlideFormStore((state) => state.slides);
  const setSlides = useSlideFormStore((state) => state.setSlides);
  const clearSlides = useSlideFormStore((state) => state.clearSlides);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async ({ url }: FormType) => {
    zSlides.length > 0 && clearSlides();
    try {
      const response: AxiosResponse<Slides> = await axios.post(
        '/api/download',
        { url },
      );
      const { slides } = response.data;
      setSlides(slides);
    } catch (error) {
      zSlides.length > 0 && clearSlides();
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="py-6 space-y-4 mx-auto max-w-2xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="https://www.slideshare.net/username/post_id"
                  autoFocus={true}
                  className="focus-visible:ring-primary-brand py-6"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <Toggle size="lg" aria-label="Toggle italic">
            <BsFiletypePdf className="h-4 w-4 mr-2" />
            PDF
          </Toggle>
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="uppercase font-semibold w-full bg-primary-brand py-6 duration-300 hover:bg-primary-brand/90"
        >
          Download
        </Button>
      </form>
    </Form>
  );
};

export default SlideForm;
