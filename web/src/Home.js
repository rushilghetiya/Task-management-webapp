import React, { useState, useEffect } from "react";
import Task from "./components/taskCard/Task";
import "./Home.css";
// import { IoMdAdd } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { addtask, getTask, deleteTask, updateTask, getAllTasks } from "./API";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { auth, provider } from "./firebase";
// import 'firebase/compat/auth';
import { signInWithPopup } from "firebase/auth";
// import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";

function Home() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [tagsList, setTags] = useState("");
  // const [tagsList, setTagsList] = useState([]);
  const [linksList, setLinks] = useState("");
  const [assignedToList, setAssignedTo] = useState("");
  const [taskId, setTaskId] = useState("");
  // const [group, setGroup] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [extraList, setExtraList] = useState([]);
  const clcName = Cookies.get("uId");
  // const ids = useParams();
  // const auths = Cookies.get("isAuth");
  // const [currentUser, setCurrentUser] = useState('');

  const cancelHandler = async () => {
    setTask("");
    setDesc("")
    setTags("")
    setLinks("")
    setAssignedTo("")
    setTaskId("")
    setIsPublic(false)
  };
  // console.log("id",ids);

  const signInWithGoogle = async () => {
    // console.log("inside")

    const result = await signInWithPopup(auth, provider);
    const id = auth.currentUser.uid;
    // console.log(result);
    if (result) {
      // setIsAuth(true);
      Cookies.set("uId", auth.currentUser.uid);
      Cookies.set("email", auth.currentUser.email);
      Cookies.set("isAuth", true);
      // setCurrentUser(auth.currentUser.email);
      window.location.pathname = `/getTask/${id}`;

      // navigate(`/getTask/${auth.currentUser.uId}`);
      // localStorage.setItem("isAuth",true);
    }

    // console.log("h",auth.currentUser);

    // signInWithPopup(auth,provider).then((res)=>{
    //   console.log(res);
    // Cookies.set("uId", auth.currentUser.uid);
    // Cookies.set("isAuth", true);

    // setInterval(() => {

    //   getTaskHandler();
    // }, 1000);

    // })
  };

  const handleChange = (val) => {
    setIsPublic(val);
  };


  const editTaskHandler=(elem)=>{
  if(elem.owner.toLowerCase()===clcName.toLowerCase()){
    setTask(elem.task);
    setDesc(elem.desc)
    setTags(elem.tags.join(","))
    setLinks(elem.links.join(","))
    setAssignedTo(elem.assignedTo.join(","))
    setTaskId(elem._id)
    setIsPublic(elem.isPublic)
    toast.info('Scroll up to edit')
  }else{
    window.location.pathname = `/share/${elem.owner}`;
    // toast.error("You can't edit this task as this is assigned by someone else");
  }
  };


  const submitTaskHandler = async () => {
    // const clcName = Cookies.get("uId");
    //  console.log(auths);
    const owner=clcName.toLowerCase();
    if (auth.currentUser) {

      if(taskId){
        console.log(tagsList,linksList)
        const tags=tagsList?.split(',')
      const links=linksList.split(',')
      const assignedTo=assignedToList.split(',')
        axios
        .post(`${updateTask}/${taskId}`, {
           task,
            desc,
            tags,
            links,
            assignedTo,
            clcName,
            isPublic,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Yayy! Task Edited.");
            setTaskId("")
            cancelHandler();
          }
          getTaskHandler();
        });
      }
      else if (task) {
        const tags=tagsList?.split(',')
      const links=linksList.split(',')
      const assignedTo=assignedToList.split(',')
        // console.log("hi");
        const date = new Date();
        axios
          .post(addtask, {
            date,
            task,
            desc,
            tags,
            links,
            assignedTo,
            owner,
            clcName,
            isDone,
            isPublic,

          })
          .then((response) => {
            // console.log(response);
            if (response.data.message === "Added successfully") {
              toast.success("Task Added Successfully!");
              getTaskHandler();
            }
          })
          .catch((error) => {
            console.log(error);
          });
       cancelHandler()
      } else {
        toast.info("Enter Task!!!");
      }
    } else {
      toast.error("Please Login To Add Task!");
    }
  };

  const deleteTaskHandler = async (taskId,elem) => {
    // console.log("inside");
    // eslint-disable-next-line no-undef
    if (auth.currentUser) {
      const owner=elem.owner
     if(owner.toLowerCase()===clcName.toLowerCase()){
      axios.post(`${deleteTask}`, { clcName, taskId }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success("Task Deleted Successfully!");
        }
        getTaskHandler();
        // console.log(res.data);
      });
     }else {
      toast.error("You can't delete this task as this is assigned by someone else")
     }
    } else {
      toast.error("Please Login To delete Task!");
    }
  };

  const doneTaskHandler = async (taskId,elem) => {
    if (auth.currentUser) {
      const owner=elem.owner
      setIsDone(true);

      axios
        .post(`${updateTask}/${taskId}`, {
          clcName:owner,
          isDone:true
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Yayy! You have Completed a Task.");
          }
          getTaskHandler();
        });
    } else {
      toast.error("Please Login To Mark Task!");
    }
  };

  

  const getTaskHandler = async () => {
    // axios.post(`${getTask}/${ids.uId}`).then((response) => {
    //   console.log(response);
    // });
  await  axios
      .get(`${getTask}/${Cookies.get("uId")}`)
      .then((response) => {
        console.log(response);
        setTaskList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  await  axios
      .get(`${getAllTasks}/${Cookies.get("email")}`)
      .then((response) => {
        console.log(response);
        console.log("EXTRA",response.data);
       if(response.data!=='Not found'){
        setExtraList(response.data);
       }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //  console.log(taskList);
  useEffect(() => {
    if (!Cookies.get("isAuth")) {
      navigate("/");
    }
if(Cookies.get("uId"))
    getTaskHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(taskList);

  return (
    <>
      <div className="homeMain">
        <Navbar signInWithGoogle={signInWithGoogle} />
        <div className="">
          {Cookies.get("uId") ? (
            <h3 className="taskHead">ADD TASK</h3>
          ) : (
            <h3 className="taskHead">LOGIN TO CONTINUE</h3>
          )}
          {Cookies.get("uId") && (
            <div className="addTaskContainer">
              {/* <div className="addtask">
            <button className="addTaskButton">
              <IoMdAdd />
            </button>
          </div> */}
              <div className="inputDiv">
              
                <textarea
                  onChange={(e) => setTask(e.target.value)}
                  className="taskInput text-decoration-none"
                  id="taskInput"
                  type="text"
                  value={task}
                  placeholder="What Plans ?"
                />
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="taskInput text-decoration-none"
                  id="taskInput"
                  type="text"
                  value={desc}
                  placeholder="Description ?"
                />
                <input
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                  className="taskInput text-decoration-none"
                  id="taskInput"
                  type="text"
                  value={tagsList}
                  placeholder="tags? (Seperate by comma)"
                />
                <textarea
                  onChange={(e) => {
                    setLinks(e.target.value);
                  }}
                  className="taskInput text-decoration-none"
                  id="taskInput"
                  type="text"
                  value={linksList}
                  placeholder="Links? (Seperate by comma)"
                />
                <textarea
                  onChange={(e) => {
                    setAssignedTo(e.target.value);
                  }}
                  className="taskInput text-decoration-none"
                  id="taskInput"
                  type="text"
                  value={assignedToList}
                  placeholder="Assign to (Seperate by comma)"
                />
                <div className="row ms-2">
                  <div className="col">
                    
                    <p className="text-white">Private</p>
                  </div>
                  <div className="col">
                  
                    <ReactSwitch checked={isPublic} onChange={handleChange} />
                  </div>
                  <div className="col me-2">
                 
                    <p className="text-white">Public</p>
                  </div>
                </div>
                <div className="modifyButton">
                  <button onClick={cancelHandler}>
                    <RxCross2 />
                  </button>
                  <button onClick={submitTaskHandler}>
                    {" "}
                    <MdOutlineDone />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="conatinerWrap">
          <div className="pending">
            {Cookies.get("uId") && <h3 className="taskHead"> PENDING TASKS</h3>}

            <div className="taskCardContainer">
              {taskList?.map((elem, index) => {
                // elem.isDone&&(

                return (
                  !elem.isDone && (
                    <Task
                    elem={elem}
                      key={index}
                      taskId={elem._id}
                      taskDate={elem.date}
                      task={elem.task}
                      desc={elem.desc}
                      tags={elem.tags}
                      links={elem.links}
                      assignedTo={elem.assignedTo}
                      isPublic={elem.isPublic}
                      editTaskHandler={editTaskHandler}
                      isDone={elem.isDone}
                      deleteTaskHandler={deleteTaskHandler}
                      doneTaskHandler={doneTaskHandler}
                    />
                  )
                );
              })}
              {extraList?.map((elem, index) => {
                // elem.isDone&&(

                return (
                  !elem.isDone && (
                    <Task
                    elem={elem}
                      key={index}
                      taskId={elem._id}
                      taskDate={elem.date}
                      task={elem.task}
                      desc={elem.desc}
                      tags={elem.tags}
                      links={elem.links}
                      assignedTo={elem.assignedTo}
                      isPublic={elem.isPublic}
                      showGroup={true}
                      group={elem.group}
                      editTaskHandler={editTaskHandler}
                      isDone={elem.isDone}
                      deleteTaskHandler={deleteTaskHandler}
                      doneTaskHandler={doneTaskHandler}
                    />
                  )
                );
              })}
            </div>
          </div>
          <div className="completed">
            {/* <h3 className="taskHead">COMPLETED</h3> */}
            {Cookies.get("uId") && <h3 className="taskHead"> COMPLETED</h3>}
            <div className="taskCardContainer">
              {taskList?.map((elem, index) => {
                // elem.isDone&&(

                return (
                  elem.isDone && (
                    <Task
                      key={index}
                      elem={elem}
                      taskId={elem._id}
                      taskDate={elem.date}
                      task={elem.task}
                      desc={elem.desc}
                      isPublic={elem.isPublic}
                      isDone={elem.isDone}
                      deleteTaskHandler={deleteTaskHandler}
                    />
                  )
                );
              })}
              {extraList?.map((elem, index) => {
                // elem.isDone&&(

                return (
                  elem.isDone && (
                    <Task
                      key={index}
                      elem={elem}
                      taskId={elem._id}
                      taskDate={elem.date}
                      task={elem.task}
                      desc={elem.desc}
                      isPublic={elem.isPublic}
                      isDone={elem.isDone}
                      deleteTaskHandler={deleteTaskHandler}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line no-undef
// export default Home;
export default Home;
// export getTaskHandler;
