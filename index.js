class List {
  constructor(settings) {
    const { rankingRule, isProd = false } = settings || {};
    this._data = [];
    this._isProd = isProd;
    this._rankingRule = rankingRule || null;
  }

  get size() {
    return this._data.length;
  }

  get last() {
    return this._data.at(-1);
  }

  get head() {
    return this._data.at(0);
  }

  get tail() {
    return this._data.slice(1);
  }

  get get() {
    return this._data;
  }

  _compare(a, b) {
    if (this._rankingRule) {
      return this._rankingRule(a, b);
    }
    if (a > b) {
      return "GT";
    }
    if (a < b) {
      return "LT";
    }
    return "EQ";
  }

  filter(callback) {
    this._data = this._data.filter(callback);
    return this;
  }

  create(array) {
    if (!this._isProd) {
      if (!Array.isArray(array)) {
        throw new TypeError(
          `[ArrayOrdered] Expected an array, got an ${typeof array}.`
        );
      }
      if (!array.every((elem) => typeof array[0] === typeof elem)) {
        throw new TypeError(
          "[ArrayOrdered] Type mismatch: use the same type for the entire array."
        );
      }
    }

    let result = array;
    result = [...new Set(result)];
    if (this._rankingRule) {
      const POINTS = {
        GT: 1,
        LT: -1,
        EQ: 0,
      };
      result = result.sort((a, b) => POINTS[this._rankingRule(a, b)]);
    } else {
      result = result.sort();
    }
    this._data = result;
    return this;
  }

  add(element) {
    if (!this._isProd) {
      if (this.size && typeof this.head !== typeof element) {
        throw new TypeError(
          "[ArrayOrdered] Type mismatch: use the same type for the entire array."
        );
      }
    }
    if (!this.size || this._compare(this.last, element) === "LT") {
      this._data.push(element);
      return this;
    } else if (this._compare(this.head, element) === "GT") {
      this._data = [element, ...this._data];
      return this;
    } else {
      let isLoop = true;
      let left = 0;
      let right = this.size - 1;
      let middle = null;

      while (isLoop) {
        middle = Math.round((right - left) / 2) + left;

        if (this._compare(element, this._data[middle]) === "EQ") {
          isLoop = false;
          break;
        } else if (
          this._compare(element, this._data[middle + 1]) === "LT" &&
          this._compare(element, this._data[middle]) === "GT"
        ) {
          this._data.splice(middle + 1, 0, element);
          isLoop = false;
        } else if (this._compare(element, this._data[middle]) === "LT") {
          right = middle - 1;
        } else if (this._compare(element, this._data[middle]) === "GT") {
          left = middle + 1;
        } else {
          throw new Error(
            "[ArrayOrdered] Check that your rankingRule function is correctly comparing the existing values. Perhaps you incorrectly destructured the object?"
          );
        }
      }
      return this;
    }
  }

  modify(element, callback) {
    const index = this.getElemIndex(element);
    if (index >= 0 && callback) {
      this.delete(element);
      this.add(callback(element, this._data));
      return true;
    }
    return false;
  }

  delete(element) {
    const index = this.getElemIndex(element);
    if (index < 0) {
      return false;
    }
    this._data.splice(index, 1);
    return true;
  }

  deletePrevious(element, isIncludingCurrent = false) {
    let index = this.getElemIndex(element);
    if (index < 0) {
      return false;
    }
    if (isIncludingCurrent) {
      index += 1;
    }
    this._data = this._data.slice(index);
    return true;
  }

  deleteFollowing(element, isIncludingCurrent = false) {
    let index = this.getElemIndex(element);
    if (index < 0) {
      return false;
    }
    if (!isIncludingCurrent) {
      index += 1;
    }
    this._data = this._data.slice(0, index);
    return true;
  }

  has(element) {
    return this.getElemIndex(element) !== -1;
  }

  getElemIndex(element) {
    let left = 0;
    let right = this.size - 1;
    let middle = null;

    while (left <= right) {
      middle = Math.round((right - left) / 2) + left;

      if (this._compare(element, this._data[middle]) === "EQ") {
        return middle;
      } else if (this._compare(element, this._data[middle]) === "LT") {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return -1;
  }

  clear() {
    this._data = [];
  }
}
