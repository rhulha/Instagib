part of bspparser;

class BSPNode {
  int planeNum;
  List<int> children;
  List<int> mins;
  List<int> maxs;
  BSPNode.init( this.planeNum, this.children, this.mins, this.maxs);
  BSPNode( BinaryReader br) {
    planeNum = br.readOneSignedInt();
    children = br.readSignedInt(2);
    mins = br.readSignedInt(3);
    maxs = br.readSignedInt(3);
  }
  static List<BSPNode> parse(BinaryReader br) {
    int count = br.length~/(9*4); // 9 * int32
    List<BSPNode> nodes = new List<BSPNode>(count);
    for( int i=0;i<count;i++) {
      nodes[i] = new BSPNode(br);
    }
    return nodes;
  }
}
