export default function(time){
    let date = new Date(time)
    return date.toLocaleDateString("es-Ar")
}