const bookList = [];

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const section = document.querySelector('.bookings');
let count = 0;

function addBook(Title, Author) {
  const booky = new Books(Title, Author);
  bookList.push(booky);

  const container = document.createElement('div');
  const names = document.createElement('h3');
  const authors = document.createElement('h4');
  const button = document.createElement('button');
  const line = document.createElement('span');

  section.append(container);
  container.append(names);
  container.append(authors);
  container.append(button);
  container.append(line);

  const counting = `count${count}`;
  const buttoning = `button${count}`;

  container.setAttribute('class', 'booksection');
  container.setAttribute('id', counting);
  names.innerText = booky.title;
  authors.innerText = booky.author;
  button.setAttribute('class', 'removebutton');
  button.setAttribute('id', buttoning);
  button.innerHTML = 'Remove';
  line.setAttribute('class', 'line');
  count += 1;
}

function removeList(name, author) {
  for (let x = 0; x < bookList.length; x += 1) {
    if ((bookList[x].title === name) && (bookList[x].author === author)) {
      bookList.splice(x, 1);
      break;
    }
  }
}

function removeBook(args) {
  let count1 = 0;
  for (let x = 0; x < count; x += 1) {
    if (args === (`button${count1}`)) {
      const ids = `count${count1}`;
      const nam = `#count${count1} h3`;
      const auth = `#count${count1} h4`;
      const nodes = document.getElementById(ids);
      const names = document.querySelector(nam);
      const author = document.querySelector(auth);

      if (nodes != null) {
        removeList(names.innerHTML, author.innerHTML);
        nodes.parentNode.removeChild(nodes);
      }
    }
    count1 += 1;
  }
}

const next = document.getElementById('addButton');
const forms = document.getElementById('formAdd');

forms.addEventListener('submit', (event) => {
  event.preventDefault();
});

function populate() {
  const instances = {
    figures: [],
  };

  console.log(...bookList);
  instances.figures.push(...bookList);
  localStorage.setItem('instances', JSON.stringify(instances));
}

next.addEventListener('click', () => {
  if (forms.elements.title.value !== '') addBook(forms.elements.title.value, forms.elements.author.value);
  const next1 = document.querySelectorAll('.removebutton');
  next1.forEach((element) => {
    element.addEventListener('click', () => {
      if (element.getAttribute('id')) {
        removeBook(element.getAttribute('id'));
      }
      populate();
    });
  });
});

function setForm() {
  const restore = JSON.parse(localStorage.getItem('instances'));
  if (restore) {
    restore.figures.forEach((adding) => {
      addBook(adding.title, adding.author);
    });
  }
  const reload = document.querySelectorAll('.removebutton');
  reload.forEach((element) => {
    element.addEventListener('click', () => {
      if (element.getAttribute('id')){
        removeBook(element.getAttribute('id'));
      }
      populate();
    });
  });
}

if (!localStorage.getItem('instance')) {
  setForm();
}

next.addEventListener('click', () => {
  setTimeout(populate(), 100);
});
