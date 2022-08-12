const randomArray = (array) => {
  for (let i = array.length; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const arrayI = array[i];
    const arrayJ = array[j];
    array[j] = arrayI;
    array[i] = arrayJ;
  }
  return array;
};

export default randomArray;
