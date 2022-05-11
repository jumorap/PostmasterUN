export default function dataQuery(listInfo) {
    let fullData = {}
    listInfo.then((snapshot) => {
        snapshot.forEach((doc) => {
            fullData[doc.id] = doc.data();
        })
    })
    return [fullData]
}
