var qpumpkin = {
  chunk:
  function chunk(array,size=1) {
    let subSize = 1;
    let subArr = [];
    let res = [];

    for (let i=0; i<array.length; i++) {
      subArr.push(array[i]);

      if (subSize === size) {
        res.push(subArr);
        subArr = [];
        subSize = 1;
      } else {
        subSize += 1;
      }
    }
    subArr.length>0 && res.push(subArr);

    return res;
  },
}