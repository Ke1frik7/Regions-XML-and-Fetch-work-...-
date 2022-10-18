// window.addEventListener("load", () => {
    let form = document.querySelector(".forms")
    form.addEventListener("submit", handle)
    let input =document.querySelector(".inputs")
    function handle(e){
        e.preventDefault()
        let value = input.value
        let rejex = new RegExp(value, "gi")
        let xml = new XMLHttpRequest()
        let link = `https://restcountries.com/v3.1/all`
        xml.onload = function() {
            xml = xml.responseText
            aylan(xml)
        }
        xml.open("GET", link)
        xml.send()
        function aylan(data){
            let array = JSON.parse(data)
            let arrays = []
            for(let i = 0; i<array.length; i++){
                arrays = array.filter((item) => item.name.common.match(rejex))
                console.log(arrays)
            }
        }
    }
// })

let form2 = renderElement("#renders_form")
form2.addEventListener("submit", usha)
function handle(e){
    
}