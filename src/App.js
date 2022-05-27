import React from "react";
import "./App.css";
import { Todo } from "./components/Todo";
import { Todolist } from "./components/Todolist";
import axios from "axios"
import Pagi from "./components/Pagi";

function App() {
  const [todo, settodo] = React.useState([]);
  const [page, setpage] = React.useState(1)
  const [limit, setlimit] = React.useState(0);

 

  const getdata=()=>{
    // fetch("http://localhost:3004/todos")
    // .then((e) => e.json())
    axios.get(`http://localhost:3004/todos?_page=${page}&_limit=4`)
      .then((data) => {
        settodo(data.data);
        setlimit(data.headers['x-total-count'])
        // console.log(data.data);
      });
  }

  React.useEffect(() => {
    getdata()
  }, [page]);

  const todoinput = (str) => {
    // settodo([
    //   ...todo,
    //   { id: Date.now(), iscomplate: false, fevrate: false, value: str },
    // ]);

    fetch("http://localhost:3004/todos",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         iscomplate: false, fevrate: false, value: str
      })
    })
    getdata()
  };

  const markascomplate = (id, statas) => {
    // todo.map((element) => {
    //   if (element.id === id) {
    //     element.iscomplate = statas;
    //   }
    //   return 0;
    // });
    // // console.log(todo);
    // settodo(todo);

    fetch(`http://localhost:3004/todos/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        iscomplate: statas
      })
    })
    getdata()



  };

  const markasfev = (id,statas) => {
    // console.log("markascomplate" ,id);
    // todo.map((element) => {
    //   if (element.id === id) {
    //     if (element.fevrate === true) {
    //       element.fevrate = false;
    //     } else {
    //       element.fevrate = true;
    //     }
    //   }
    //   return 0;
    // });
    // settodo(todo);

    fetch(`http://localhost:3004/todos/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fevrate: (!statas)
      })
    })
    getdata()
  };


  const delatetodo=(id)=>{
    fetch(`http://localhost:3004/todos/${id}`,{ method:'DELETE' })
    getdata()

  }

  return (
    <div className="App">
      <Todo todoin={todoinput} />
      <Todolist
        todos={todo}
        markascomplate={markascomplate}
        markasfev={markasfev}
        delatetodo={delatetodo}
      />
    <Pagi limits={limit} page={page} setpage={setpage}/>
    </div>
  );
}

export default App;
