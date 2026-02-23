'use client';

import { useEffect, useRef, useState } from "react";
import cardCss from "../../../styles/card.module.css";
import tableCss from "../../../styles/table.module.css";
import formInputCss from "../../../styles/form-input.module.css";
import buttonCss from "../../../styles/button.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { TopicDto, TopicRequestForm, TopicRequestPayload } from "@/domains/topic/topic.type";
import { CreateTopic, GetAllTopics } from "@/domains/topic/topic.api";

export default function AdminContentTopicsPage() {
      const fileRef = useRef<HTMLInputElement>(null);
      const [topics, setTopics] = useState<TopicDto[]>([]);
      const [fileName, setFileName] = useState<string>("Chưa chọn tập tin");
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string>("/thumbnails/default-thumbnail.jpg");

      // Get all topics
      useEffect(() => {
      (async () => {
            const data = await GetAllTopics();
            setTopics(data);
      })();
      }, []);

      // Upload topic image
      const handleChooseFile = () => {
            fileRef.current?.click();
      }
 
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if(file) {
                  setFileName(file.name);
                  setSelectedFile(file);

                  const objectUrl = URL.createObjectURL(file);
                  setPreviewUrl(prev => {
                        if (prev.startsWith("blob:")) {
                              URL.revokeObjectURL(prev);
                        }
                        return objectUrl;
                  });
            }
      };

      useEffect(() => {
            return () => {
                  if (previewUrl.startsWith("blob:")) {
                        URL.revokeObjectURL(previewUrl);
                  }
            };
      }, [previewUrl]);

      // form
      const { 
            register,
            handleSubmit,
            formState: { errors, isSubmitting }
      } = useForm<TopicRequestForm>({});

      const onSubmit = async(data: TopicRequestForm) => {
            try {
                  const formData = new FormData();
                  formData.append("name", data.name);

                  if(selectedFile) {
                        formData.append("image", selectedFile);
                  }

                  var response = await CreateTopic(formData);
                  alert('Success');
            } catch(err) {
                  alert(err instanceof Error ? err.message : 'Create topic failed');
            }
      }

      return (
            <>
                  <div className="flex gap-2">
                        {/* Add tags form */}
                        <form className={`${cardCss.primaryCard} w-1/3`} onSubmit={handleSubmit(onSubmit)}>
                              <div className={cardCss.cardWrapper}>
                                    <div className={`${cardCss.cardHeader} flex justify-center`}>
                                          <span className="content-center font-bold">New topics</span>
                                    </div>
                                    <div className={`${cardCss.cardBody} flex flex-col gap-4`}>
                                          {/* topic name */}
                                          <div>
                                                <label className={formInputCss.formLabel}>Name</label>
                                                <input className={`${formInputCss.formInput} w-full`}
                                                {...register('name', { required: 'Name is required' })}/>
                                                {errors.name && (
                                                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                                )}
                                          </div>

                                          {/* topic image */}     
                                          <div>
                                                <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange}/>
                                                <div className="flex gap-2">
                                                      <button type="button" onClick={handleChooseFile} className={buttonCss.defaultButton}>Chọn hình ảnh</button>
                                                      <span className="text-gray-500 text-xs content-center">{fileName}</span>
                                                </div>
                                          </div>

                                          {/* submit button */}
                                          <div className="flex justify-center">
                                                <button type="submit" className={buttonCss.saveButton} disabled={isSubmitting}>
                                                      { isSubmitting ? 'Submitting ...' : 'Submit' }
                                                </button>
                                          </div>

                                    </div>
                              </div>
                        </form>

                        {/* Preview uploaded image */}
                        <div className={`${cardCss.primaryCard} w-fit`}>
                              <div className={cardCss.cardWrapper}>
                                    <div className={cardCss.cardBody}>
                                          <Image src={previewUrl} alt="default-thumbnail" width={300} height={300}></Image>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="mt-4 w-1/3">
                        <div className={cardCss.primaryCard}>
                              <div className={cardCss.cardWrapper}>
                                    <div className={`${cardCss.cardHeader} flex justify-center`}>
                                          <span className="content-center font-bold">Topics</span>
                                    </div>
                                    <div className={cardCss.cardBody}>
                                          <table className={tableCss.table}>
                                                <thead>
                                                      <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Image</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {topics.length === 0 ? (
                                                            <tr>
                                                                  <td colSpan={3} className="text-center text-gray-500 py-4">
                                                                        No topics yet
                                                                  </td>
                                                            </tr>
                                                      ) : (
                                                            topics.map((t, idx) => (
                                                                  <tr key={t.id}>
                                                                        <td>{idx + 1}</td>
                                                                        <td>{t.name}</td>
                                                                        <td>
                                                                              <span>{t.imageUrl}</span>
                                                                              {t.imageUrl ? (
                                                                                    <Image src={t.imageUrl} alt={t.name} width={40} height={40}
                                                                                    className="rounded-md object-cover"/>
                                                                              ) : (
                                                                                    <span className="text-gray-400 text-xs">No image</span>
                                                                              )}
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
            </>
      )
}