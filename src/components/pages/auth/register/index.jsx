import AuthLayout from "@/components/auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import authServices from "@/services/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FormRegister = () => {
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);
	const [pesanerror, setPesanError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			fullname: form.fullname.value,
			email: form.email.value,
			password: form.password.value,
		};

		// // Validasi password
		// if (data.password.length < 6) {
		// 	setLoading(true);
		// 	setTimeout(() => {
		// 		setPesanError("Password harus memiliki setidaknya 6 karakter");
		// 		setLoading(false); // setLoading(false) ditempatkan di sini
		// 	}, 1000); // Penundaan selama 2 detik
		// 	return;
		// }

		// if (!/[A-Z]/.test(data.password)) {
		// 	setLoading(true);
		// 	setTimeout(() => {
		// 		setPesanError("Password harus mengandung setidaknya satu huruf besar");
		// 		setLoading(false); // setLoading(false) ditempatkan di sini
		// 	}, 1000); // Penundaan selama 2 detik
		// 	return;
		// }

		try {
			setLoading(true);
			const result = await authServices.registerAccount(data);
			setLoading(false);

			if (result.status === 200) {
				form.reset();
				push("/auth/login");
			} else {
				setPesanError("Akun sudah dibuat atau terjadi kesalahan");
			}
		} catch (error) {
			setPesanError("Terjadi kesalahan");
			setLoading(false);
		}
	};
	useEffect(() => {
		if (pesanerror) {
			const timeout = setTimeout(() => {
				setPesanError("");
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [pesanerror]);

	return (
		<AuthLayout
			title='Register'
			link='/auth/login'
			linktext='Sudah punya akun?'
		>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Fullname'
					name='fullname'
					type='text'
					placeholder='Budi / Joko / DLL'
				/>
				<Input
					label='Email'
					name='email'
					type='email'
					placeholder='example@gmail.com'
				/>
				<Input
					label='Password'
					name='password'
					type='password'
					placeholder='********'
				/>
				<Button
					type='submit'
					disabled={loading}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center'
				>
					{loading ? "Loading..." : "Register"}
				</Button>
			</form>
			{pesanerror && <p className='text-red-500'>{pesanerror}</p>}
		</AuthLayout>
	);
};

export default FormRegister;
