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
  function concat(...arg) {
    return this.flatten(arg);
  },
  difference:
  function difference(array,values) {
    let refTable = new Set();
    values.forEach(
      unit => {
        refTable.add(unit);
      }
    );

    let res = array.filter(
      element => !refTable.has(element)
    );
    return res;
  },
  differenceBy:
  function differenceBy(array,reference,predicate) {
    let refTable = new Set();
    reference.forEach(
      element => {
        let criterion = criterionProduce(element,predicate);
        refTable.has(criterion) || refTable.add(criterion);
      }
    );

    let out = array.filter(
      element => {
        let criterion = criterionProduce(element, predicate);
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
      element => !comp(element,ref)
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
  function dropRightWhile(array,predicate) {
    predicate = analyseComp(predicate);

    let outLen;
    for (let i=array.length-1; i>=0; i--) {
      if (!predicate(array[i])) {
        outLen = i+1;
        break;
      }
    }
    let out = [];
    for (let i=0; i<outLen; i++) {
      out.push(array[i]);
    }
    return out;
  },
  dropWhile:
  function dropWhile(array,predicate) {
    predicate = analyseComp(predicate);
    
    let dropLen = 0;
    for (let i=0; i<array.length; i++) {
      if (predicate(array[i])) {
        dropLen += 1;
      } else {
        break;
      }
    }

    if (dropLen === 0) {
      return array;
    } else if (dropLen === array.length) {
      return [];
    } else {
      let out = [];
      for (let j=dropLen; j<array.length; j++) {
        out.push(array[j]);
      }
  
      return out;
    }
  },
  fill:
  function fill(array,value,start=0,end=array.length) {
    for (let i=start; i<end; i++) {
      array[i] = value;
    }
    return array;
  },
  findIndex:
  function findIndex(array,predicate,fromIndex=0) {
    predicate = analyseComp(predicate);
    for (let i=fromIndex; i<array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  },
  findLastIndex:
  function findLastIndex(array,predicate,fromIndex=array.length-1) {
    predicate = analyseComp(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  },
  head:
  function head(array) {
    return (array && array.length) ? array[0] : undefined;
  },
  flatten:
  function flatten(array) {
    let out = [];
    for (let i=0; i<array.length; i++) {
      if (array[i] instanceof Array) {
        out.push(...array[i]);
      } else {
        out.push(array[i]);
      }
    }
    return out;
  },
  flattenDeep:
  function flattenDeep(array) {
    if (array instanceof Array) {
      let res = [];
      let unit;
      for (let i = 0; i < array.length; i++) {
        unit = array[i];
        if (unit instanceof Array) {
          unit = flattenDeep(unit);
          res.push(...unit);
        } else {
          res.push(unit);
        }
      }
      return res;
    } else {
      return [array];
    }
  },
  flattenDepth:
  function flattenDepth(array,Depth=1) {
    if (Depth < 1) {
      return array;
    } else {
      let count = 0;
      let out = array;
      while (count < Depth) {
        out = this.flatten(out);
        count += 1;
      }
      return out;
    }
  },
  fromPairs:
  function fromPairs(pairs) {
    let objPairs = this.flatten(pairs);
    let out = {};
    for (let i=0; i<objPairs.length; i+=2) {
      out[objPairs[i]] = objPairs[i+1];
    }

    return out;
  },
  indexOf:
  function indexOf(array,value,fromIndex=0) {
    if (!(array&&array.length)) {
      return -1;
    } else {
      fromIndex = parseInt(fromIndex);
      fromIndex = fromIndex>0 ? fromIndex : array.length+fromIndex;
      for (let i=fromIndex; i<array.length; i++) {
        if (array[i] == value) {
          if (typeof array[i] == typeof value) {
            return i;
          }
        }
      }
      return -1;
    }
  },
  initial:
  function initial(array) {
    if (!(array&&array.length>1)) {
      return [];
    } else {
      return array.slice(0,array.length-1);
    }
  },
  intersection:
  function intersection(array,...arrays) {
    arrays = this.flatten(arrays);
    let map = new Map();
    for (let i=0; i<array.length; i++) {
      map.has(array[i]) || map.set(array[i],i);
    }
    let save = [];
    for (let value of arrays) {
      map.has(value) && (save[map.get(value)]=value);
    }
    let out = [];
    save.forEach( element => out.push(element) );
    return out;
  },
  intersectionBy:
  function intersectionBy(array,arrays,predicate) {
    predicate = analyseComp(predicate);
    for (let i=0; i<array.length; i++) {
      
    }
  },

};

function analyseComp(con) {
  if (con instanceof Function) {  
    return con;
  } else if (con instanceof Array) {
    let match =  (input) => {
      let comp = input[con[0]];
      return comp === con[1];
    };
    return match;
  } else if (con instanceof Object) {
    let match = (input) => {
      for (let property in con) {
        if (input[property] !== con[property]) {
          return false;
        }
      }
      return true;
    }
    return match;
  } else {
    let match = (input) => input[con];
    return match;
  }
}
console.log(qpumpkin.intersection([2,1,1,3,4,5,2,3],[2,6,5,3]))
console.log(qpumpkin.fromPairs([
  ['a', 1],
  ['b', 2]
]))
console.log(qpumpkin.flattenDepth([1, [2, [3, [4]], 5]],2));
console.log(qpumpkin.flattenDeep([1, [2, [3, [4]], 5]]))
console.log(qpumpkin.flatten([1, [2, [3, [4]], 5]]));
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred', 'active': false },
  { 'user': 'pebbles', 'active': false }
];
console.log(qpumpkin.findLastIndex(users,"active"));
console.log(qpumpkin.findIndex(users, "active"));
console.log(qpumpkin.dropWhile(users,"active"));
console.log(qpumpkin.difference([2,1], [2,3]))
console.log(
  qpumpkin.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x')
);
console.log(qpumpkin.fill([4, 6, 8, 10], '*', 1, 3))