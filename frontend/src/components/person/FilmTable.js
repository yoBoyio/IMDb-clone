import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './PersonInfo.css';


const useStyles = makeStyles({
  table: {
    width: "50%",
    minWidth: 50
  }
});

export default function BasicTable(props) {
  const classes = useStyles();

  return (
    <div > 
      <b> Filmography </b>
      <TableContainer component={Paper}> 
      <Table >
        <TableHead>
          <TableRow >
            <TableCell>Movie</TableCell>
            <TableCell align="left">Character</TableCell>
            <TableCell align="left">Release Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
            <TableRow >
              <TableCell component="th" scope="row">
                {props.creditsTitle}
              </TableCell>
              <TableCell align="left">
                {props.creditsCharacter} 
              </TableCell>
              <TableCell align="left">
                {props.creditsDate}
              </TableCell>
            </TableRow>
         
        </TableBody>
      </Table>
      </TableContainer>
      </div>  
       
    
  );
}
