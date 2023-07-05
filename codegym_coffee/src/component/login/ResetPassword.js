import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { postResetPassword } from "../../service/Service";
import * as Yup from "yup";

function ResetPassword() {
  const navigate = useNavigate();
  let res = document.cookie;
  let arr = res.split("=");
  
  console.log(arr[1]);
  return (
    <div className="container">
      <div className="form-reset-password bg-secondary br-10">
        <h1 className="text-center my-4 text-white">Lập lại mật khẩu</h1>
        <Formik
              initialValues={{
                  token: arr[1],
                  password: ""
              }}

              validationSchema={Yup.object().shape({
              
                password: Yup.string()
                    .required("trường này không được để trống")
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "mật khẩu phải có ít nhất 1 chữ hoa,ít nhất 1 chữ thường, có 1 ký tự và số"),
            })}

              onSubmit={(values) => {
                const login = async () => {
                  const a = await postResetPassword(values);
                  console.log(a);
                  console.log(values);
                  navigate('/login');
              }
              login();
              }}
        >
              {
                  <Form id="loginPage">
                  <div className="mb-3">
                      <Field
                      type="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu mới"
                      name="password"
                      />
                      <ErrorMessage name="nameAccount" className="text-danger col-12" component="span"/>
                      
                  </div>
                  <div className="mb-3 input-group">
                      <input
                      type="password"
                      className="form-control form-pw"
                      placeholder="Xác nhận mật khẩu"
                      name="confirmPassword"
                      />
                  </div>
                  <button type="submit" className="col-12 button my-4">
                      Đổi mật khẩu
                  </button>
              </Form>
              }
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;