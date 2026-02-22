'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { LoginForm, LoginPayload } from "@/domains/authentication/login.model";
import { Login } from "@/domains/authentication/auth.api";
import { useRouter } from "next/navigation";
import buttonCss from "../styles/button.module.css";
import formInputCss from "../styles/form-input.module.css";
import cardCss from "../styles/card.module.css";

export default function LoginPage() {
      const router = useRouter();
      const [showPassword, setShowPassword] = useState(false);
      const {
            register, 
            handleSubmit,
            watch,
            formState: { errors, isSubmitting }
      } = useForm<LoginForm>({});
      const password = watch('password');

      const onSubmit = async(data: LoginForm) => {
            try {
                  const payload: LoginPayload = {
                        username: data.username,
                        password: data.password
                  };
                  
                  await Login(payload);
                  router.push('/admin');
            } catch(error) {
                  alert(error instanceof Error ? error.message : 'Login failed');
            }
      }

      return(
            <section className="page-container flex justify-center items-center">
                  <form className={`${cardCss.primaryCard} w-1/3`} onSubmit={handleSubmit(onSubmit)}>
                        <div className={cardCss.cardWrapper}>
                              <div className={`${cardCss.cardHeader} text-center`}>
                                    Login
                              </div>
                              <div className={`${cardCss.cardBody} flex flex-col gap-4`}>
                                    <div>
                                          <label className={formInputCss.formLabel}>Username</label>
                                          <input type="text" className={`${formInputCss.formInput} w-full`} 
                                          {...register('username', {
                                                required: 'Username is required',
                                          })} 
                                          />
                                          {errors.username && (
                                                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                                          )}
                                    </div>

                                    <div>
                                          <label className={formInputCss.formLabel}>Password</label>
                                          <div className="relative">
                                                <input  type={showPassword ? 'text' : 'password'} className={`${formInputCss.formInput} w-full pr-10`} 
                                                      {...register('password', {
                                                            required: 'Password is required',
                                                            minLength: { value: 6, message: 'Min 6 characters' }
                                                      })} 
                                                />
                                                <button type="button" onClick={() => setShowPassword(v => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 padding-0">
                                                      { showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                                                </button>
                                          </div>   
                                          {errors.password && (
                                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                          )}
                                    </div>

                                    <div className="flex justify-center">
                                          <button type="submit" className={`${buttonCss.saveButton}`}  disabled={isSubmitting}>
                                                {isSubmitting ? 'Đang xử lý ...' : 'Đăng nhập'}
                                          </button>
                                    </div>
                              </div>
                              
                        </div>
                  </form>
            </section>
      );
}