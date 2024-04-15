import Link from "next/link";

const AuthLayout = ({ children, title, link, linktext }) => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='w-full max-w-md p-6 rounded-lg bg-white'>
				{title && (
					<h1 className='text-3xl font-bold text-center mb-4'>{title}</h1>
				)}
				<div className='flex flex-col gap-4'>{children}</div>
				{linktext && (
					<p className='text-center mt-4'>
						<Link href={link} className='text-black'>
							{linktext}
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default AuthLayout;
