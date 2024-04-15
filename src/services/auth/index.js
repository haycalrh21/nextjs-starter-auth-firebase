import init from "@/lib/axios/init";

const authServices = {
	registerAccount: (userData) => init.post("/api/user/register", userData),
};

export default authServices;
