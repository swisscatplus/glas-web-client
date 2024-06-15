export const BASE_PORT = 3000;
export const BASE_URL = `http://127.0.0.1:${BASE_PORT}`;

export const ADMIN_GROUP = `${BASE_URL}/admin`;

export const STOP_ENDPOINT = `${ADMIN_GROUP}/orchestrator/stop`;
export const START_ENDPOINT = `${ADMIN_GROUP}/orchestrator/start`;
export const ORCHESTRATOR_STATUS_ENDPOINT = `${ADMIN_GROUP}/orchestrator/status`;
export const TASK_ENDPOINT = `${ADMIN_GROUP}/task`;

export const NODES_STATUS_ENDPOINT = `${ADMIN_GROUP}/nodes-status`