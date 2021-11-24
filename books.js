/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
class Book2 {
  constructor(title, author, next_node = null) {
    this.title = title;
    this.author = author;
  }
}

class BookList2 {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(title, author) {
    const newnode = new Book2(title, author);
    if (this.tail === null) {
      this.head = newnode;
      this.tail = newnode;
    } else {
      this.tail.next_node = newnode;
      this.tail = newnode;
    }
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count += 1;
      node = node.next_node;
    }
    return count;
  }

  print() {
    let nodes = this.head;
    while (nodes) {
      nodes = nodes.next_node;
      return `${nodes.title} ${nodes.author}`;
    }
    return null;
  }

  printArray() {
    const arr = [];
    let node = this.head;
    while (node) {
      const obj = {
        title: node.title,
        author: node.author,
      };
      arr.push(obj);
      node = node.next_node;
    }
    return arr;
  }

  get(index) {
    let node = this.head;
    let count = 0;
    while (node) {
      if (index === count) { return `${node.title} ${node.author}`; }
      node = node.next_node;
      count += 1;
    }
    return null;
  }

  remove(number) {
    let node = this.head;
    let node2 = this.head;
    let newnode = this.head;
    let count = 0;
    while (node) {
      if (number === count) {
        newnode = node.next_node;
      }
      node = node.next_node;
      count += 1;
    }

    count = 0;
    while (node2) {
      if (count === number - 1) {
        node2.next_node = newnode;
      } else if (number === 0) {
        this.head = node2.next_node;
        break;
      }
      node2 = node2.next_node;
      count += 1;
    }

    if (this.head === undefined) {
      this.head = null;
      this.tail = null;
    }
  }

  addAt(index, title, author) {
    const newnode = new Book2(title, author);
    let count = 0;
    let node = this.head;
    if (this.tail === null) {
      this.head = newnode;
      this.tail = newnode;
    } else {
      while (node) {
        if (count === index - 1) {
          newnode.next_node = node.next_node;
          node.next_node = newnode;
        } else if (index === 0) {
          newnode.next_node = this.head;
          this.head = newnode;
          break;
        }
        count += 1;
        node = node.next_node;
      }
    }
  }
}

const lists = new BookList2();

const section = document.querySelector('.bookings');
let count = 0;

function addBook(Title, Author) {
  const booky = new Book2(Title, Author);

  lists.add(booky.title, booky.author);

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
  const arr = lists.printArray();
  for (let x = 0; x < arr.length; x += 1) {
    if ((arr[x].title === name) && (arr[x].author === author)) {
      lists.remove(x);
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
  const instances1 = {
    figures1: [],
  };

  instances1.figures1.push(lists);
  localStorage.setItem('instances1', JSON.stringify(instances1));
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
  const restore1 = JSON.parse(localStorage.getItem('instances1'));
  const newList = new BookList2();
  if (restore1 != null) {
    newList.head = restore1.figures1[0].head;
    newList.tail = restore1.figures1[0].tail;
  }

  if (restore1) {
    newList.printArray().forEach((adding) => {
      addBook(adding.title, adding.author);
    });
  }
  const reload = document.querySelectorAll('.removebutton');
  reload.forEach((element) => {
    element.addEventListener('click', () => {
      if (element.getAttribute('id')) {
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
