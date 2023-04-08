export {
  isNumber,
  areEqualEntities,
}

const isNumber = (val: any): boolean => !Number.isNaN(val);

type Entity = {
  getId(): number
};

const areEqualEntities = (entityA: Entity, entityB: Entity): boolean =>
  entityA.constructor.name === entityB.constructor.name
  && entityA.getId() === entityB.getId();
