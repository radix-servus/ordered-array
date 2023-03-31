# Ordered Array

ArrayOrdered is an array in which new elements are added in an ordered manner.

The worst and average case time complexity is O(log n), and the best case is O(1).

#### Settings:
* isUnique - only unique values allowed
* isHomogeneous - only data of the same type allowed
* isProd - production mode (disables some checks for faster operation)


#### Examples of use:
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
