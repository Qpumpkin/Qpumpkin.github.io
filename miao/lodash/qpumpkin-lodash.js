var qpumpkin = {
  chunk:
  function chunk(array,size=1) {
    let subSize = 0;
    let subArr = [];
    let out = [];
    size = ensureNum(size,1);
    for (let i=0; i<array.length; i++) {
      subArr.push(array[i]);
      subSize += 1;
      if (subSize === size) {
        out.push(subArr);
        subArr = [];
        subSize = 0;
      }
    }
    subSize>0 && out.push(subArr);

    return out;
  },
  compact:
  function compact(array) {
    let out = [];
    for (let i=0; i<array.length; i++) {
      array[i] && out.push(array[i]);
    }
    return out;
  },
  concat:
  function concat(...arg) {
    return this.flatten(arg);
  },
  difference:
  function difference(array,...values) {
    values = this.flatten(values);
    let map = createMap(values);

    let out = array.filter(
      element => !map.has(element)
    );
    return out;
  },
  differenceBy:
  function differenceBy(array,...other) {
    let argLen = arguments.length;
    if (arguments[argLen-1] instanceof Array) {
      return this.difference(array,...other);
    } else {
      let predicate = this.iteratee(other.pop());
      let map = createMap(other,predicate);
      let out = array.filter(
        function (element) {
          let criterion = predicate(element);
          return !map.has(criterion);
        }
      );
  
      return out;
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
    if (array.length === 0) {
      return [];
    } else {
      n = ensureNum(n,1);
      let out = [];
      for (let i=n; i<array.length; i++) {
        out.push(array[i]);
      }
      
      return out;
    }
  },
  dropRight:
  function dropRight(array,n=1) {
    if (array.length === 0) {
      return [];
    } else {
      n = ensureNum(n,1);
      let len = array.length;
      if (n >= len) {
        return [];
      } else {
        let outL = len - n;
        let out = sliceArray(array,0,outL);
  
        return out;
      }
    }
  },
  dropRightWhile:
  function dropRightWhile(array,predicate) {
    predicate = this.iteratee(predicate);

    let outLen;
    for (let i=array.length-1; i>=0; i--) {
      if (!predicate(array[i])) {
        outLen = i+1;
        break;
      }
    }
    let out = sliceArray(array,0,outLen);

    return out;
  },
  dropWhile:
  function dropWhile(array,predicate) {
    predicate = this.iteratee(predicate);
    let dropLen = 0;
    for (let i=0; i<array.length; i++) {
      if (predicate(array[i])) {
        dropLen += 1;
      } else {
        break;
      }
    }
    let out = sliceArray(array,dropLen);

    return out;
  },
  fill:
  function fill(array,value,start=0,end=array.length) {
    let len = array.length;
    start = ensureNum(start,0,len);
    end = ensureNum(end,len,len);
    for (let i=start; i<end; i++) {
      array[i] = value;
    }
    return array;
  },
  findIndex:
  function findIndex(array,predicate,fromIndex=0) {
    if (!(array&&array.length>0)) {
      return -1;
    } else {
      predicate = this.iteratee(predicate);
      fromIndex = ensureNum(fromIndex,0,array.length);
      for (let i=fromIndex; i<array.length; i++) {
        if (predicate(array[i])) {
          return i;
        }
      }
  
      return -1;
    }
  },
  findLastIndex:
  function findLastIndex(array,predicate,fromIndex=array.length-1) {
    if (!(array&&array.length>0)) {
      return -1;
    } else {
      predicate = this.iteratee(predicate);
      fromIndex = ensureNum(fromIndex,array.length-1,array.length);
      for (let i = fromIndex; i >= 0; i--) {
        if (predicate(array[i])) {
          return i;
        }
      }
  
      return -1;
    }
  },
  head:
  function head(array) {
    return array[0];
  },
  flatten:
  function flatten(array) {
    return this.flattenDepth(array,1);
  },
  flattenDeep:
  function flattenDeep(array) {
    return this.flattenDepth(array,Infinity);
  },
  flattenDepth:
  function flattenDepth(array,depth=1) {
    if (depth == 0) {
      return array.slice();
    } else {
      let out = [];
      let temp;
      for (let i=0; i<array.length; i++) {
        if (array[i] instanceof Array) {
          temp = flattenDepth(array[i],depth-1);
          out.push(...temp);
        } else {
          out.push(array[i]);
        }
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
    if (array.length === 0) {
      return -1;
    } else {
      fromIndex = ensureNum(fromIndex,0);
      fromIndex
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
    if (!array.length>1) {
      return [];
    } else {
      let outLen = array.length - 1;
      let out = sliceArray(array,0,outLen);
      return out;
    }

    let outLen = array.length - 1;
    let out = sliceArray(array, 0, outLen);
    return out;
  },
  intersection:
  function intersection(array,...arrays) {
    arrays = this.flatten(arrays);
    let set = new Set();
    arrays.forEach(
      function (element) {
        set.has(element) || set.add(element);
      }
    );

    let out = array.filter(
      element => set.has(element)
    );

    return out
  },
  intersectionBy:
  function intersectionBy(array,...rest) {
    let predicate = this.iteratee(rest.pop());
    rest = this.flatten(rest);
    let map = createMap(rest,predicate);

    let out = array.filter(
      element => map.has(predicate(element))
    );

    return out;
  },
  intersectionWith:
  function intersectionWith(array,...rest) {
    let predicate = rest.pop();
    rest = this.flatten(rest);
    let out = array.filter(
      function (element) {
        for (item of rest) {
          if (predicate(element,item)) {
            return true;
          }
        }

        return false;
      }
    );

    return out;
  },
  join:
  function join(array,separator=",") {
    if (!(array&&array.length>0)) {
      return "";
    } else {
      let out = array.reduce(
        function (result,element,index) {
          if (element===undefined && element===null) {
            element = "";
          } else {
            element = element.toString();
          }
          if (index == 0) {
            result += element;
          } else {
            result += (separator+element);
          }
          return result;
        },"");

      return out;
    }
  },
  last:
  function last(array) {
    return array[array.length - 1];
  },
  lastIndexOf:
  function lastIndexOf(array,value,fromIndex=array.length-1) {
    if (!(array&&array.length>0)) {
      return -1;
    } else {
      fromIndex = ensureNum(fromIndex);
      for(let i=fromIndex; i>=0; i--) {
        if (array[i] === value) {
          return i;
        }
      }

      return -1;
    }
  },
  nth:
  function nth(array,n=0) {
    if (n < 0) {
      return array[array.length + n];
    } else {
      return array[n];
    }
  },
  pull:
  function pull(array,...values) {
    if (array.length < 1) {
      return array;
    } else {
      let index = 0;
      let map = createMap(values);
      for (let i=0; i<array.length; i++) {
        let cur = array[i];
        if (!map.has(cur)) {
          array[index] = cur;
          index += 1;
        }
      }
      array.length = index;
      return array;
    }
  },
  pullAll:
  function pullAll(array,values) {
    return this.pull.apply(null,[array, ...values]);
  },
  pullAllBy:
  function pullAllBy(array,values,predicate) {
    predicate = this.iteratee(predicate);
    let map = createMap(values,predicate);
    let index = 0;
    for (let i=0; i<array.length; i++) {
      let cur = array[i];
      if (!map.has(predicate(cur))) {
        array[index] = cur;
        index += 1;
      }
    }
    array.length = index;
    return array;
  },
  pullAllWith:
  function pullAllWith(array,values,comparator) {
    let index = 0;
    for (let i=0; i<array.length; i++) {
      let cur = array[i];
      let flag = false;
      for (let item of values) {
        if (comparator(cur,item)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        array[index] = cur;
        index += 1;
      }
    }
    array.length = index;
    return array;
  },
  pullAt:
  function pullAt(array,indexes) {
    let map = createMap(indexes);
    let index = 0;
    let pulled = [];
    for (let i=0; i<array.length; i++) {
      if (!map.has(i)) {
        array[index] = array[i];
        index += 1;
      } else {
        pulled.push(array[i]);
      }
    }
    array.length = index;
    return pulled;
  },
  reverse:
  function reverse(array) {
    array = array.map(element => element);
    let left = 0, right = array.length - 1;
    while (left < right) {
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      left += 1;
      right -= 1;
    }
    return array;
  },
  isEqual:
  function isEqual(value,other) {
    if (value === other) {
      return true;
    } else if (value instanceof Object && other instanceof Object) {
      let vKeys = Object.keys(value);
      let oKeys = Object.keys(other);
        
      if (vKeys.length != oKeys.length) {
        return false;
      } else {
        for (let i=0; i<vKeys.length; i++) {
          let cur = vKeys[i];
          if (!oKeys.includes(cur)) {
            return false;
          }
        }
        for (let i=0; i<vKeys.length; i++) {
          let curKey = vKeys[i];
          if (value[curKey] !== other[curKey]) {
            if (!isEqual(value[curKey],other[curKey])) {
              return false;
            }
          }
        }

        return true;
      }
    } else {
        return false;
    }
  },
  identity:
  function identity(value) {
    return value;
  },
  bind:
  function bind(func, thisArg, ...partials) {
    return function (...arg) {
      let args = [];
      let index = 0;
      for (let i = 0; i < partials.length; i++) {
        if (partials[i] === qpumpkin) {
          args.push(arg[index]);
          index += 1;
        } else {
          args.push(partials[i]);
        }
      }
      args = args.concat(arg.slice(index));

      return func.apply(thisArg, args);
    }
  },
  iteratee:
  function iteratee(value) {
    if (value instanceof Function) {
      return value;
    } else if (value instanceof Array) {
      
      return function(object) {
        let predicate;
        let end = value.length - 1;
        for(let i=0; i<end; i+=2) {//issue reason: i only add 1 in each loop, so it caused the key and value is not matched.
          predicate = this.matchesProperty(value[i],value[i+1]);
          if (!predicate(object)) {
            return false;
          }
        }
        return true;
      }.bind(this);

    } else if (value instanceof Object) {
      return object => this.isMatch(object,value);
    } else {
      return object => object[value];
    }
  },
  matchesProperty:
  function matchesProperty(key,value) {
    return object => this.isEqual(object[key],value);
  },
  matches:
  function matches(source) {
    return value => {
      let predicate;
      for (key in source) {
        predicate = this.matchesProperty(key,source[key]);
        if (!predicate(value)) {
          return false;
        }
      }

      return true;
    }
  },
  isMatch:
  function isMatch(object,source) {
    let predicate = this.matches(source);
    return predicate(object);
  },
  remove:
  function remove(array,predicate) {
    predicate = this.iteratee(predicate);
    let out = [];
    let saveIndex = [];
    for (let i=0; i<array.length; i++) {
      if (predicate(array[i],i,array)) {
        out.push(array[i]);
      } else {
        saveIndex.push(i);
      }
    }
    //this.pull(array,out);
    for (let j=0; j<saveIndex.length; j++) {
      array[j] = array[saveIndex[j]];
    }
    array.length = saveIndex.length;
    return out;
  },
  filter:
  function filter(collection,predicate) {
    predicate = this.iteratee(predicate);
    if (collection instanceof Array) {
      let out = [];
      for (let i=0; i<collection.length; i++) {
        let cur = collection[i];
        predicate(cur,i,collection) && out.push(cur);
      }
      return out;
    } else if (collection instanceof Object) {
      let out = {};
      for (let key in collection) {
        let cur = collection[key];
        predicate(cur,key,collection) && (out[key]=cur);
      }
      return out;
    }
  },
  forEach:
  function forEach(collection,operate) {
    if (collection instanceof Array) {
      for (let i=0; i<collection.length; i++) {
        let cur = collection[i];
        if (operate(cur,i,collection) == false) {
          return collection;
        }
      }
      return collection;
    } else {
      for (let key in collection) {
        let cur = collection[key];
        if (operate(cur,key,collection) == false) {
          return collection;
        }
      }
      return collection;
    }
  },
  reduce:
  function reduce(collection,func,accumulator) {
    if (collection instanceof Array) {
      accumulator = accumulator==undefined ? collection[0] : accumulator;
      for (let i=0; i<collection.length; i++) {
        let cur = collection[i];
        accumulator = func(accumulator,cur,i,collection);
      }
      return accumulator;
    } else if (collection instanceof Object) {
      accumulator = accumulator==undefined ? {} : accumulator;
      for (let key of collection) {
        let cur = collection[key];
        accumulator = func(accumulator,cur,key,collection);
      }
      return accumulator;
    }
  },
  groupBy:
  function groupBy(collection,predicate) {
    predicate = this.iteratee(predicate);
    if (collection instanceof Array) {
      let out = {};
      for (let i=0; i<collection.length; i++) {
        let cur = collection[i];
        let key = predicate(cur);
        if (out[key] == undefined) {
          out[key] = [cur];
        } else {
          out[key].push(cur);
        }
      }
      return out;
    } else {
      let out = {};
      for (let property in collection) {
        let cur = collection[property];
        let key = predicate(cur);
        if (out[key] == undefined) {
          out[key] = [cur];
        } else {
          out[key].push(cur);
        }
      }
      return out;
    }
  },
};



function sliceArray(array,begin=0,end=array.length,step=1) {
  let out = []
  begin = ensureNum(begin,0,array.length);
  end = ensureNum(end,array.length,array.length);
  step = isNaN(step) ? 1 : parseInt(step);
  for (let i=begin; i<end; i+=step) {
    out.push(array[i]);
  }
  return out;
}

function createMap(values,convertor) {
  if (convertor !== undefined) {
    values = values.map(element => convertor(element));
  }
  let map = new Set(values);
  return map;
}

function ensureNum(value,initial,backward) {
  if (isNaN(value)) {
    return initial;
  } else if (value < 0) {
    if (backward != undefined) {
      value = Math.abs(value)>backward ? 0 : backward+value;
      return value;
    } else {
      return initial;
    }
  } else {
    return value;
  }
}

console.log(qpumpkin.reverse([1,2,3]));
console.log(qpumpkin.pull(['a', 'b', 'c', 'a', 'b', 'c'],'a','c'));
console.log(qpumpkin.pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c']))
console.log(qpumpkin.pullAllBy([{'x':1},{'x':2},{'x':3},{'x':1}],[{ 'x': 1 }, { 'x': 3 }], 'x'));
console.log(qpumpkin.pullAt(['a', 'b', 'c', 'd'],[1,3]))
// console.log(qpumpkin.last([1,2,3,4]));
// console.log(qpumpkin.join(['a', 'b', 'c'], '~'));
console.log(qpumpkin.indexOf([1, 2, 1, 2], 2, -12))
// console.log(qpumpkin.intersection([2,1],[2,3]))
// console.log(qpumpkin.intersectionBy([{'x':1}], [{'x':2},{'x':1}],'x'));
// console.log(qpumpkin.fromPairs([['a', 1],['b', 2]]))
// console.log(qpumpkin.flattenDepth([1, [2, [3, [4]], 5]],2));
// console.log(qpumpkin.flattenDeep([1, [2, [3, [4]], 5]]))
// console.log(qpumpkin.flatten([1, [2, [3, [4]], 5]]));
// console.log(qpumpkin.isEqual({x:1,y:2,e:3},{x:1,y:2,e:3}))
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred', 'active': false },
  { 'user': 'pebbles', 'active': false }
];
// console.log(qpumpkin.chunk([1,2,3,4,5,6,7,8,],3))
// console.log(qpumpkin.findLastIndex(
//   [{"user":"barney","active":true},{"user":"fred","active":false},{"user":"pebbles","active":false}],
//   function(o) {return  o.user  ==  'pebbles';}));
// console.log(qpumpkin.findIndex(
//   [{"user":"barney","active":false},{"user":"fred","active":false},{"user":"pebbles","active":true}],
//   function(o) { return  o.user  ==  'barney';}));
console.log(qpumpkin.dropRightWhile([{"user":"barney","active":true},{"user":"fred","active":false},{"user":"pebbles","active":false}],"active"));
// console.log(qpumpkin.difference([2,1,3,4,5],[2,3],[2,3,4,5]));
console.log(qpumpkin.differenceBy([1, 2, 3, 4], [1, 3], [4]))
// console.log(qpumpkin.fill([1,2,3], 'a',0,-1));

// console.log(
//   qpumpkin.differenceBy([{'x':2,'y':2},{'x':1,'y':3},{'x':3,"y":3}], [{'x':1,'y':2}], 'x')
// );
console.log(qpumpkin.nth(["a", "b", "c", "d"], 1))