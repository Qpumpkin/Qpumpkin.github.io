var qpumpkin = {
  chunk:
  function chunk(array,size=1) {
    let subSize = 0;
    let subArr = [];
    let res = [];

    for (let i=0; i<array.length; i++) {
      subArr.push(array[i]);
      subSize += 1;
      if (subSize === size) {
        res.push(subArr);
        subArr = [];
        subSize = 0;
      }
    }
    subSize>0 && res.push(subArr);

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
  function difference(array,...values) {
    let ref = [];
    values.forEach(
      value => ref.push(...value)
    );

    let refTable = new Set();
    ref.forEach(
      unit => {
        refTable.has(unit) || refTable.add(unit);
      }
    );

    let res = array.filter(
      element => !refTable.has(element)
    );
    return res;
  },
  differenceBy:
  function differenceBy(array,...rest) {
    let last = rest.length - 1;
    let ref = [];
    for (let i=0; i<last; i++) {
      ref.push(...rest[i]);
    }
    
    let compare = rest[last];
    let refTable = new Set();
    ref.forEach(
      element => {
        let criterion = criterionProduce(element,compare);
        refTable.has(criterion) || refTable.add(criterion);
      }
    );

    let out = array.filter(
      element => {
        let criterion = criterionProduce(element, compare);
        return !refTable.has(criterion);
      }
    );
    return out;

    function criterionProduce(data,comp) {
      if (comp instanceof Function) {
        return comp(data);
      } else {
        return data[comp];
      }
    }
  },
  differenceWith:
  function differenceWith(arr,otArr,comp) {
    let [ref] = otArr;

    let out = arr.filter(
      element => comp(element,ref)
    );
    return out;
  },
  drop:
  function drop(array,n=1) {
    let out = [];
    for (let i=n; i<array.length; i++) {
      out.push(array[i]);
    }
    return out;
  },
  dropRight:
  function dropRight(array,n=1) {
    let len = array.length;
    if (n >= len) {
      return [];
    } else {
      let outL = len - n;
      let out = [];
      for (let i=0; i<outL; i++) {
        out.push(array[i]);
      }

      return out;
    }
  },
  dropRightWhile:
  function dropRightWhile(array,condition) {
    
    condition = judge(condition);

    let outLen;
    for (let i=array.length-1; i>=0; i--) {
      if (!condition(array[i])) {
        outLen = i+1;
        break;
      }
    }
    let out = [];
    for (let i=0; i<outLen; i++) {
      out.push(array[i]);
    }
    return out;

    function judge(condition) {
      if (condition instanceof Function) {
        
        return condition;

      } else if (condition instanceof Array) {
        
        let match =  (input) => {
          let comp = input[condition[0]];
          return comp === condition[1];
        };
        return match;

      } else if (condition instanceof Object) {
        
        let match = (input) => {
          for (let property in condition) {
            if (input[property] !== condition[property]) {
              return false;
            }
          }
          return true;
        }
        return match;

      } else {

        let match = (input) => input[condition];
        return match;

      }
    }
  },
};
// var users = [
//   { 'user': 'barney', 'active': true },
//   { 'user': 'fred', 'active': false },
//   { 'user': 'pebbles', 'active': false }
// ];
// console.log(
//   qpumpkin.chunk(
//     ["a","b","c","d","d"], )
// );