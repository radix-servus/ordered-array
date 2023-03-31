class ArrayOrdered {
  constructor(settings) {
    const {
      isUnique = true,
      isHomogeneous = true,
      isProd = false,
    } = settings || {};
    this._data = [];
    this._isUnique = isUnique;
    this._isHomogeneous = isHomogeneous;
    this._isProd = isProd;
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

  create(array, ruleCallback) {
    if (!this._isProd) {
      if (!Array.isArray(array)) {
        throw new TypeError(
          `[ArrayOrdered] Expected an array, got an ${typeof array}.`
        );
      }
      if (
        this._isHomogeneous &&
        !array.every((elem) => typeof array[0] === typeof elem)
      ) {
        throw new TypeError(
          "[ArrayOrdered] Type mismatch: use the same type for the entire array or set the isHomogeneous flag to false."
        );
      }
    }

    let result = array;
    if (this._isUnique) {
      result = [...new Set(result)];
    }
    if (ruleCallback) {
      result = result.sort((a, b) => ruleCallback(a, b));
    } else {
      result = result.sort();
    }
    this._data = result;
    return this;
  }

  add(element) {
    if (!this._isProd) {
      if (
        this.size &&
        this._isHomogeneous &&
        typeof this.head !== typeof element
      ) {
        throw new TypeError(
          "[ArrayOrdered] Type mismatch: use the same type for the entire array or set the isHomogeneous flag to false."
        );
      }
    }
    if (!this.size || this.last < element) {
      this._data.push(element);
      return this;
    } else if (this.head > element) {
      this._data = [element, ...this._data];
      return this;
    } else {
      let isLoop = true;
      let left = 0;
      let right = this.size - 1;
      let middle = null;

      while (isLoop) {
        middle = Math.round((right - left) / 2) + left;

        if (element < this._data[middle + 1] && element >= this._data[middle]) {
          if (this._isUnique && element === this._data[middle]) {
            isLoop = false;
            break;
          }
          this._data = [
            ...this._data.slice(0, middle + 1),
            element,
            ...this._data.slice(middle + 1),
          ];
          isLoop = false;
        } else if (element < this._data[middle]) {
          right = middle - 1;
        } else if (element > this._data[middle]) {
          left = middle + 1;
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

  getElemIndex(element) {
    let left = 0;
    let right = this.size - 1;
    let middle = null;

    while (left <= right) {
      middle = Math.round((right - left) / 2) + left;

      if (element === this._data[middle]) {
        return middle;
      } else if (element < this._data[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return -1;
  }
}
