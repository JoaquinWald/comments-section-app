import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

export const loadImages = async () => {
	const storage = getStorage();
	const storageRef = ref(storage);

	try {
		const result = await listAll(storageRef);

		const imageURLs = await Promise.all(
			result.items.map(async (item) => {
				const url = await getDownloadURL(item);
				return { name: item.name, url };
			}),
		);
		return imageURLs;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
