## ArrayOrdered

An array that allows adding new elements in an ordered manner. The worst and average case complexity is O(log n), and the best case is O(1).

### Settings:
- `isUnique` - only unique values
- `isHomogeneous` - only data of the same type
- `isProd` - production mode (disables some checks for faster performance)

### Methods:
- `create` - creates an ordered array from the argument passed
- `add` - adds an element in the order of sorting
- `modify` - modifies the specified element if it exists using the passed function
- `delete` - deletes the specified element if it exists
- `deletePrevious` - deletes all elements following the element if it exists (if `isIncludingCurrent = true`, the specified element is also deleted)
- `deleteFollowing` - same as `deletePrevious`, but works with preceding elements
- `getElemIndex` - get the index of an element

### Properties:
- `size` - number of elements
- `head` - first element
- `tail` - all elements except the first
- `last` - last element
- `get` - get the array


### Examples of use:
```
const arr = new ArrayOrdered();
arr
  .create([1, 4, 5, 5, 3, 2, 6])
  .add(7)
  .add(1)
  .add(1)
  .add(5)
  .add(3)
  .add(6)
  .add(4)
  .modify(6, (val) => val * 108);

arr.size; // 7
arr.get; // [1, 2, 3, 4, 5, 7, 648]
arr.delete(648); // true
arr.delete(108); // false
arr.size; // 6
arr.get; // [1, 2, 3, 4, 5, 7]
```
