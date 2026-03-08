'use client'

import { useEffect, useState } from "react";
import cardCss from "../../../styles/card.module.css"
import KitInput from "@/components/input/KitInput";
import { useForm } from "react-hook-form";
import { TagPayload, TagRequestForm, TagTableDto } from "@/domains/tag/tag.model";
import { CreateTag, GetTableTags } from "@/domains/tag/tag.api";
import buttonCss from "../../../styles/button.module.css";
import { slugify } from "@/shared/utils/slugify";
import { useWatch } from "react-hook-form";
import tableCss from "../../../styles/table.module.css";
import { Eye, EyeOff } from "lucide-react";

export default function AdminContentTagsPage() {
      const [autoSlug, setAutoSlug] = useState(true);
      const [tags, setTags] = useState<TagTableDto[]>([]);
      
      const { 
            register,  handleSubmit,  control, setValue, reset,
            formState: { errors, isSubmitting }
      } = useForm<TagRequestForm>({});

      const nameValue = useWatch({ control, name: "name" });

      // Auto tag slug
      useEffect(() => {
            if (!autoSlug) return;
            if (!nameValue) return;

            setValue("slug", slugify(nameValue));
      }, [nameValue]);

      // Get Table tags
      useEffect(() => {
            (async() => {
                  const table = await GetTableTags();

                  console.log('table: ', table);
                  setTags(table);
            })();
      }, []);

      // submit form
      const onSubmit = async(data: TagRequestForm) => {
            try {
                  const payload: TagPayload = {
                        name: data.name,
                        slug: data.slug
                  };

                  var createdTag = await CreateTag(payload);

                  setTags(prev => [...prev, {
                        id: createdTag.id,
                        name: createdTag.name,
                        slug: createdTag.slug,
                        isActive: createdTag.isActive,
                        isVisible: createdTag.isVisible
                  }]);

                  alert("Success");
                  
                  reset();
                  setAutoSlug(true);        
            } catch(error) {
                  alert(error instanceof Error ? error.message : 'Create tag failed');
            }
      }

      return (
            <div className="flex gap-6">
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

                  {/* Table tags */}
                  <div className="w-full">
                        <div className={cardCss.primaryCard}>
                              <div className={cardCss.cardWrapper}>
                                    <div className={`${cardCss.cardHeader} flex justify-center`}>
                                          <span className="content-center font-bold">List Tags</span>
                                    </div>
                                    <div className={cardCss.cardBody}>
                                          <table className={tableCss.table}>
                                                <thead>
                                                      <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Slug</th>
                                                            <th>IsActive</th>
                                                            <th>IsVisible</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {tags.length === 0 ? (
                                                            <tr>
                                                                  <td colSpan={6} className="text-center text-gray-500 py-4">
                                                                        No tags yet
                                                                  </td>
                                                            </tr>
                                                      ) : (
                                                            tags.map((t, idx) => (
                                                                  <tr key={t.id}>
                                                                        <td>{idx + 1}</td>
                                                                        <td>{t.name}</td>
                                                                        <td>{t.slug}</td>
                                                                        <td>
                                                                              <input type="checkbox" checked={t.isActive} readOnly/>
                                                                        </td>
                                                                        <td>
                                                                              <div className="flex justify-center">
                                                                                    {t.isVisible ? <Eye/> : <EyeOff/>}
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            ))
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}