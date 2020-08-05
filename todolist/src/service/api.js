
import axios from 'axios';

export async function fetchData(url) {

  let response = await axios.get(url);

  if(!response && !response.ok) {
    throw new Error("network failure");
  }


  let data = await response.data;

  return data;
}

export function addTask(url, task) {

  axios.post(url, {
    task: task,
    complete: false
  });

}

export function deleteTask(url, task) {

  
  axios.delete(url);

}

export function updateTask(url, task) {
  axios.put(url, task);
}