'use client'

import { useEffect, useState } from "react";
import cardCss from "../../../styles/card.module.css"
import KitInput from "@/components/input/KitInput";
import { useForm } from "react-hook-form";
import { TagPayload, TagRequestForm } from "@/domains/tag/tag.model";
import { CreateTag } from "@/domains/tag/tag.api";
import buttonCss from "../../../styles/button.module.css";
import { slugify } from "@/shared/utils/slugify";
import { useWatch } from "react-hook-form";

export default function AdminContentTagsPage() {
      const [autoSlug, setAutoSlug] = useState(true);
      
      const { 
            register,  handleSubmit,  control, setValue, reset,
            formState: { errors, isSubmitting }
      } = useForm<TagRequestForm>({});

      const nameValue = useWatch({ control, name: "name" });

      useEffect(() => {
            if (!autoSlug) return;
            if (!nameValue) return;

            setValue("slug", slugify(nameValue));
      }, [nameValue]);

      const onSubmit = async(data: TagRequestForm) => {
            try {
                  const payload: TagPayload = {
                        name: data.name,
                        slug: data.slug
                  };

                  await CreateTag(payload);
                  alert("Success");
                  
                  reset();
                  setAutoSlug(true);
                  
            } catch(error) {
                  alert(error instanceof Error ? error.message : 'Create tag failed');
            }
      }

      return (
            <div>
                  {/* Table tags */}
                  <div className="w-1/3">
                  
                  </div>

                  {/* Create tags form */}
                  <form className={`${cardCss.primaryCard} w-1/3`} onSubmit={handleSubmit(onSubmit)}>
                        <div className={cardCss.cardWrapper}>
                              <div className={`${cardCss.cardHeader} flex justify-center`}>
                                    <span className="content-center font-bold">New tags</span>
                              </div>
                              <div className={`${cardCss.cardBody} flex flex-col gap-4`}>
                                    {/* tag name */}
                                    <div>
                                          <KitInput label="Name" type="text" placeholder="Tag name" className="flex-1"
                                                {...register("name", { required: "Name is required" })}
                                          ></KitInput>
                                          {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                      {errors.name.message}
                                                </p>
                                          )}
                                    </div>

                                    {/* tag slug */}
                                    <div>
                                          <KitInput label="Slug" type="text" placeholder="Tag slug" className="flex-1"
                                                {...register("slug")} onChange={() => setAutoSlug(false)}
                                          ></KitInput>
                                          {errors.slug && (
                                                <p className="text-red-500 text-xs mt-1">
                                                      {errors.slug.message}
                                                </p>
                                          )}
                                    </div>

                                    {/* submit button */}
                                    <div className="flex justify-center">
                                          <button type="submit" className={buttonCss.saveButton} disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting ...' : 'Submit'}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </form>
            </div>
      )
}