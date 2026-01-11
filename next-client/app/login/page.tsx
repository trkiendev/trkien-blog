'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { LoginForm, LoginPayload } from "@/domains/authentication/login.model";
import { Login } from "@/domains/authentication/auth.api";
import { useRouter } from "next/navigation";

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
                        email: data.email,
                        password: data.password
                  };

                  await Login(payload);
                  alert('Success');
                  router.push('/admin');
            } catch(error) {
                  alert(error instanceof Error ? error.message : 'Login failed');
            }
      }

      return(
            <section className="page-container">
                  <h1>Login page</h1>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                              <label htmlFor="">Email</label>
                              <input type="email" className="form-input w-full" 
                                    {...register('email', {
                                          required: 'Email is required',
                                          pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: 'Invalid email format'
                                          }
                                    })} 
                              />
                              {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                              )}
                        </div>

                        <div>
                              <label className="form-label">Password</label>
                              <div className="relative">
                                    <input  type={showPassword ? 'text' : 'password'} className="form-input w-full pr-10"
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

                        <div>
                              <button type="submit" className="flex-1 save-button"  disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                              </button>
                        </div>
                  </form>
            </section>
      );
}