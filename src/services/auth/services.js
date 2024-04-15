import { addData, retrieveDataByField } from "@/lib/firebase/services";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signUp(userData, callback) {
	const data = await retrieveDataByField("user", "email", userData.email);

	const uniqueId = uuidv4();
	userData.id = uniqueId; // menyimpan id pakai uniqueId

	if (userData.password.length <= 6) {
		callback(false, "Password must be longer than 6 characters");
		return;
	}
	if (data.length > 0) {
		callback(false);
	} else {
		if (!userData.role) userData.role = "member";
	}
	userData.password = await bcrypt.hash(userData.password, 5);
	userData.created_at = new Date();
	userData.updated_at = new Date();
	addData("users", userData, () => {
		callback(true);
	});
}

export async function signIn(email) {
	const data = await retrieveDataByField("users", "email", email);

	if (data) {
		return data[0];
	} else {
		return null;
	}
}

export async function loginGoogle(data, callback) {
	try {
		const user = await retrieveDataByField("users", "email", email);

		if (user.length > 0) {
			callback(null, user[0]);
		} else {
			data.role = "member";
			data.created_at = new Date();
			data.updated_at = new Date();
			data.password = "";
			const result = await addData("users", data);
			if (result) {
				callback(null, data);
			} else {
				throw new Error("Gagal Login");
			}
		}
	} catch (error) {
		console.log(error);
		callback(error);
	}
}
