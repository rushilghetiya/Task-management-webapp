/* eslint-disable no-undef */
import React from "react";
import "./Task.css";
import { MdDelete, MdModeEdit, MdOutlineDoneAll } from "react-icons/md";
import ReactSwitch from "react-switch";
function Task({
  elem,
  taskId,
  date,
  task,
  desc,
  tags,
  links,
  isDone,
  showGroup,
  group,
  assignedTo,
  isPublic,
  deleteTaskHandler,
  doneTaskHandler,
  editTaskHandler
}) {
//   const [isPublic,setIsPublic]=useState(publicMode);
//   const handleChange=(val)=>{
// setIsPublic(val)
//   }
  return (
    <div className="cardMain">
      <h4 className="cardDate">{date}</h4>
      <p className="cardText"> {task}</p>
      <p className="cardText">Description: {desc}</p>
      <p className="cardText">{
        tags?.map((elem, index)=>{
          return (
            <span class="badge text-bg-primary mx-1 my-1">{elem}</span>
          )
        })
      }</p>
      <p className="cardText">{
        links?.map((elem, index)=>{
          return (
            <span class="badge text-bg-light mx-1 my-1"><a href={elem} target="_blank">{elem}</a></span>
          )
        })
      }</p>
      <p className="cardText ms-1">{
        assignedTo?(<span>Access to:</span>):(<></>)
      }</p>
       <p className="cardText">{
        assignedTo?.map((elem, index)=>{
          return (
            <span class="badge text-bg-success mx-1 my-1">{elem}</span>
          )
        })
      }</p>
      <p className="cardText">{
        showGroup?(!isDone?(<span>Your team</span>):(<></>)):(<></>)
      }</p>
       <p className="cardText">{
      showGroup?  (group?.map((elem, index)=>{
        return (
          <span class="badge text-bg-success mx-1 my-1">{elem}</span>
        )
      })):(<></>)
      }</p>
     {
      !isDone?(
        !showGroup?(
          <div className="row ms-2">
          <div className="col">
            
            <p className="text-white">Private</p>
          </div>
          <div className="col">
          
            <ReactSwitch checked={isPublic} onChange={(v)=>{}} />
          </div>
          <div className="col me-2">
         
            <p className="text-white">Public</p>
          </div>
        </div>
        ):(<></>)
      ):(<></>)
     }
      <div className="cardButton">
       {
        !isDone?( <button
          className="cardEdit"
          onClick={() => {
            editTaskHandler(elem);
          }}
        >
          <MdModeEdit />
        </button>):(<></>)
       }
        {
          !showGroup?(<button
            className="cardDelete"
            onClick={() => {
              deleteTaskHandler(taskId,elem);
            }}
          >
            <MdDelete />
          </button>):(<></>)
        }
        {!isDone && (
          <button
            className="cardDone"
            onClick={() => {
              doneTaskHandler(taskId,elem);
            }}
          >
            <MdOutlineDoneAll />
          </button>
        )}
      </div>
    </div>
  );
}

export default Task;
