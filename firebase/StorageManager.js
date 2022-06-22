import { storage } from "./firebase.config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default class StorageManager{
    static _imageBucket = "./ "

    static async _createImageReference(postId ,imageName) {
        const imageRef = await ref(storage, `images/${postId}/${imageName}`);
        return imageRef
    }

    static async uploadImages(files, postID){
        const references = []
        files.forEach(async file => {
            const ref = await this._createImageReference(postID, file.name)
            references.push(ref)
            await uploadBytes(ref, file)
        });
        return references
    }
}