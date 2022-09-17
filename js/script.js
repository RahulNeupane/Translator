const selectTag = document.querySelectorAll('select')
const fromText = document.querySelector('.form-text')
const toText = document.querySelector('.to-text')
const translateBtn = document.querySelector("button")
const exchangeIcon = document.querySelector('.exchange')
const icons = document.querySelectorAll('.row i')

selectTag.forEach((tag,id)=>{
    for(const country_code in countries){
        //selecting English by default in FROM language and Hindi as TO language
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected"
        }else if(id == 1 && country_code == "hi-IN"){
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option) //adding options tag inside select tag
    }
})

exchangeIcon.addEventListener('click', ()=>{
    let tempText = fromText.value
    let tempLang = selectTag[0].value
    fromText.value = toText.value
    selectTag[0].value = selectTag[1].value
    toText.value = tempText
    selectTag[1].value = tempLang
})

translateBtn.addEventListener('click',async ()=>{
    let text = fromText.value, 
    translatedFrom = selectTag[0].value,
    translatedTo = selectTag[1].value

    if(!text) return
    toText.setAttribute('placeholder',"Translating...")
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatedFrom}|${translatedTo}`
    const res = await fetch(apiURL)
    const data = await res.json()
    toText.value = data.responseData.translatedText
    toText.setAttribute('placeholder',"Translation")
})

icons.forEach(icon =>{
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id =='from'){
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }else{
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})