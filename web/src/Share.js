import React, { useState, useEffect } from "react";
import Task from "./components/taskCard/Task";
import "./Share.css";
// import { IoMdAdd } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { updateTask,  getSharedTask } from "./API";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
// import { SpinnerDiamond } from 'spinners-react';
import { BiArrowBack } from "react-icons/bi";

export default function Share() {
  const navigate = useNavigate();
  const [groupList, setGroups] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEmailValid,setIsEmailValid]=useState(false);
  const [isPublic,setIsPublic]=useState(false);
  const ids = useParams();
  const clcName =ids.uId;
  // const [currentUser, setCurrentUser] = useState('');



  const cancelHandler = async () => {
    setGroups("")
    setTaskId("")
    setIsPublic(false);
    toast.info('Scroll up to edit')
  };
  // console.log("id",ids);




 

  const submitTaskHandler = async () => {
    // const clcName = Cookies.get("uId");
    //  console.log(auths);
    if (auth.currentUser) {
      if (taskId) {
      if(!isPublic){
        const group=groupList.split(',')

        // console.log("hi");
        axios
        .post(`${updateTask}/${taskId}`, {
            clcName,
            group,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Yayy! Group Edited.");
            setTaskId("")
            cancelHandler();
          }
          getTaskHandler();
        });
      }else {
        cancelHandler()
        toast.info("You cannot create groups for public tasks")
      }
      } else {
        cancelHandler()
        toast.info("Please select a task to edit!");
      }
    } else {
      toast.error("Please Login To Add Task!");
    }
  };

  // const deleteTaskHandler = async (taskId) => {
  //   // console.log("inside");
  //   // eslint-disable-next-line no-undef
  //   if (auth.currentUser) {
  //     axios.post(`${deleteTask}`, { clcName, taskId }).then((res) => {
  //       // console.log(res);
  //       if (res.status === 200) {
  //         toast.success("Task Deleted Successfully!");
  //       }
  //       getTaskHandler();
  //       // console.log(res.data);
  //     });
  //   } else {
  //     toast.error("Please Login To delete Task!");
  //   }
  // };

  const doneTaskHandler = async (taskId) => {
    if (auth.currentUser) {
      axios
        .post(`${updateTask}/${taskId}`, {
          clcName,
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

  const editTaskHandler=(elem)=>{
    setTaskId(elem._id)
    setGroups(elem.group)
    setIsPublic(elem.isPublic)
    toast.info("Scroll up to edit groups")
  }


  const getTaskHandler = async () => {
    // axios.post(`${getTask}/${ids.uId}`).then((response) => {
    //   console.log(response);
    // });

    axios
      .get(`${getSharedTask}/${ids.uId}/${Cookies.get("email")}`)
      .then((response) => {
        console.log(response);
        if(response.data!=='Not found'){
          setTaskList(response.data);
          setIsEmailValid(true);
        }else{
          setIsEmailValid(false);
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

  

    // const getMailHandler=async()=>{
    //   const email = Cookies.get("email");

    //   axios.get(`${getSetting}/${clcName}`).then((res)=>{
    //     console.log(res.data);
    //     setMailList(res.data);
    //     res.data?.map((mail)=>{
    //       if(mail.mail===email){
    //         // console.log("inside mail")
    //         setIsEmailValid(true);
    //       }
    //     }
    //     )
       
    //   }).catch((err)=>{
    //     console.log(err); 
    //     if(err){
  
    //       toast.warn("Error fetching Email!!")
    //     }
      
    //   })
  
  
    // }
    // console.log("is",mailList);

    // if(mailList?.length!==0){
    //   console.log('updating public var');
    //   console.log(mailList[0].isPublic)
    //   setIsPublic(mailList[0].isPublic);
    //   mailList.map((mail,index)=>{
    //     if(mail.email===email){
    //       setIsEmailValid(true);
    //     }
    //   }
    //   )
    // }
    // getMailHandler();
    getTaskHandler();
    // console.log("load",islo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(taskList);
  const goBackHandler=async()=>{
    const id= Cookies.get("uId");
    window.location.pathname = `/getTask/${id}`;

   }  

    return (
      <>
      <div className="backBtn text-center" onClick={goBackHandler}>
<BiArrowBack className="mb-5"/>
</div>
      {
        isEmailValid?(<div className="homeMain">
         
  
        <h3 className="taskHead">CREATE YOUR GROUP</h3>
        <div className="addTaskContainer">
        
          <div className="inputDiv">
            <textarea
              onChange={(e) => setGroups(e.target.value)}
              className="taskInput"
              id="taskInput"
              type="text"
              value={groupList}
              placeholder="Add emails (seperate by comma)"
            />
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
  
        <div className="conatinerWrap">
          <div className="pending">
            {
              (Cookies.get("uId"))&&(
                <h3 className="taskHead"> PENDING TASKS</h3>
  
              )
            }
  
            <div className="taskCardContainer">
              {taskList?.map((elem, index) => {
                // elem.isDone&&(
  
                return (
                  !elem.isDone && (
                //   !elem.isDone && isPrivate && (
                    <Task
                    elem={elem}
                    key={index}
                    taskId={elem._id}
                    taskDate={elem.date}
                    task={elem.task}
                    desc={elem.desc}
                    tags={elem.tags}
                    links={elem.links}
                    showGroup={true}
                    group={elem.group}
                    isDone={elem.isDone}
                    editTaskHandler={editTaskHandler}
                    doneTaskHandler={doneTaskHandler}
                    />
                  )
                );
              })}
            </div>
          </div>
          <div className="completed">
            {/* <h3 className="taskHead">COMPLETED</h3> */}
            {
               (Cookies.get("uId"))&&(
                <h3 className="taskHead"> COMPLETED</h3>
  
              )
            }
            <div className="taskCardContainer">
              {taskList?.map((elem, index) => {
                // elem.isDone&&(
  
                return (
                  elem.isDone && (
                //   elem.isDone&& isPrivate && (
                  <Task
                  key={index}
                  taskId={elem._id}
                  taskDate={elem.date}
                  task={elem.task}
                  desc={elem.desc}
                  showGroup={true}
                  isPublic={elem.isPublic}
                  isDone={elem.isDone}
                />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
          
       ):(
        <div className="homeMain">
          <h3 className="taskHead">UNAUTHORIZED ACCESS</h3>
        </div>
       )
      }
       </>
    );


















}

// eslint-disable-next-line no-undef
// export default Home;
// export getTaskHandler;

