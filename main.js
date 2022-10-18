let templates = document.querySelector("template").content
function alls(qiymat){
    fetch(`https://restcountries.com/v3.1/name/${qiymat}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        aligns(data)
        return console.log(data)
    })
}
alls("Uzbekistan")
let parent = document.querySelector(".result")
function aligns(arr){
    for(let i = 0; i<arr.length; i++){
        console.log(arr[i].name.common)
        let namem = arr[i].name.common
        let flages = arr[i].flags.png
        let langs = arr[i].languages
        console.log(langs)
        let clone = templates.cloneNode(true)
        let images = clone.querySelector(".card-img")
        images.src = flages
        let nameTitle = clone.querySelector(".card-title")
        nameTitle.textContent = namem
        let candLang = clone.querySelector("#card-lang")
        parent.appendChild(clone)
        for(let i in langs){
            candLang.textContent = langs[i]
        }
    }
}

function handlen(e){
    e.preventDefault()
    let input = document.querySelector(".inputs")
    let value = input.value
    let rejex = new RegExp(value, "gi")
    let xml = new XMLHttpRequest()
    let link = `https://restcountries.com/v3.1/all`
    xml.addEventListener("load", () => {
        try{
            xml = xml.responseText
            let parses = JSON.parse(xml)
            let hammasiUchun = []
            if(value == "all"){
                hammasiUchun = parses 
            }else if(value !== "all"){
                hammasiUchun = parses.filter((item) => item.name.common.match(rejex))
            }
            renders(hammasiUchun)
        }catch(error){
            console.log(error)
        }finally{
            console.log("Loading .... ")
        }
    })
    xml.open("GET", link)
    xml.send()
}
document.querySelector(".forms").addEventListener("submit", handlen)
function renders(data){
    data.map((items) => {  
    let card = createTag("div")
    card.className = "card text text-center p-2"
    card.style.width = "30%"
    let img = createTag("img")
    img.src = items.flags.png
      img.className = 'card-img'
      img.alt = "card-image"
      card.appendChild(img)
      let textDiv = createTag("div")
      textDiv.className = 'card-text'
      card.appendChild(textDiv)
      let h2 = createTag("h2")
      h2.appendChild(textNode(items.name.common))
      textDiv.appendChild(h2)
      let langs = items.languages  
      for(let i in langs){
        let h4 = createTag("h4")
        let span = createTag("span")
        span.textContent = langs[i]
        h4.appendChild(span)
        textDiv.appendChild(h4)
    }
      let btn = createTag("button")
      btn.appendChild(textNode("Locals"))
      btn.className = 'btn btn-primary btnss'
      btn.dataset.id = items.fifa
      textDiv.appendChild(btn)
      parent.appendChild(card)
      console.log(card)      
    })
}
let objecters = {
    name: null
}
let accorDionBody = renderElement(".accordion-body")
window.addEventListener("click", (e) => {
    if(e.target.matches(".btnss")){
        let id = e.target.dataset.id
        fetch("https://restcountries.com/v3.1/all")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let array = data
            array.forEach((item) => {
                if(item.fifa == id){
                    objecters.name = item.name.common
                    window.sessionStorage.setItem("regions", JSON.stringify(objecters))
                    accorDionBody.textContent = JSON.parse(window.sessionStorage.getItem("regions")).name
                }
            })
        })
    }else{
        console.log(false)
    }
})
accorDionBody.textContent = JSON.parse(window.sessionStorage.getItem("regions")).name