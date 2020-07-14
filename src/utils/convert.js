export const convertObjId = (objArray) => {
    let idArray = []
    objArray.forEach(obj => idArray.push(obj.id))
    return idArray
}

export const convertToColumns = (data) => {
    return data.map(d => {
      return {
        id: d.id,
        created_at: d.created_at,
        discipline: d.class.discipline.name,
        professor: d.class.professor.user.fullname
      }
    })
}