
import axios from 'axios';

export async function fetchData(url) {

  let response = await axios.get(url);

  if(!response && !response.ok) {
    throw new Error("network failure");
  }


  let data = await response.data;

  return data;
}

export async function addTask(url, task) {

  let response = await axios.post(url, {
                          task: task,
                          complete: false
                        });

  return response;

}

export async function deleteTask(url, task) {

  
  let response = await axios.delete(url);

  return response;

}

export async function updateTask(url, task) {

  let response = await axios.put(url, task);

  return response;

}