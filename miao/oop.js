class MySet {
  constructor (values) {
    this.save = Object.create(null);
    this.Entries = [];
    if (values!=undefined && values!=null) {
      for (let i=0; i<values.length; i++) {
        this.add(values[i]);
      }
      return ;
    } else {
      return ;
    }
  }
  add(value) {
    let save = value;
    if (typeof value=='number' && value==value) {
      save = "n" + cur;
    }
    if (this.has(save)) {
      return this.Entries;
    } else {
      this.save[save] = true;
      this.Entries.push(value);
      return this.Entries;
    }
  }
  delete(value) {
    let save = value;
    if (typeof value=='number' && value==value) {
      save = "n" + value;
    }
    if (save in this.save) {
      delete this.save[save];
      if (value != value) {
        this.Entries = this.Entries.filter(ele => ele === ele);
      } else {
        this.Entries = this.Entries.filter(ele => !(ele === value));
      }
      return true;
    } else {
      return false;
    }
  }
  keys() {
    return this.Entries;
  }
  has(value) {
    let save = value;
    if (typeof value=='number' && value==value) {
      save = "n" + value;
    }
    return save in this.save;
  }
  clear() {
    this.save = Object.create(null);
    this.Entries = [];
  }
  get size() {
    return this.Entries.length;
  }
  forEach(func,thisArg=null) {  
    let keys = this.Entries;
    let end = keys.length;
    for (let i=0; i<end; i++) {
      func.call(thisArg,keys[i]);
    }
  }
}

class MyMap {
  constructor (values) {
    this.save = Object.create(null);
    this.KeysIndex = Object.create(null);
    this.Entries = [];
    if (values!=undefined && values!=null) {
      for (let i=0; i<values.length; i++) {
        this.set(values[i][0],values[i][1]);
      }
    }
  }
  set(key,value) {
    let save = key;
    if (typeof save=='number' && save==save) {
      save = 'n' + save;
    }
    if (save in this.save) {
      this.save[save] = value;
      let index = this.KeysIndex[save];
      this.Entries[index][1] = value;
      return this.save;
    } else {
      this.save[save] = value;
      this.KeysIndex[save] = this.Entries.length;
      this.Entries.push([key,value]);
      return this.save;
    }
  }
  delete(key) {
    let save = key;
    if (typeof save=='number' && save==save) {
      save = 'n' + save;
    }
    if (save in this.save) {
      delete this.save[save];
      let dIndex = this.KeysIndex[save];
      this.Entries = this.Entries.filter( (_,i) => i!=dIndex);
      return true;
    } else {
      return false;
    }
  }
  clear() {
    this.save = Object.create(null);
    this.KeysIndex = Object.create(null);
    this.Entries = [];
  }
  has(key) {
    let save = key;
    if (typeof save=='number' && save==save) {
      save = 'n' + save;
    }
    return save in this.save;
  }
  get(key) {
    let save = key;
    if (typeof save=='number' && save==save) {
      save = 'n' + key;
    }
    if (save in this.save) {
      return this.save[save];
    } else {
      return undefined;
    }
  }
  entries() {
    return this.Entries;
  }
  keys() {
    let result = [];
    this.Entries.forEach(ele => result.push(Object.keys(ele)[0]));
    return result;
  }
  forEach(func,thisArg) {
    let end = this.size;
    let map = this.Entries;
    for(let i=0; i<end; i++) {
      func.call(thisArg,map[i]);
    }
  }
  get size() {
    return this.Entries.length;
  }
}

class MyArray {
  constructor (...values) {
    let length;
    if (values.length == 0) {
      length = 0;
    } else if (values.length == 1) {
      if (typeof values[0] == "number") {
        length = values[0];
      } else {
        this[0] = values[0];
        length = 1;
      }
    } else {
      for (let i = 0; i < values.length; i++) {
        this[i] = values[i];
      }
      length = values.length;
    }

    Object.defineProperty(this,'length',{
      get: function() {
        let len = length;
        for (let index in this) {
          if (index>=len && index==parseInt(index)) {
            len = index;
          }
        }
        if (len >= length) {
          length = len + 1;
          return length;
        } else {
          return length;
        }
      },
      set: function(val) {
        let len = this.length;
        if (val > len) {
          length = val;
        } else {
          for (let i=val; i<len; i++) {
            delete this[i];
          }
          length = val;
        }
      }
    });
  }
  concat(...args) {
    let result = new MyArray();
    for (let index in this) {
      result[index] = this[index];
    }
    result.length = this.length;
    for (let i=0; i<args.length; i++) {
      if (Array.isArray(args[i])) {
        for (let index in args[i]) {
          result[result._length + index] = arg[i][index];
        }
        result.length += args[i].length;
      } else {
        result[result._length] = args[i];
      }
    }
    return result;
  }
  every(test,thisArg=this) {
    if (this == null) {
      throw new TypeError('every called on null or undefined!');
    } else if (typeof test != 'function') {
      throw new TypeError('test is not a function');
    } else {
      let obj = Object(this);
      let end = obj.length;
      for (let i=0; i<end; i++) {
        if (i in obj && !test.call(thisArg,obj[i],i,obj)) {
            return false;
        }
      }
      return true;
    }
  }
  fill(val,start=0,end=this.length) {
    start |= 0;
    end |= 0;
    let length = this.length;
    if (start < 0) {
      start = Math.abs(start)>length ? 0 : length+start;
    }
    if (end < 0) {
      end = length + end;
    } else if (end > length) {
      end = length;
    }
    for (let i=start; i<end; i++) {
      this[i] = val;
    }
    return this;
  }
  filter(test,thisArg=this) {
    if (this == null) {
      throw new TypeError('filter called on null or undefined');
    } else {
      let obj = Object(this);
      let result = new MyArray();
      let end = obj.length;
      for (let i=0; i<end; i++) {
        if (i in obj && test.call(thisArg,obj[i],i,obj)) {
            result.push(obj[i]);
        }
      }
      return result;
    }
  }
  find(test,thisArg=this) {
    if (this == null) {
      throw new TypeError('find called on null or undefined');
    } else {
      let obj = Object(this);
      let end = obj.length;
      for (let i=0; i<end; i++) {
        if (test.call(thisArg,obj[i],i,obj)) {
          return obj[i];
        }
      }
      return undefined;
    }
  }
  findIndex(test,thisArg=this) {
    let end = this.length;
    for (let i=0; i<end; i++) {
      if (test.call(thisArg,this[i],i,this)) {
        return index;
      }
    }
    return -1;
  }
  forEach(action,thisArg=this) {
    if (this == null) {
      throw new TypeError('forEach called on null or undefined');
    } else if (typeof action != 'function') {
      throw new TypeError('action is not a function!');
    } else {
      let obj = Object(this);
      let end = obj.length;
      for (let i=0; i<end; i++) {
        if (i in obj) {
          action.call(thisArg,this[i],i,obj);
        }
      }
    }
  }
  includes(target,from=0) {
    from |= 0;
    let obj = Object(this);
    let end = obj.length;
    if (from < 0) {
      from = Math.abs(from)>end ? 0 : end+from;
    }
    for (let i=from; i<end; i++) {
      if (i in obj && obj[i] === target) {
        return true;
      }
    }
    return false;
  }
  indexOf(target,from=0) {
    from |= 0;
    let obj = Object(this);
    let end = obj.length;
    if (from < 0) {
      from = Math.abs(from)>end ? 0 : end+from; 
    }
    for (let i=from; i<end; i++) {
      if (i in obj && obj[i]===target) {
        return i;
      }
    }
    return -1;
  }
  join(sep=",") {
    let end = this.length;
    if (end == 0) {
      return "";
    } else if (end == 1) {
      if (0 in this) {
        return String(this[0]);
      } else {
        return "";
      }
    } else {
      let result = "";
      for (let i=0; i<end; i++) {
        if (i in this) {
          result += (sep+String(this[i]));
        } else {
          result += sep;
        }
      }
      return result;
    }
  }
  keys() {
    let result = [];
    for (let key in this) {
      result.push(key);
    }
    return result;
  }
  lastIndexOf(target, form = this.length - 1) {
    from |= 0;
    let obj = Object(this);
    let length = obj.length;
    if (from < 0) {
      from += length;
    }
    for (let i = from; i >= 0; i--) {
      if (i in obj && obj[i] === target) {
          return i;
      }
    }
    return -1;
  }
  map(mapper, thisArg=this) {
    let result = new MyArray();
    for (let index in this) {
      result.push(mapper.call(thisArg, this[index], index, this))
    }
    return result;
  }
  pop() {
    let last = this.length - 1;
    let res = this[last];
    this._length -= 1;
    delete this[last];
    return res;
  }
  push(...args) {
    let tail = this.length;
    for (let i=0; i<args.length; i++) {
      this[tail] = args[i];
      this._length += 1;
      tail += 1;
    }
    return tail;
  }
  reduce(reducer) {
    if (this == null) {
      throw new TypeError('reduce called on null or undefined');
    } else if (typeof reducer !== "function") {
      throw new TypeError('reducer is not a function');
    } else {
      let acc;
      let begin = 0;
      let obj = Object(this);
      let end = obj.length;
  
      if (arguments.length >= 2) {
        acc = arguments[1];
      } else {
        while (begin<end && !(begin in obj) ) {
          begin += 1;
        }
        if (begin >= end) {
          throw new TypeError("reduce an empty array with no initial value");
        } else {
          acc = obj[begin];
          begin += 1;
        }
      }
      for (let i=begin; i<end; i++) {
        if (i in obj) {
          acc = reducer.call(obj,acc,obj[i],i,obj)
        }
      }
      return acc;
    }
  }
  reduceRight(reducer) {
    if (this == null) {
      throw new TypeError("reduce called on null or undefined!");
    } else if (typeof reducer != "function") {
      throw new TypeError("reducer is not a function!");
    } else {
      let obj = Object(this);
      let from = obj.length - 1;
      let acc;

      if (arguments.length >= 2) {
        acc = arguments[1];
      } else {
        while (from>=0 && !(from in obj)) {
          from -= 1;
        }
        if (from < 0) {
          throw new TypeError("reducer an empty array without initial value");
        } else {
          acc = obj[from];
          from -= 1;
        }
      }
      for (let i=from; i>=0; i--) {
        if (i in obj) {
          acc = reducer.call(obj,acc,obj[i],i,obj);
        }
      }
      return acc;
    }
  }
  reverse() {
    if (this == null) {
      throw new TypeError("can't reverse null or undefined");
    } else {
      let obj = Object(this);
      let end = this.length;
      if (typeof obj.length != "number") {
        return obj;
      } else {
        let mid = (end-1) >> 1;
        for (let i=0; i<=mid; i++) {
          let target = end - 1 - i;
          if (i in obj && target in obj) {
            let temp = obj[i];
            obj[i] = obj[target];
            obj[target] = temp;
          } else if (i in obj) {
            obj[target] = obj[i];
            delete obj[i];
          } else if (target in obj) {
            obj[i] = obj[target];
            delete obj[target];
          }
        }
        return obj;
      }
    }
  }
  shift() {
    if (typeof this.length != 'number') {
      return ;
    } else {
      let obj = Object(this);
      let result = obj[0];
      delete obj[0];
      for (let i=1; i<obj.length; i++) {
        if (i in obj) {
          obj[i-1] = obj[i];
        } else {
          delete obj[i-1]
        }
      }
      obj.length -= 1;
      return result;
    }
  }
  slice(from=0,end=this.length) {
    if (this == null) {
      throw new TypeError("can't convert undefined or null")
    } else {
      from |= 0;
      end |= 0;
      let obj = Object(this);
      let len = obj.length;
      if (from < 0) {
        from = Math.abs(from)>len ? 0 : len+from;
      }
      if (end < 0) {
        end = Math.abs(end)>len ? 0 : len+end;
      } else if (end > len) {
        end = len;
      }
      let result = new MyArray();
      for (let i=from; i<len; i++) {
        if (i in obj) {
          result[i] = obj[i];
        }
      }
      return result;
    }
  }
  some(test,thisArg) {
    if (this == null) {
      throw new TypeError('some called on null or undefined!');
    } else if (typeof text != 'function') {
      throw new TypeError('test is not a function!');
    } else {
      let obj = Object(this);
      let end = obj.length;
      for (let i=0; i<end; i++) {
        if (i in obj) {
          if (test.call(thisArg,obj[i],i,obj)) {
            return true;
          }
        }
      }
      return false;
    }
  }
  sort(comp) {
    if (comp === undefined) {
      comp = function (a, b) {
        return String(a)[0].charCodeAt() - String(b)[0].charCodeAt();
      }
    } else if (typeof comp != 'function') {
      throw new TypeError('comp is not a function');
    } else {
      let obj = Object(this); 
      return qSort(obj,0,obj.length-1);
  
      function qSort(arr,begin,end) {
        let pivotIndex = Math.floor((end - begin) * Math.random()) + begin;
        let pivot = arr[pivotIndex];
        swap(arr, pivotIndex, end);
        for (let i=begin-1, j=begin; j<=end; j++) {
          if (comp(pivot,arr[i]) < 0) {
            i += 1;
            swap(arr,i,j);
          }
        }
        this.sort(arr,begin,i-1);
        this.sort(arr,i+1,end);
        return arr
  
        function swap(arr,i,j) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
  
      }
    }
  }
  splice(begin=0,deleteCount=this.length-begin,...items) {
    if (this == null) {
      throw new TypeError('splice called on null or undefined');
    } else {
      begin |= 0;
      deleteCount |= 0;
      let obj = Object(this);
      let len = obj.length;
      if (begin > len) {
        begin = len;
      } else if (begin < 0) {
        begin = Math.abs(begin)>len ? 0 : begin+len;
      }
      if (deleteCount > (len-begin)) {
        deleteCount = len - begin - 1;
      }
      let result = new MyArray();
      let end = begin + deleteCount;
      for (let i=begin+1; i<=end; i++) {
        result[result._length] = obj[i];
        result._length += 1;
        delete obj[i];
      }
      let addIndex = begin + 1;
      for (let i=0; i<items.length; i++) {
        obj[addIndex] = items[i];
        addIndex += 1;
      }
      let laterIndex = addIndex + items.length;
      for (i=end; i<len; i++) {
        obj[laterIndex] = obj[i];
        laterIndex += 1;
      }
      obj.length = len - deleteCount + items.length;
      return result;
    }
  }
  toString() {
    if (this instanceof MyArray) {
      return this.join();
    } else {
      return Object.prototype.toString(this);
    }
  }
  unshift(...args) {
    this.splice(0,0,...args);
    return this.length;
  }
}