const bookList = [];

class books {
  constructor(title, author){
    this.title = title;
    this.author = author;
  }
}

const section = document.querySelector('.bookings');

function addBook(title, author){
  let booky = new books(title, author);
  bookList.push(booky);

  const container = document.createElement('div');
  const names = document.createElement('h4');
  const authors = document.createElement('h4');
  const button = document.createElement('button');
  const line = document.createElement('span');

  section.append(container);
  container.append(names);
  container.append(authors);
  container.append(button);
  container.append(line);

  container.setAttribute('class', 'booksection');
  names.innerText = booky.title;
  authors.innerText = booky.author;
  button.setAttribute('class', 'removebutton');
  button.innerHTML = 'Remove';
  line.setAttribute('class', 'line');
}

function removeBook(book){
  for(let x = 0; x < bookList.length; x++){
    if(bookList[x] === book){
      bookList.splice(x,1);
    }
  }
}

const next = document.getElementById('addButton');
const forms = document.getElementById('formAdd');

forms.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook(forms.elements.title.value, forms.elements.author.value);
});

function setForm(){
  const restore = JSON.parse(localStorage.getItem('intances'));

  restore.figures.forEach(element => {
    addBook(element.title, element.author);
  });
}

function populate() {
  const instances = {
    figures: [...bookList]
  };

  localStorage.setItem('instances', JSON.stringify(instances));
  setForm();
}







