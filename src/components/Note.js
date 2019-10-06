import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import * as actions from "../actions";
import { DragTypes } from "../actions/types";
import IconButton from "@material-ui/core/IconButton";
import { Col } from "react-flexbox-grid";
import Delete from "@material-ui/icons/Delete";
import { useDrag, useDrop } from 'react-dnd';

function Note(props) {
  const handleChange = event => {
    let noteData = JSON.parse(props.noteData);
    console.log(event.target.name);
    if (event.target.name === "title") {
      noteData.title = event.target.value;
    } else if (event.target.name === "message") {
      noteData.content = event.target.value;
    }
    console.log(noteData);
    props.updateNote(noteData);
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: DragTypes.NOTE },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ draggableNote, isOver, canDrop }, drop] = useDrop({
    accept: DragTypes.NOTE,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      draggableNote: monitor.getItem(),
    }),
  });

  if (canDrop && drop) {
    props.swapNotes(draggableNote, JSON.parse(props.noteData));
  }

  return (
    <Col
      xs={12} md={3} className={"notepad-wrap".concat(isOver ? " growCardMoving" : "")}
      id={`Col-${JSON.parse(props.noteData).id}`}
      ref={drop}
    >
      <div ref={drag}>
        <Card
          id={`Card-${JSON.parse(props.noteData).id}`}
          className={"sticky".concat(isDragging ? " growCardMoving" : "")}
        >
          <div>
            <input
              hintText="Title"
              fullWidth={true}
              value={JSON.parse(props.noteData).title}
              name="title"
              onChange={handleChange}
              placeholder="Title..."
            />
            <textarea
              id="message"
              name="message"
              className="form-control"
              required=""
              value={JSON.parse(props.noteData).content}
              onChange={handleChange}
              placeholder="Things you want to say.."
            />
          </div>
          <div>
            <IconButton
              variant="contained"
              color="secondary"
              style={{ marginTop: "10px" }}
              onClick={props.remove}
            >
              <Delete />
            </IconButton>
          </div>
        </Card>
      </div>
    </Col >
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  actions
)(Note);
