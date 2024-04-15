import {
	getFirestore,
	getDocs,
	getDoc,
	addDoc,
	deleteDoc,
	collection,
	doc,
	query,
	where,
} from "firebase/firestore";

import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
	const snapshot = await getDocs(collection(firestore, collectionName));
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
}

export async function retrieveDataById(collectionName, id) {
	const snapshot = await getDoc(firestore, collectionName, id);
	const data = snapshot.data();
	return data;
}

export async function retrieveDataByField(collectionName, field, value) {
	const q = query(
		collection(firestore, collectionName),
		where(field, "==", value)
	);

	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return data;
}

export async function addData(collectionName, data, callback) {
	await addDoc(collection(firestore, collectionName), data)
		.then(() => {
			callback({ status: true });
		})
		.catch((err) => {
			callback({ status: false });
		});
}

export async function deleteData(collectionName, id) {
	const docRef = doc(firestore, collectionName, id);
	await deleteDoc(docRef)
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
}
