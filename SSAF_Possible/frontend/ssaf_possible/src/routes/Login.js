import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";


const LoginPage = ()=>{
    let {loginUser} = useContext(AuthContext)
    
    return(
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="이름"/>
                <input type="password" name="password" placeholder="비밀번호"/>
                <input type="submit" value="로그인"/>
            </form>
        </div>
    )
}

export default LoginPage;