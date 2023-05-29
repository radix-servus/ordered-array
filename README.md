# Ordered List Data Structure

An array that allows adding new elements in an ordered manner. The worst and average case complexity is O(log n), and the best case is O(1).

#### Note:
All elements of the array should be of the same type.
Only unique values can be used.

### Settings:
- `isProd` - production mode (disables some checks for faster performance)
- `rankingRule` - is a function designed to establish its own rules for determining the order of elements. It takes two arguments and should handle three situations: when first arg is greater than second arg, when first arg is less than second arg, and when first arg is equal to second arg, returning 'GT', 'LT', or 'EQ' respectively.

### Methods:
- `create` - creates an ordered array from the argument passed
- `filter` - filters the source array
- `add` - adds an element in the order of sorting
- `modify` - modifies the specified element if it exists using the passed function
- `delete` - deletes the specified element if it exists
- `deletePrevious` - deletes all elements following the element if it exists (if `isIncludingCurrent = true`, the specified element is also deleted)
- `deleteFollowing` - same as `deletePrevious`, but works with preceding elements
- `has` - checks if an element exists
- `getElemIndex` - get the index of an element
- `clear` - clear the array

### Properties:
- `size` - number of elements
- `head` - first element
- `tail` - all elements except the first
- `last` - last element
- `get` - get the array


### Examples of simple usage:
```
const arr = new List();
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

### Example usage of rankingRule:
```
const arr = new List({
  rankingRule: (a, b) => {
    const [aYear, aMonth, aDay] = (a || '').split("::").map(Number);
    const [bYear, bMonth, bDay] = (b || '').split("::").map(Number);
    if (
      aYear > bYear ||
      (aYear === bYear && aMonth > bMonth) ||
      (aYear === bYear && aMonth === bMonth && aDay > bDay)
    ) {
      return "GT";
    }
    if (
      aYear < bYear ||
      (aYear === bYear && aMonth < bMonth) ||
      (aYear === bYear && aMonth === bMonth && aDay < bDay)
    ) {
      return "LT";
    }
    return "EQ";
  },
});
arr.create([
  "2023::2::1",
  "2023::10::1",
  "2023::1::2",
  "2024::1::1",
  "2022::10::2",
]);

arr.add("2023::11::1")
```
In the example, we add a string containing date information. If we add dates without using a special rule, "2023::10::1" and "2023::11::1" will be placed before "2023::2::1" due to the comparison rule of strings, although we obviously need a different result for comparing dates.
