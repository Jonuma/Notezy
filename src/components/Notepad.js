import React from "react";
import { connect } from "react-redux";
import Note from "./Note";
import * as actions from "../actions";
import { Grid, Row } from "react-flexbox-grid";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function Notepad(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid fluid>
        <Row>
          {props.notesData.map(noteData => {
            return (
              <Note
                key={noteData.id}
                noteData={JSON.stringify(noteData)}
                updateNote={props.updateNote}
                remove={() => props.removeNote(noteData.id)}
                swapNotes={props.swapNotes}
              />
            );
          })}
        </Row>
      </Grid>
    </DndProvider>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  actions
)(Notepad);