import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword({ email, passwordVisibility, setPasswordVisibility, passwordConfirmVisibility, setPasswordConfirmVisibility, changePasswordVisibility  }) {
    const navigate = useNavigate();
    const { token } = useParams();

    const [passwordSuccess, setPasswordSuccess] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onSuccess: () => {
                setPasswordVisibility(false)
                setPasswordConfirmVisibility(false)
                setPasswordSuccess(true)
            },
            onError: (error) => {
                console.error('Error resetting password:', error);
            }
        });   
    };

    return (
        <div id='reset-password'>
            <Head title="Reset Password" />
            <h1>Password Reset</h1>
            <form onSubmit={submit}>
                <div className='field'>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        isFocused={true}
                        autoComplete="username"
                        onChange={onHandleChange}
                    />

                    <InputError className='error-message' message={errors.email} />
                </div>

                <div className='field'>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        type={`${!passwordVisibility ? 'password' : 'text'}`}
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={onHandleChange}
                    />
                    <div className='visibility-container'>
                        <i className={`fas fa-eye${!passwordVisibility ? '-slash' : ''}`} onClick={() => {changePasswordVisibility('original')}}></i>
                    </div>
                    <InputError className='error-message' message={errors.password} />
                </div>

                <div className='field'>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type={`${!passwordConfirmVisibility ? 'password' : 'text'}`}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={onHandleChange}
                    />
                    <div className='visibility-container'>
                        <i className={`fas fa-eye${!passwordConfirmVisibility ? '-slash' : ''}`} onClick={() => {changePasswordVisibility('confirmation')}}></i>
                    </div>
                    <InputError className='error-message' message={errors.password_confirmation} />
                </div>
                {passwordSuccess && 
                <p>Password successfully reset!</p>
                }

                <div>
                    <PrimaryButton className="ml-4 reset-button" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
