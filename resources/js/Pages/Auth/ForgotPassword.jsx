import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ForgotPassword({ status }) {
// export default function ForgotPassword() {
    const [statusMessage, setStatusMessage] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => {
                setStatusMessage("If the email address was valid, a password reset link has been sent.");
            },
            onError: (error) => {
                // Handle any errors here
                console.error('Error:', error);
            }
        })
    };

    return (
        <div id='forgot-password'>
            <Head title="Forgot Password" />
            <h1>Forgot Password?</h1>
            <p>
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
            </p>
    
            {statusMessage && <div className="status-message">{statusMessage}</div>}
    
            <form onSubmit={submit}>
                <label>Email</label>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    isFocused={true}
                    onChange={onHandleChange}
                />
    
                <InputError message={errors.email} className='error-message' />
    
                <div>
                    <PrimaryButton disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
    }    
