import _ from "lodash";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { validateInput } from "~/service/tools";

const initialSignupCustomer = {
    email: "",
    phone: "",
    name: "",
    password: "",
    confirmpassword: "",

}

const Register = () => {
    const [error, setError] = useState({});
    const [signupValues, setSigupValues] = useState(initialSignupCustomer);
    const handleEmail = (data) => {
        let Newdata = _.cloneDeep(signupValues)
        Newdata.email = data
        setSigupValues(Newdata)
    }
    const handlePhoneNumber = (data) => {
        let Newdata = _.cloneDeep(signupValues)
        Newdata.phone = data
        setSigupValues(Newdata)
    }
    const handleName = (data) => {
        let Newdata = _.cloneDeep(signupValues)
        Newdata.name = data
        setSigupValues(Newdata)
    }
    const handlePassword = (data) => {
        let Newdata = _.cloneDeep(signupValues)
        Newdata.password = data
        setSigupValues(Newdata)
    }
    const handleConfimPass = (data) => {
        let Newdata = _.cloneDeep(signupValues)
        Newdata.confirmpassword = data
        setSigupValues(Newdata)
    }
    useEffect(() => {
        document.title = "Tuna Shop - Đăng ký"
    }, [])


    const handleSignUp = (e) => {
        e.preventDefault()
        const DataValidate = {
            email: signupValues.email,
            name: signupValues.name,
            phone: signupValues.phone,
            password: signupValues.password,
            confirmPassword: signupValues.confirmpassword

        }
        setError(validateInput(DataValidate))

    }

    const [showpass, setShowpass] = useState(false)
    const [showResestPass, setShowResestPass] = useState(false)
    return (<Container>
        <div className="wrapper dangky">
            <a href="/boostrap.html">
                <span className="icon-close">
                    <ion-icon name="close-outline" />
                </span>
            </a>
            <div className="form-box register">
                <h2>Đăng ký</h2>
                <form onSubmit={handleSignUp}>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail-outline" />
                        </span>
                        <input type="text" required value={signupValues.email} onChange={(event) => handleEmail(event.target.value)} />
                        <label htmlFor="">Email</label>
                        {error.email && <p className="text-danger fs-14px">{error.email}</p>}
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <FaPhone size={18} />
                        </span>
                        <input type="text" required value={signupValues.phone} onChange={(event) => handlePhoneNumber(event.target.value)} />
                        <label htmlFor="">Số điện thoại</label>
                        {error.phone && <p className="text-danger fs-14px">{error.phone}</p>}
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="person-circle-outline" />
                        </span>
                        <input type="text" required value={signupValues.name} onChange={(event) => handleName(event.target.value)} />
                        <label htmlFor="">Tên người dùng</label>
                        {error.name && <p className="text-danger fs-14px">{error.name}</p>}
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            < FaEye onClick={() => {
                                let show; //true false
                                showpass ? show = false : show = true;
                                setShowpass(show)
                            }} />
                        </span>
                        <input type={showpass ? "text" : "password"} required value={signupValues.password} onChange={(event) => handlePassword(event.target.value)} />
                        <label htmlFor="">Mật khẩu</label>
                        {error.password && <p className="text-danger fs-14px">{error.password}</p>}

                    </div>
                    <div className="input-box">
                        <span className="icon">
                            < FaEye onClick={() => {
                                let show; //true false
                                showResestPass ? show = false : show = true;
                                setShowResestPass(show)
                            }} />
                        </span>
                        <input type={showResestPass ? "text" : "password"} required value={signupValues.confirmpassword} onChange={(event) => handleConfimPass(event.target.value)} />
                        <label htmlFor=""> Nhập lại mật khẩu</label>
                        {error.confirmPassword && <p className="text-danger fs-14px">{error.confirmPassword}</p>}
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Đồng ý Điều khoản và Dịch vụ
                        </label>
                    </div>
                    <button type="submit" className="btn">
                        Đăng ký
                    </button>
                    <div className="login-register">
                        <p>
                            Bạn đã có tài khoản?
                            <Link to={'/login'} className="register-link">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    </Container>);
}

export default Register;