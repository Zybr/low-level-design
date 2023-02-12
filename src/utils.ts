export {
  isNumber,
  areEqualEntities,
  randomInt
}

const isNumber = (val: any): boolean => !Number.isNaN(val);

type Entity = {
  getId(): number
};

const areEqualEntities = (entityA: Entity, entityB: Entity): boolean =>
  entityA.constructor.name === entityB.constructor.name
  && entityA.getId() === entityB.getId();

const randomInt = (max: number, min: number = 0): number => Math.floor(min + Math.random() * (max - min));
