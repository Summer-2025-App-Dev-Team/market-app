import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

const upload = async (files) => {
    return new Promise((resolve, reject) => {
        const totalFiles = files.length;
        const URLs = [];
        let completedUploads = 0;

        if (totalFiles === 0) {
            // When there is no file provided
            resolve([]);
            return;
        }

        for (let i = 0; i < totalFiles; i++) {
            const file = files[i].file;
            const date = new Date();
            const storageRef = ref(
                storage,
                "images/" + date.getTime() + "_" + file.name
            );

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(
                        `Upload is ${progress}% done for file ${i + 1}.`
                    );
                },
                (error) => {
                    reject("Something went wrong: " + error.code);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            URLs.push({ url: downloadURL });
                            completedUploads++;

                            // Only resolve when all uploads are complete
                            if (completedUploads === totalFiles) {
                                resolve(URLs);
                            }
                        })
                        .catch((error) => {
                            reject(
                                "Failed to get download URL: " + error.message
                            );
                        });
                }
            );
        }
    });
};

export default upload;
