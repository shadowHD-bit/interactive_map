document.querySelector("#menuController").onclick = () => {
    let menu = document.querySelector('.places_tomsk')

    if(menu.style.visibility == 'visible'){
        menu.style.visibility = 'hidden'

    }
    else{
        menu.style.visibility = 'visible'
    }
    

  }