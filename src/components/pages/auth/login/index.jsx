import AuthLayout from "@/components/auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";

import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const FormLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { push, query } = useRouter();
	const callbackUrl = query.callback || "/";
	const [pesanerror, setPesanError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const form = event.target;

		try {
			const res = await signIn("credentials", {
				email: form.email.value,
				password: form.password.value,
				callbackUrl: callbackUrl,
				redirect: false,
			});
			setIsLoading(false);
			if (!res?.error) {
				push(callbackUrl);
			} else {
				console.error("Error during sign in:", res.error);
				setPesanError("Email atau password salah");
			}
		} catch (error) {
			console.error("Error during sign in:", error);
		}
	};

	return (
		<AuthLayout
			title='Login'
			link='/auth/register'
			linktext='Belum Punya akun?'
		>
			<div className=''>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4'>
						<Input
							label='Email'
							name='email'
							type='email'
							placeholder='Email'
						/>
						<Input
							label='Password'
							name='password'
							type='password'
							placeholder='Password'
						/>
						<Button type='submit' variant='primary'>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
						<button
							type='button'
							onClick={() => signIn("google", { callbackUrl, redirect: false })}
							className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center'
						>
							Google
						</button>
					</div>
				</form>
				{pesanerror && <p className='text-red-500'>{pesanerror}</p>}
			</div>
		</AuthLayout>
	);
};

export default FormLogin;
