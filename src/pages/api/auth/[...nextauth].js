import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { signIn, loginGoogle } from "@/services/auth/services";
import jwt from "jsonwebtoken";

const options = {
	session: {
		jwt: true,
		maxAge: 1 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				const user = await signIn(email);
				if (user) {
					const passwordConfirm = await compare(password, user.password);
					if (passwordConfirm) {
						return user;
					}
				}
				return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_OATH_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_OATH_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (user) {
				token.email = user.email;
				token.fullname = user.fullname;

				token.role = user.role;
			}

			if (account && account.provider === "google" && user) {
				const data = {
					email: user.email,
					name: user.name,
					role: user.role,
					type: "google",
				};
				try {
					const googleUser = await loginGoogle(data);
					if (googleUser) {
						token.email = googleUser.email;
						token.fullname = googleUser.name;
						token.role = googleUser.role;
					}
				} catch (error) {
					console.error("Error during login with Google:", error);
					// Handle error properly
				}
			}
			return token;
		},

		async session({ session, token }) {
			session.user = session.user || {};

			if (token.email) {
				session.user.email = token.email;
			}
			if (token.fullname) {
				session.user.fullname = token.fullname;
			}

			if (token.role) {
				session.user.role = token.role;
			}

			const accessToken = jwt.sign(
				{},
				process.env.NEXTAUTH_SECRET,

				{
					algorithm: "HS256",
				}
			);

			session.accessToken = accessToken;
			// console.log(session);

			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
};

export default NextAuth(options);
