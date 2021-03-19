import React, { useContext,useState,useEffect } from "react";
import {useHistory} from 'react-router-dom'
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  
  const history = useHistory()
  useEffect(()=> {
    if (localStorage.getItem('user-info')){
      history.push("/add")
    }
  },[])

  function login(){
    console.log(email,password)
  }
  
  return (
    <BoxContainer>
      <FormContainer>
        <Input onChange={(e)=>setEmail(e.target.value) } type="email" placeholder="Email" />
        <Input onChange={(e)=>setPassword(e.target.value) } type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={login} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}