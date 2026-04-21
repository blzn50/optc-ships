type CompareObject = {
  label: string;
};
/**
 * Compare the label of two objects and sort in ascending order.
 * For now this is used to compare the filter label.
 */
export function compareLabel(a: CompareObject, b: CompareObject) {
  if (a.label < b.label) {
    return -1;
  } else if (a.label > b.label) {
    return 1;
  }
  return 0;
}
