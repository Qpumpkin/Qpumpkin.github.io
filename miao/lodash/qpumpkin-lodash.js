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
  compact:
  function compact(array) {
    let res = [];
    for (let i=0; i<array.length; i++) {
      array[i] && res.push(array[i]);
    }
    return res;
  },
  concat:
  function concat() {
    let arg = [];
    for (let i=0; i<arguments.length; i++) {
      arg.push(arguments[i]);
    }
    let res = deconstruct(arg);
    return res;

    function deconstruct(arr) {
      if (arr instanceof Array) {
        let res = [];
        let unit;
        for (let i=0; i<arr.length; i++) {
          unit = arr[i];
          if (unit instanceof Array) {
            unit = deconstruct(unit);
            res.push(...unit);
          } else {
            res.push(unit);
          }
        }
        return res;
      } else {
        return [arr];
      }     
    }
  },
  difference:
  function difference(array,values) {
    let res = [];
    let map = new Set();
    for (let value of values) {
      !map.has(value) && map.add(value);
    }

    let cur;
    for (let i=0; i<array.length; i++) {
      cur = array[i];
      !map.has(cur) && res.push(cur);
    }
    return res;
  },
}