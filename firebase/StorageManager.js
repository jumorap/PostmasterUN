import { storage } from "./firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default class StorageManager{
    static _imageBucket = "./ "

    static async _createImageReference(postId ,imageName) {
        const imageRef = await ref(storage, `images/${postId}/${imageName}`);
        return imageRef
    }

    static async uploadImages(files, postID){
        let references = []
        for(const file of files) {
            const ref = await this._createImageReference(postID, file.name)
            await uploadBytes(ref, file)
            const url = await getDownloadURL(ref)
            references.push(url)
        };
        return references
    }
}