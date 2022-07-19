import { HttpResponse } from "src/entities/http-response.entity";

export class SkillGroupResponse implements HttpResponse {
  statusCode: number;
  message: string;
  error?: string;
  data?: SkillGroupEntity;
}

export class SkillGroupEntity {
  nodes: [];
  edges: [];

  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

export class SkillNode {
  public skillConnections: SkillConnection[];

  constructor(public skillId: string) {
    this.skillConnections = [];
  }
}

export class SkillConnection {
  constructor(public skillId1: SkillNode, public skillId2: SkillNode, public percentage: number) {}
}
