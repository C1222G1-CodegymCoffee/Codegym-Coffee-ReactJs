import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { postResetPassword } from "../../service/Service";

function ResetPassword() {
  let param = useParams();
  const navigate = useNavigate();
  let res = document.cookie;
  let arr = res.split("=");
  
  console.log(arr[1]);
  return (
    <div className="container">
      
      <h1>Lập lại mật khẩu</h1>
      <Formik
            initialValues={{
                token: arr[1],
                password: ""
            }}

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
                <Form>
                <div className="mb-3 bg-success">
                    <Field
                    type="password"
                    className="form-control form-custom"
                    placeholder="Nhập mật khẩu mới"
                    name="password"
                    />
                    {/* <div id="emailHelp" className="form-text text-danger fs-15">Trường này không được để trống</div> */}
                </div>
                <div className="mb-3 my-5 input-group bg-success">
                    <Field
                    type="password"
                    className="form-control form-custom form-pw"
                    placeholder="Xác nhận mật khẩu"
                    name="password"
                    />
                    <i className="bi bi-eye-slash float-end icon-custom"></i>
                <div id="emailHelp" className="form-text text-danger col-12 fs-15">Trường này không được để trống</div>
                </div>
                <button type="submit" className="col-12 button">
                    Đổi mật khẩu
                </button>
            </Form>
            }
      </Formik>
      
    </div>
  );
}

export default ResetPassword;