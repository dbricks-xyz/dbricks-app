import { computed, reactive } from 'vue';
import { configuredBrick, configuredRequest } from 'dbricks-lib';

export type logEntry = {
  content: string,
  color: string,
}

const state = reactive({
  configuredBricks: <configuredBrick[]>[],
  statusLog: <logEntry[]>[],
});

// --------------------------------------- bricks

export const configuredBricks = computed(() => state.configuredBricks);

export const getConfiguredBrickById = (brickId: number): configuredBrick => state.configuredBricks.filter((b) => b.id === brickId)[0];

export const getPayloadsByBrickId = (brickId: number): configuredRequest[] => {
  const foundBrick = getConfiguredBrickById(brickId);
  if (foundBrick) {
    return foundBrick.request;
  }
  return [];
};

export const addOrModifyConfiguredBrick = (newOrUpdatedBrick: configuredBrick): void => {
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
