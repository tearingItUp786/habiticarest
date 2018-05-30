// TODO: WRITE TESTS FOR CONFIG
// just a simple facade set up incase there are changes made to the api that I'm dependent on.
// instead of having to change every api call, I can just use these functions and change the function bodies :)
import Habitica from 'habitica';

const api = new Habitica();

export function formattedErrorMessage(errorName, additionalText = '') {
  let message = '';

  switch (errorName) {
    case 'HabiticaApiNotAuthorizedError':
      message =
        "There was an issue with your auth. If you signed up with facebook or google, you'll have to set up a local login on the habitica website or use your UID and ApiToken!";
      break;

    case 'UnknownConnectionError':
      message = 'There was an unknowned error -- are you connected to the internet?';
      break;

    default:
      message = `${errorName}. There was an unknown error. ${additionalText}`;
      break;
  }

  if (additionalText !== '') {
    message = `${message}. Coming from ${additionalText}`;
  }
  return message;
}

export function setCredientals(username, password) {
  return api.localLogin(username, password);
}

export function setOptions(id, apiToken) {
  return api.setOptions({ id, apiToken });
}

export function isSignedIn() {
  const { id, apiToken } = api.getOptions();
  return Boolean(id) && Boolean(apiToken);
}

export function signOut() {
  return api.setOptions({});
}

export async function getUser() {
  const user = await api.get('/user');
  return user.data;
}

export async function getWorldContent() {
  const content = await api.get('/content');
  return content.data;
}

export async function getAchievements() {
  const { id } = api.getOptions();
  const achievements = await api.get(`/members/${id}/achievements`);
  return achievements.data;
}

export async function getUserTasks() {
  const tasks = await api.get(`/tasks/user`);
  return tasks.data;
}

export async function getSingleUserTask(taskId = '03e736db-f219-4b92-947a-d58e613cddc5') {
  const task = await api.get(`/tasks/${taskId}`);
  return task.data;
}

export function formatTitleFromUserAttribute(att) {
  let retValue = '';
  switch (att) {
    case 'str':
      retValue = 'Strength';
      break;

    case 'per':
      retValue = 'Perception';
      break;

    case 'int':
      retValue = 'Intelligence';
      break;

    case 'con':
      retValue = 'Constitution';
      break;

    default:
      retValue = 'Attribute';
  }

  return retValue;
}

export default api;
