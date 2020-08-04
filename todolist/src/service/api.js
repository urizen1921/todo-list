
import axios from 'axios';

export async function fetchData(url) {

  let response = await axios.get(url);

  if(!response && !response.ok) {
    throw new Error("network failure");
  }


  let data = await response.data;

  console.log(data);

  return data;
}

export function addTask(url, task) {

  axios.post(url, {
    task: task,
    isComplete: false
  });

}

export function deleteTask(url, task) {

  fetch(url, {
    method: 'DELETE',
    headers: [
      ["Content-Type", "application/json"],
      ["Content-Type", "text/plain"]
    ],
    credentials: "include",
    body: JSON.stringify(task)
  })
  .then(res => res.text())
  .then(res => console.log(res));

}