const fs = require('fs');

class Sorter {
  constructor(arr) {
    this.originalArr = arr;
    this.arr = [...arr]; // Création d'une copie du tableau d'origine pour le tri
  }

  // Tri à bulles
  bubbleSort() {
    let comparisons = 0;
    const n = this.arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (this.arr[j] > this.arr[j + 1]) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
        }
      }
    }
    return comparisons;
  }

  // Tri par insertion
  insertionSort() {
    let comparisons = 0;
    for (let i = 1; i < this.arr.length; i++) {
      const key = this.arr[i];
      let j = i - 1;
      while (j >= 0 && this.arr[j] > key) {
        comparisons++;
        this.arr[j + 1] = this.arr[j];
        j--;
      }
      comparisons++;
      this.arr[j + 1] = key;
    }
    return comparisons;
  }

  // Tri par sélection
  selectionSort() {
    let comparisons = 0;
    for (let i = 0; i < this.arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < this.arr.length; j++) {
        comparisons++;
        if (this.arr[j] < this.arr[minIdx]) {
          minIdx = j;
        }
      }
      [this.arr[i], this.arr[minIdx]] = [this.arr[minIdx], this.arr[i]];
    }
    return comparisons;
  }

  // Tri rapide (quicksort)
  quickSort() {
    return this._quickSort(this.arr, 0, this.arr.length - 1);
  }

  _quickSort(arr, low, high) {
    let comparisons = 0;
    if (low < high) {
      const { pi, comp } = this.partition(arr, low, high);
      comparisons += comp;
      comparisons += this._quickSort(arr, low, pi - 1);
      comparisons += this._quickSort(arr, pi + 1, high);
    }
    return comparisons;
  }

  partition(arr, low, high) {
    const pivot = arr[low]; // On prend le premier élément comme pivot
    let left = low + 1;
    let right = high;
    let comparisons = 0;

    while (left <= right) {
      comparisons++;
      while (left <= right && arr[left] <= pivot) {
        comparisons++;
        left++;
      }
      while (left <= right && arr[right] > pivot) {
        comparisons++;
        right--;
      }
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }

    [arr[low], arr[right]] = [arr[right], arr[low]]; // Mettre le pivot à sa position finale
    return { pi: right, comp: comparisons };
  }
}

// Fonction pour lire le fichier et extraire les nombres
function readFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content) {
      throw new Error('Le fichier est vide.');
    }
    const numbers = content.trim().split(/\s+/).map(str => {
      const num = parseFloat(str);
      if (isNaN(num)) throw new Error(`Valeur invalide trouvée : ${str}`);
      return num;
    });
    return numbers;
  } catch (err) {
    console.error(`Erreur: ${err.message}`);
    process.exit(1);
  }
}

// Fonction principale
function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Erreur : Veuillez fournir un fichier en paramètre.');
    process.exit(1);
  }

  const originalArray = readFile(filePath);

  // Création d'une instance de Sorter avec le tableau original
  const sorter = new Sorter(originalArray);

  let comparisons = sorter.bubbleSort();
  console.log(`Tri à bulle: ${comparisons} comparaisons - [${sorter.arr}]`);

  // Réinitialiser le tableau
  sorter.arr = [...originalArray];
  comparisons = sorter.insertionSort();
  console.log(`Tri par insertion: ${comparisons} comparaisons - [${sorter.arr}]`);

  // Réinitialiser le tableau
  sorter.arr = [...originalArray];
  comparisons = sorter.selectionSort();
  console.log(`Tri par sélection: ${comparisons} comparaisons - [${sorter.arr}]`);

  // Réinitialiser le tableau
  sorter.arr = [...originalArray];
  comparisons = sorter.quickSort();
  console.log(`Tri rapide: ${comparisons} comparaisons - [${sorter.arr}]`);
}

// Exécution du programme principal
main();
