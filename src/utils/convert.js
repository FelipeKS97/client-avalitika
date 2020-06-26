export const convertObjId = (objArray) => {
    let idArray = []
    objArray.forEach(obj => idArray.push(obj.id))
    return idArray
}