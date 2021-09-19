import { computed, reactive } from 'vue';
import { IConfiguredBrick } from '@/common/interfaces/common.interfaces';

const state = reactive({
  configuredBricks: <IConfiguredBrick[]>[],
  statusLog: <string[]>[],
});

export const getConfiguredBricks = computed(() => state.configuredBricks);

export const addOrModifyConfiguredBrick = (newOrUpdatedBrick: IConfiguredBrick):void => {
  const i = state.configuredBricks.map((b) => b.id).indexOf(newOrUpdatedBrick.id);
  if (i === -1) {
    state.configuredBricks.push(newOrUpdatedBrick);
  } else {
    state.configuredBricks[i] = newOrUpdatedBrick;
  }
  console.log('State updated', state.configuredBricks);
};

export const removeConfiguredBrick = (brickId: number):void => {
  const i = state.configuredBricks.map((b) => b.id).indexOf(brickId);
  if (i >= 0) {
    state.configuredBricks.splice(i, 1);
  }
  console.log('State updated', state.configuredBricks);
};

export const getStatusLog = computed(() => state.statusLog);

export const pushToStatusLog = (newStatus:string):void => {
  state.statusLog.push(newStatus);
};

export const resetStatusLog = ():void => {
  state.statusLog = [];
};
