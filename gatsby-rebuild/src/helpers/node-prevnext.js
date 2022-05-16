const findNid = node => {
  if (node.nid) {
    return node.nid
  }

  if (node.title) {
    return node.title
  }
console.log(node.nid)
  return null
}