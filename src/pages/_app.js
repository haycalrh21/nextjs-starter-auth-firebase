import Navbar from "@/components/ui/navbar/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const disableNavbar = ["admin", "auth"];

export default function App({ Component, pageProps, session }) {
	const { pathname } = useRouter();
	const shouldDisableNavbar = disableNavbar.some((path) =>
		pathname.startsWith(`/${path}`)
	);
	return (
		<SessionProvider session={session}>
			<div>
				{!shouldDisableNavbar && <Navbar />}
				<div
					className='flex min-h-screen flex-col items-center justify-between p-24'
					style={{ backgroundColor: "#58A399" }}
				>
					<Component {...pageProps} />;
				</div>
			</div>
		</SessionProvider>
	);
}
