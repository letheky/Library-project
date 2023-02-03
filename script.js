const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnAddBook = $('.add-btn')
const popupWindow = $('form')
const books = $('.books')
const header = $('.header')
const body = $('.body')
const title = $('#book-title')
const author = $('#book-author')
const pages = $('#book-pages')
const checkbox = $('#cbx')
const btnSubmit = $('.success')


let myLib = []
let bookTitle = bookAuthor = bookPages = ''
let isRead= false
let id = 0

function setBook(){
    return{
        'title':bookTitle,
        'author':bookAuthor,
        'pages':bookPages,
        'isRead':isRead
    }
}

function setLib(){
    myLib.push(setBook())
}

btnAddBook.onclick = () => { 
    popupWindow.setAttribute('style','visibility:visible')
}

function setLocalStorage(){
    const jsonLib = JSON.stringify(myLib)
    localStorage.setItem('library',jsonLib)
}

function reset(){
    title.value = ''
    author.value = ''
    pages.value = ''
    checkbox.checked = false
}

function getInputValue(){
    bookTitle = title.value
    bookAuthor = author.value
    bookPages = pages.value
    isRead = checkbox.checked
}

function createBook(){
    const div = document.createElement('div')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
    div.classList.add('book')
    div.id = `book${id + 1}`
    books.appendChild(div)
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(readBtn)
    div.appendChild(removeBtn)
    id++
    p1.textContent =bookTitle
    p2.textContent = bookAuthor
    p3.textContent = bookPages
    if(isRead){
        readBtn.textContent = "Readed"
        readBtn.classList.add('success')
    }
    else{
        readBtn.textContent = "Haven't Read"
        readBtn.classList.add('error')
    }
    removeBtn.classList.add('primary')
    removeBtn.id = `remove${id}`
    removeBtn.textContent = "Remove"
}

function removeBook(id){
    books.removeChild($(`#book${id}`))
}

btnSubmit.onclick = (e) =>{
    e.preventDefault()
    getInputValue()
    popupWindow.setAttribute('style','visibility:hidden')
    createBook()
    reset()
    setLib()
    const getAllRemoveBtn = $$('.primary');
    getAllRemoveBtn.forEach((presentRemoveBtn,index) => presentRemoveBtn.onclick = () =>{
        removeBook(index+1)
        myLib = myLib.filter((_,i)=>i!==index)
        id--
        setLocalStorage()
    })
    setLocalStorage()
}


