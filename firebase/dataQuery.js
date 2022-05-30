export async function dataQueryById(listInfo) {
    let fullData = []
    const querySnap = await listInfo
    querySnap.forEach(doc => {
        // must push the id as a key to the object and then the data
        fullData.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return fullData
}

export async function dataQueryArray(listInfo) {
    let data = []
    const querySnap = await listInfo
    querySnap.forEach(element => {
        data.push(element.data())
    })
    return data
}
