import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
	const { data } = useSession();
	console.log(data);

	const [isClick, setisClick] = useState(false);

	const toggleNavbar = () => {
		setisClick(!isClick);
	};
	return (
		<nav className='' style={{ backgroundColor: "#496989" }}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg-px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<Link href='/' className='' style={{ color: "#E2F4C5" }}>
								Forum
							</Link>
						</div>
					</div>
					<div className='hidden md:block'>
						<div className='ml-4 flex items-center space-x-4'>
							<button>
								<Link
									href='/'
									className='text-white hover:bg-white hover:text-black rounded-lg p-2'
								>
									Home
								</Link>
							</button>
							<button>
								<Link
									href='/dashboard'
									className='text-white hover:bg-white hover:text-black rounded-lg p-2'
								>
									Dashboard
								</Link>
							</button>
							<button>
								<Link
									href='/about'
									className='text-white hover:bg-white hover:text-black rounded-lg p-2'
								>
									about
								</Link>
							</button>
							<p className='text-white'>
								{data?.user.fullname ? data.user.fullname : data?.user.name}
							</p>

							<button
								className='text-white hover:bg-white hover:text-black rounded-lg p-2'
								onClick={() => (data ? signOut() : signIn())}
							>
								{data ? "Log Out" : "Login"}
							</button>
							<button>
								{data?.user.role === "admin" && (
									<Link
										href='/admin'
										className='text-white hover:bg-white hover:text-black rounded-lg p-2'
									>
										admin
									</Link>
								)}
							</button>
						</div>
					</div>
					<div className='md:hidden flex items-center'>
						<button
							className='inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							onClick={toggleNavbar}
						>
							{isClick ? (
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16m-7 6h7'
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
				{isClick && (
					<div className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							<Link
								href='/'
								className='text-white block hover:bg-white hover:text-black rounded-lg p-2'
							>
								Home
							</Link>
							<Link
								href='/dashboard'
								className='text-white block hover:bg-white hover:text-black rounded-lg p-2'
							>
								Dashboard
							</Link>

							{data?.user.role === "admin" && (
								<Link
									href='/admin'
									className='text-white hover:bg-white hover:text-black rounded-lg p-2'
								>
									admin
								</Link>
							)}
							<div className='text-white hover:bg-white hover:text-black rounded-lg p-1'>
								<button
									className=' hover:bg-white hover:text-black rounded-lg p-1'
									onClick={() => (data ? signOut() : signIn())}
								>
									{data ? "Log Out" : "Login"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
