interface Item {
  dataRole: string;
  data: any[];
  position: number;
  parentPosition: number;
}

export function mapToParent(list: Item[], item: Item): void {
  let bool = false;

  if (item.parentPosition === null) {
    bool = true;
    list.push({ ...item });
    return;
  }

  list.find((i) => {
    if (i.position === item.parentPosition) {
      bool = false;
      i.data.push({ ...item });
      return;
    }

    if (i.dataRole === 'block') {
      bool = true;
      mapToParent(i.data, item);
    }
  });

  if (bool) {
    // console.warn(`Fail mapToParent: ${block.mapToParent}`, block);
  }
}
