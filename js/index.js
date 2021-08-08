// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); 
const maxWeightInput = document.querySelector('.maxweight__input'); 

const colorMap = new Map();
colorMap.set("фиолетовый", "violet");
colorMap.set("зеленый", "green");
colorMap.set("розово-красный", "carmazin");
colorMap.set("желтый", "yellow");
colorMap.set("светло-коричневый", "lightbrown");

var currentSortMethod = 0;

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruitsOrigin = JSON.parse(fruitsJSON);
let fruits = fruitsOrigin.slice();

/*** ОТОБРАЖЕНИЕ ***/

function createFruitDiv(innerText)
{
  let tempDiv = document.createElement("div");
  tempDiv.insertAdjacentText('beforeend', innerText);
  return tempDiv;
}

// отрисовка карточек
const display = () => {
  for(let i=fruitsList.children.length-1; i>=0; i--)
    fruitsList.removeChild(fruitsList.children[i]);
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    let li = document.createElement('li');
    li.classList.add(`fruit__item`);
    li.classList.add(`fruit_${colorMap.get(fruits[i].color)}`);

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("fruit__info");

    infoDiv.insertAdjacentElement('beforeend', createFruitDiv(`index: ${i}`));
    infoDiv.insertAdjacentElement('beforeend', createFruitDiv(`kind: ${fruits[i].kind}`));
    infoDiv.insertAdjacentElement('beforeend', createFruitDiv(`color: ${fruits[i].color}`));
    infoDiv.insertAdjacentElement('beforeend', createFruitDiv(`weight (кг): ${fruits[i].weight}`));
    
    li.insertAdjacentElement('beforeend', infoDiv);
    fruitsList.insertAdjacentElement('beforeend', li);
    
  }
};



// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let shuffled = false;
  for (let i = fruitsOrigin.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j!=i) shuffled = true;
    [fruitsOrigin[i], fruitsOrigin[j]] = [fruitsOrigin[j], fruitsOrigin[i]];
    if (!shuffled) alert("Перемешивание привело к тому же результату");
}
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  filterFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let minValue = + minWeightInput.value;
  minValue = minValue || 0;

  let maxValue = + maxWeightInput.value;
  maxValue = maxValue || Infinity;
  
  fruits = fruitsOrigin.slice().filter((item) => 
     item.weight<=maxValue && item.weight>=minValue
  );
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/


let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let colorArr = Array.from(colorMap.keys());
  return colorArr.indexOf(a.color)<colorArr.indexOf(b.color);
};

const sortAPI = [
  {
    name : "BubbleSort",
    sort : function(arr, comparation)
    {
      bubbleSort(arr, comparation)  
    }
  },
  {
    name : "QuickSort",
    sort : function(arr, comparation)
    {
      
      quickSort(arr, "", "", comparation)
    }
  }

];

function bubbleSort(arr, comparation)
{
  const n = arr.length;
  for (let i = 0; i < n-1; i++) { 
      for (let j = 0; j < n-1-i; j++) { 
          if (comparation(arr[j], arr[j+1])) { 
              [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
          }
      }
  }
}

function partition(items, left, right, comparation) {
  var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (comparation(pivot, items[i] )) {
          i++;
      }
      while (comparation(items[j], pivot )) {
          j--;
      }
      if (i <= j) {
          [items[i],items[j]]=[items[j],items[i]];
          i++;
          j--;
      }
  }
  return i;
}

function quickSort(items, left, right, comparation) {
  var index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right, comparation);
      if (left < index - 1) {
          quickSort(items, left, index - 1, comparation);
      }
      if (index < right) {
          quickSort(items, index, right, comparation);
      }
  }
  return items;
}
// инициализация полей
sortKindLabel.textContent = sortAPI[currentSortMethod].name;
sortTimeLabel.textConten ="-";

sortChangeButton.addEventListener('click', () => {
  currentSortMethod = (currentSortMethod + 1) % sortAPI.length;
  sortKindLabel.textContent = sortAPI[currentSortMethod].name;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = "sorting...";
  const start = new Date().getTime();
  sortAPI[currentSortMethod].sort(fruitsOrigin, comparationColor);
  const end = new Date().getTime();
  sortTime = `${end - start} ms`;
  filterFruits();
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if(addFruit())
  {
    filterFruits();
    display();
  }
});

function addFruit()
{
  let kindInputStr = kindInput.value;
  let weightInputStr = weightInput.value;
  let colorInputStr = colorInput.value;
  let newFruitWeight = + weightInputStr;
  if (isNaN(newFruitWeight))
  {
    alert("Неправильный вес");
    return false;
  }
  if (kindInputStr.length=0)
  {
    alert("Не указано название");
    return false;
  }
  if(Array.from(colorMap.keys()).indexOf(colorInputStr)==-1)
  {
    alert(`Неправильный цвет. Доступные цвета ${Array.from(colorMap.keys())}`);
    return false;
  }
  fruitsOrigin.push({"kind": kindInputStr, "color": colorInputStr, "weight": newFruitWeight}) ;
  kindInput.value="";
  weightInput.value="";
  colorInput.value="";
  return true;
}
