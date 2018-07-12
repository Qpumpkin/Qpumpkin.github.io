var qpumpkin = {
  chunk:
  function chunk(array,size=1) {
    let subSize = 0;
    let subArr = [];
    let res = [];

    for (let i=0; i<array.length; i++) {
      subArr.push(array[i]);

      if (subSize === size) {
        res.push(subArr);
        subArr = [];
        subSize = 0;
      } else {
        subSize += 1;
      }
    }
    subArr.length>0 && res.push(subArr);

    return res;
  },
}