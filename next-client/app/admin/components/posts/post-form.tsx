import { AdminPostDetailDto } from "@/domains/posts/admin-post.dto";
import { PostFormData } from "@/domains/posts/post.model";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type PostFormProps = {
      initialData?: AdminPostDetailDto
      onSubmit: (data: PostFormData) => Promise<void>
}

export default function PostFormComponent({
      initialData,
      onSubmit
}: PostFormProps) {
      const {
            register, handleSubmit, control, setValue, reset,
            formState: { errors }
      } = useForm<PostFormData>({
            defaultValues: {
                  title: "",
                  slug: "",
                  contentJson: "",
                  topicId: "",
                  tagIds: [],
                  thumbnail: undefined
            }
      });

      useEffect(() => {
      if (!initialData) return;

      reset({
            title: initialData.title ?? "",
            slug: initialData.slug ?? "",
            contentJson: initialData.contentJson ?? "",
            topicId: initialData.topicId ?? "",
            tagIds: initialData.tagLookups?.map(x => x.id) ?? [],
            thumbnail: undefined
      });
      }, [initialData, reset]);

      return (
            <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title")} />
                  <input {...register("slug")} />
            </form>
      )
}

