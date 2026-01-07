'use client';

import { CreateUser } from "@/domains/user/user.api";
import { UserRequestForm, UserRequestPayload } from "@/domains/user/user.type";
import { Eye, EyeOff, SquareX } from "lucide-react";
import { useState } from "react";
import { useForm } from 'react-hook-form';

type AddMemberModalProps = {
      open: boolean;
      onClose: () => void;
};

export default function AddMemberModal({ open, onClose }: AddMemberModalProps) {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const {
            register,
            handleSubmit,
            watch,
            formState: { errors, isSubmitting }
      } = useForm<UserRequestForm>({
            defaultValues: { roles: [] }
      });
      const password = watch('password');

      if (!open) return null;

      const onSubmit = async (data: UserRequestForm) => {
            try {
                  const payload: UserRequestPayload = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        roles: data.roles
                  };

                  await CreateUser(payload);

                  onClose();
            } catch(err) {
                  alert(err instanceof Error ? err.message : 'Create user failed');
            }
      };

      return(
            <div className="fixed inset-0 z-50 flex items-center justify-center">

                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/50" onClick={onClose}/>

                  {/* Modal */}
                  <form className="relative w-[520px] rounded-md bg-white modal-shadow"
                  onSubmit={handleSubmit(onSubmit)}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3">
                              <span className="font-semibold">Add new user</span>
                              <button type="button" onClick={onClose} className="cursor-pointer text-gray-400 hover:text-red-500 padding-0 transition-transform duration-200">
                                    <SquareX/>
                              </button>
                        </div>

                        {/* Body */}
                        <div className="space-y-4 px-5 py-4">
                              <div>
                                    <label className="form-label">Name</label>
                                    <input className="form-input w-full" 
                                          {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && (
                                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                              </div>
                              <div>
                                    <label className="form-label">Username</label>
                                    <input className="form-input w-full"
                                          {...register('username', { required: 'Username is required' })} 
                                    />
                                    {errors.username && (
                                          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                                    )}
                              </div>
                              <div>
                                    <label className="form-label">E-mail</label>
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
                                    <label className="form-label">Confirm Password</label>
                                    <div className="relative">
                                          <input type={showConfirmPassword ? 'text' : 'password'} className="form-input w-full pr-10"
                                                {...register('confirmPassword', {
                                                validate: value =>
                                                      value === password || 'Passwords do not match'
                                                })}
                                          />
                                          <button type="button" onClick={() => setShowConfirmPassword(v => !v)}
                                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 padding-0">
                                                { showConfirmPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                                          </button>
                                    </div>
                                    {errors.confirmPassword && (
                                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                                    )}
                              </div>
                              <div>
                                    <label className="form-label block mb-1">Roles</label>
                                    <label className="flex items-center gap-2">
                                          <input type="checkbox" />
                                          Administrators
                                    </label>
                                    <label className="flex items-center gap-2">
                                          <input type="checkbox" />
                                          Editors
                                    </label>
                              </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-2 px-5 py-3">
                              <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                              <button type="submit" className="save-button"  disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                              </button>
                        </div>
                  </form>
            </div>
      )
}

