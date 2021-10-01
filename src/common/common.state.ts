import { computed, reactive } from 'vue';
import { IBrickArgs, IRawBrick } from '@dbricks/dbricks-ts';

export type logEntry = {
  content: string,
  color: string,
}

interface IConfiguredBrick extends IRawBrick {
  id: number,
  description: string,
}

const state = reactive({
  configuredBricks: <IConfiguredBrick[]>[],
  statusLog: <logEntry[]>[],
});

// --------------------------------------- bricks

export const configuredBricks = computed(() => state.configuredBricks);

export const getConfiguredBrickById = (brickId: number): IConfiguredBrick => state.configuredBricks.filter((b) => b.id === brickId)[0];

// eslint-disable-next-line consistent-return
export const getArgsByBrickId = (brickId: number): IBrickArgs | undefined => {
  const foundBrick = getConfiguredBrickById(brickId);
  if (foundBrick) {
    return foundBrick.args;
  }
};

export const addOrModifyConfiguredBrick = (newOrUpdatedBrick: IConfiguredBrick): void => {
  const i = state.configuredBricks.map((b) => b.id)
    .indexOf(newOrUpdatedBrick.id);
  if (i === -1) {
    state.configuredBricks.push(newOrUpdatedBrick);
  } else {
    state.configuredBricks[i] = newOrUpdatedBrick;
  }
  console.log('State updated', state.configuredBricks);
};

export const removeConfiguredBrick = (brickId: number): void => {
  const i = state.configuredBricks.map((b) => b.id)
    .indexOf(brickId);
  if (i >= 0) {
    state.configuredBricks.splice(i, 1);
  }
  console.log('State updated', state.configuredBricks);
};

// --------------------------------------- status log

export const statusLog = computed(() => state.statusLog);

export const pushToStatusLog = (newStatus: logEntry): void => {
  state.statusLog.push(newStatus);
};

export const resetStatusLog = (): void => {
  state.statusLog = [];
};
