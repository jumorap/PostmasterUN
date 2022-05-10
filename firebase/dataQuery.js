// This is a test
export default async function dataQuery(listInfo) {
    var fullData = {}
    return listInfo.then((snapshot) => {
        snapshot.forEach((doc) => {
            fullData[doc.id] = doc.data();
        })
        // wait the promise to be resolved and render temp object
        setTimeout(() => {
            return fullData
        }, 1000)
        // return a copy of tempData
    })
}
