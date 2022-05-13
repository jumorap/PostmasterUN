import FirestoreManager from "./FirestoreManager";

export default function dataQueryById(listInfo) {
    let fullData = {}
    listInfo.then((snapshot) => {
        snapshot.forEach((doc) => {
            fullData[doc.id] = doc.data();
        })
    })
    return [fullData]
}

export async function dataQueryArray(listInfo) {
    let data = []
    const querySnap = await listInfo
    querySnap.forEach(element => {
        data.push(element.data())
    })
    return data
}
