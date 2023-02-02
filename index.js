const buscarAnime = document.getElementById('buscarAnime')
const buscarBtn = document.getElementById('buscar')
const contenedor = document.querySelector('.mostratData')
const modal = document.querySelector('.modal-anime')
const modalItem = document.querySelector('.modal-item')
const closeModal = document.getElementById('close-modal')
const swiperWrapper = document.querySelector('.carrusel')
const menu = document.getElementById('menu')

buscarBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const img = document.createElement('img')
    img.style = 'width: 100px; margin: auto'
    img.setAttribute('src', '../recursos/loading.gif')
    contenedor.innerHTML=''
    contenedor.append(img)
    buscarAnime.value.length != 0 ? encontrarAnime(buscarAnime.value) : contenedor.innerHTML=''
    buscarAnime.value = ''
})

async function encontrarAnime(anime){
    const api = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&sfw`)
    const resp = await api.json()
    mostrarData(resp.data)
    console.log(resp.data)
}

async function mostrarData(resp){
    const array = await resp
    contenedor.innerHTML=''
    if (array.length == 0) {
        contenedor.innerHTML = `
            <div class="noEncontrado">
                <img src="../recursos/noEncontrado.png" alt="">
                <h1>Anime No Encontrado</h1>
            </div>
        `
    }else{
        imprimirData(array)
    }
}

function imprimirData(array){
    array.forEach(item => {
        const div = document.createElement('div')
        div.classList.add('anime')
        div.innerHTML = `
            <div class="anime-item">
                <div class="img-container">
                    <img src="${item.images.jpg.image_url}">
                </div>
                <div class="anime-titulo">
                    <p>${item.title}</p>
                </div>
            </div>
        `
        contenedor.append(div)
        
        const itemAnime = div.querySelector('.anime-item')
        itemAnime.addEventListener('click', ()=>{
            modal.classList.add('show')
            mostrarInfo(item)
        })
    });
}

const mostrarInfo=(item)=>{
    modalItem.innerHTML=''
    const h3 = document.createElement('h3')
    h3.textContent = `${item.title}`
    const img = document.createElement('img')
    img.setAttribute('src', item.images.jpg.image_url)
    const h4 = document.createElement('h4')
    h4.textContent = 'Títulos:'
    const h4_2 = document.createElement('h4')
    h4_2.textContent = `Source: ${item.source}`
    const h4_3 = document.createElement('h4')
    h4_3.textContent = `Estatus: ${item.status}`
    const h4_4 = document.createElement('h4')
    h4_4.textContent = `Popularidad: ${item.popularity}`
    const h4_5 = document.createElement('h4')
    h4_5.textContent = `Rank: ${item.rank}`
    const ul = document.createElement('ul')
    const array = item.titles
    array.forEach(titulo=>{
        ul.innerHTML += `<li>${titulo.title}</li>`
    })
    modalItem.append(h3,img,h4_2,h4_3,h4_4,h4_5,h4,ul)
    console.log(item)
}

closeModal.addEventListener('click', ()=>{
    modal.classList.remove('show')
})


//Top Animne
const topAnime = async ()=>{
    const api = await fetch('https://api.jikan.moe/v4/top/anime')
    const data = await api.json()
    mostrarTopAnime(data.data)
}
topAnime()

const mostrarTopAnime=(array)=>{
    const items = document.querySelectorAll('.slide-anime')
        items.forEach((contenedor,index)=>{
            array.forEach((anime, i)=>{
                if (index == i) {
                    contenedor.innerHTML = `
                    <div class="anime-item">
                        <div class="img-container">
                            <img src="${anime.images.jpg.image_url}" alt="">
                        </div>
                        <p>${anime.title}</p>
                    </div>
                    `
                }
            })
        })
}

//Top Manga
const topManga= async()=>{
    const url = await fetch('https://api.jikan.moe/v4/top/manga');
    const data = await url.json()
    mostrarTopManga(data.data)
}
topManga()

const mostrarTopManga=(array)=>{
    const items = document.querySelectorAll('.slide-manga')
    items.forEach((contenedor,index)=>{
        array.forEach((anime, i)=>{
            if (index == i) {
                contenedor.innerHTML = `
                <div class="anime-item">
                    <div class="img-container">
                        <img src="${anime.images.jpg.image_url}" alt="">
                    </div>
                    <p>${anime.title}</p>
                </div>
                `
            }
        })
    })
}

//Top Personajes
const topPersonajes= async()=>{
    const url = await fetch('https://api.jikan.moe/v4/top/characters');
    const data = await url.json()
    mostrarTopPersonajes(data.data)
}
topPersonajes()

const mostrarTopPersonajes=(array)=>{
    const items = document.querySelectorAll('.slide-personajes')
    items.forEach((contenedor,index)=>{
        array.forEach((anime, i)=>{
            if (index == i) {
                contenedor.innerHTML = `
                <div class="anime-item">
                    <div class="img-container">
                        <img src="${anime.images.jpg.image_url}" alt="">
                    </div>
                    <p>${anime.name}</p>
                </div>
                `
            }
        })
    })
}

//Nav
menu.addEventListener('click', ()=>{
    const list = document.querySelector('ul')
    list.classList.toggle('show')

    if (list.classList.contains('show')) {
        menu.setAttribute('name', 'close')
    }else{
        menu.setAttribute('name', 'menu')
    }
})

const nav = document.querySelector('nav')
window.addEventListener('scroll', ()=>{
    if (window.scrollY > 40) {
        nav.style = 'background: #51669a'
    }else{
        nav.style = 'background: transparent'
    }
})

window.addEventListener('load', ()=>{
    const preloader = document.querySelector('.preloader')
    preloader.style = 'display: none;'
})

